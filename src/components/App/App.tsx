import './App.css';
import Router from '../navigation/Router';
import { useNewsFeed } from '../../hooks';

function App() {
  const { news, isLoading } = useNewsFeed();

  return (
    <div className="page">
      <Router news={news} isLoading={isLoading} />
    </div>
  );
}

export default App;
