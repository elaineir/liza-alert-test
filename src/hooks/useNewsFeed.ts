import { useEffect, useState } from 'react';
import { INewsDetail } from '../models';
import { getNews } from '../services/hacker-news.service';
import { newsLimit } from '../config/constants';

function useNewsFeed() {
  const [news, setNews] = useState<INewsDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  function loadNews() {
    getNews(newsLimit)
      .then((allNews) => setNews(allNews))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(loadNews, []);

  return {
    news,
    isLoading,
  };
}

export default useNewsFeed;
