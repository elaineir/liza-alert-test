import './Main.css';
import { useCallback, useEffect, useState } from 'react';
import { INewsDetail } from '../../../models';
import NewsCard from '../../ui/NewsCard/NewsCard';
import BasePage from '../../layouts/BasePage';
import Button from '../../ui/Button/Button';

interface MainProps {
  news: INewsDetail[];
}

function Main({ news }: MainProps): JSX.Element {
  const [newsToDisplay, setNewsToDisplay] = useState<INewsDetail[]>([]);
  const [lastNewsIndex, setLastNewsIndex] = useState(0);

  const loadMoreNews = useCallback(() => {
    setNewsToDisplay((prevNews) => [...prevNews, ...news.slice(lastNewsIndex, lastNewsIndex + 10)]);
    setLastNewsIndex((prevIndex) => prevIndex + 10);
  }, [lastNewsIndex]);

  useEffect(() => {
    if (news?.length > 10) {
      setNewsToDisplay(news.slice(0, 10));
      setLastNewsIndex((prevIndex) => prevIndex + 10);
    } else {
      setNewsToDisplay(news);
    }
  }, [news]);

  return (
    <BasePage>
      {newsToDisplay?.length && (
        <ul className="feed">
          {newsToDisplay.map((newsItem) => (
            <li key={newsItem.id}>
              <NewsCard
                id={newsItem.id}
                title={newsItem.title}
                author={newsItem.by}
                score={newsItem.score}
                publicationDate={newsItem.time}
              />
            </li>
          ))}

          {news.length > 10 && newsToDisplay.length !== news.length && (
            <Button classMix="feed__button" text="Load more" handleClick={loadMoreNews} />
          )}
        </ul>
      )}
    </BasePage>
  );
}

export default Main;
