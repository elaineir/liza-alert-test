import './Main.css';
import { INewsDetail } from '../../../models';
import BasePage from '../../layouts/BasePage/BasePage';
import { NewsCard } from '../../common';
import { Button, Preloader } from '../../common/ui';
import routes from '../../../config/routes';
import { newsPaginationCount } from '../../../config/constants';

interface MainProps {
  newsCount: number;
  news: INewsDetail[];
  isLoading: boolean;
  loadMoreNews: () => void;
}

function Main({ newsCount, news, isLoading, loadMoreNews }: MainProps): JSX.Element {
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
            <Button classMix="feed__button" text="Load more" handleClick={loadMoreNews} />
          )}
        </ul>
      )}
    </BasePage>
  );
}

export default Main;
