import './Main.css';
import { useCallback, useEffect, useState } from 'react';
import { INewsDetail } from '../../../models';
import BasePage from '../../layouts/BasePage/BasePage';
import { NewsCard } from '../../common';
import { Button, Preloader } from '../../common/ui';
import routes from '../../../config/routes';
import { newsPaginationCount } from '../../../config/constants';

interface MainProps {
  news: INewsDetail[];
  isLoading: boolean;
}

function Main({ news, isLoading }: MainProps): JSX.Element {
  const [newsToDisplay, setNewsToDisplay] = useState<INewsDetail[]>([]);
  const [lastNewsIndex, setLastNewsIndex] = useState(0);

  const loadMoreNews = useCallback(() => {
    setNewsToDisplay((prevNews) => [
      ...prevNews,
      ...news.slice(lastNewsIndex, lastNewsIndex + newsPaginationCount),
    ]);
    setLastNewsIndex((prevIndex) => prevIndex + newsPaginationCount);
  }, [lastNewsIndex]);

  useEffect(() => {
    if (news?.length > newsPaginationCount) {
      setNewsToDisplay(news.slice(0, newsPaginationCount));
      setLastNewsIndex((prevIndex) => prevIndex + newsPaginationCount);
    } else {
      setNewsToDisplay(news);
    }
  }, [news]);

  return (
    <BasePage>
      {isLoading && <Preloader />}

      {newsToDisplay?.length > 0 && (
        <ul className="feed">
          {newsToDisplay.map((newsItem) => (
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

          {news.length > newsPaginationCount && newsToDisplay.length !== news.length && (
            <Button classMix="feed__button" text="Load more" handleClick={loadMoreNews} />
          )}
        </ul>
      )}
    </BasePage>
  );
}

export default Main;
