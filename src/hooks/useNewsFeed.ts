import { useCallback, useEffect, useState } from 'react';
import { INewsDetail } from '../models';
import { getNews } from '../services/hacker-news.service';
import { newsLimit, newsPaginationCount } from '../config/constants';

function useNewsFeed() {
  const [news, setNews] = useState<INewsDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function loadNews() {
    getNews(newsLimit)
      .then((allNews) => setNews(allNews))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const [newsToDisplay, setNewsToDisplay] = useState<INewsDetail[]>([]);
  const [lastNewsIndex, setLastNewsIndex] = useState(0);

  const loadMoreNews = useCallback(() => {
    setNewsToDisplay((prevNews) => [
      ...prevNews,
      ...news.slice(lastNewsIndex, lastNewsIndex + newsPaginationCount),
    ]);
    setLastNewsIndex((prevIndex) => prevIndex + newsPaginationCount);
  }, [lastNewsIndex]);

  useEffect(loadNews, []);

  useEffect(() => {
    if (news?.length > newsPaginationCount) {
      setNewsToDisplay(news.slice(0, newsPaginationCount));
      setLastNewsIndex((prevIndex) => prevIndex + newsPaginationCount);
    } else {
      setNewsToDisplay(news);
    }
  }, [news]);

  return {
    newsCount: news.length,
    news: newsToDisplay,
    isLoading,
    loadMoreNews,
  };
}

export default useNewsFeed;
