import './Main.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { INewsDetail } from '../../../models';
import BasePage from '../../layouts/BasePage/BasePage';
import { NewsCard } from '../../common';
import { Preloader } from '../../common/ui';
import { newsPaginationCount } from '../../../config/constants';
import { useLoadOnScroll } from '../../../hooks';
import routes from '../../../config/routes';

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
              <Link className="feed__link" to={`${routes.newsDetail.base}/${newsItem.id}`}>
                <NewsCard
                  title={newsItem.title}
                  author={newsItem.by}
                  score={newsItem.score}
                  publicationDate={newsItem.time}
                />
              </Link>
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
