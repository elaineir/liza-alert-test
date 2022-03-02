import './App.css';
import Router from '../navigation/Router';
import { useNewsFeed } from '../../hooks';

function App() {
  const { news, newsCount, isLoading, loadMoreNews } = useNewsFeed();

  return (
    <div className="page">
      <Router news={news} isLoading={isLoading} newsCount={newsCount} loadMoreNews={loadMoreNews} />
    </div>
  );
}

export default App;
