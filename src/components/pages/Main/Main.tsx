import './Main.css';
import { useRef } from 'react';
import { INewsDetail } from '../../../models';
import BasePage from '../../layouts/BasePage/BasePage';
import { NewsCard } from '../../common';
import { Preloader } from '../../common/ui';
import routes from '../../../config/routes';
import { newsPaginationCount } from '../../../config/constants';
import { useLoadOnScroll } from '../../../hooks';

interface MainProps {
  newsCount: number;
  news: INewsDetail[];
  isLoading: boolean;
  loadMoreNews: () => void;
}

function Main({ newsCount, news, isLoading, loadMoreNews }: MainProps): JSX.Element {
  const elementRef = useRef(null);

  useLoadOnScroll({
    elementRef,
    callbackOnIntersect: loadMoreNews,
  });

  return (
    <BasePage>
      {isLoading && <Preloader />}

      {news?.length > 0 && (
        <ul className="feed">
          {news.map((newsItem) => (
            <li key={newsItem.id}>
              <NewsCard
                title={newsItem.title}
                author={newsItem.by}
                score={newsItem.score}
                publicationDate={newsItem.time}
                linkURL={`${routes.newsDetail.base}/${newsItem.id}`}
              />
            </li>
          ))}

          {newsCount > newsPaginationCount && news.length !== newsCount && (
            <li aria-hidden ref={elementRef} />
          )}
        </ul>
      )}
    </BasePage>
  );
}

export default Main;
