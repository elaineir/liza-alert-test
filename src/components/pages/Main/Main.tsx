import './Main.css';
import { INewsDetail } from '../../../models';
import NewsCard from '../../ui/NewsCard/NewsCard';
import BasePage from '../../layouts/BasePage';

interface MainProps {
  news: INewsDetail[];
}

function Main({ news }: MainProps): JSX.Element {
  console.log(news);
  return (
    <BasePage>
      {news && (
        <ul className="feed">
          {news.map((newsItem) => (
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
        </ul>
      )}
    </BasePage>
  );
}

export default Main;
