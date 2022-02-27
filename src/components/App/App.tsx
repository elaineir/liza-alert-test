import './App.css';
import { useEffect, useState } from 'react';
import Router from '../navigation/Router';
import { getNews } from '../../services/hackerNewsService';
import { INewsDetail } from '../../models';

function App() {
  const [news, setNews] = useState<INewsDetail[]>([]);

  function loadNews() {
    getNews(100)
      .then((allNews) => setNews(allNews))
      .catch((err) => console.log(err));
  }

  useEffect(loadNews, []);

  return (
    <div className="page">
      <Router news={news} />
    </div>
  );
}

export default App;
