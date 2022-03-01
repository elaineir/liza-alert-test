import { Link } from 'react-router-dom';
import './NewsCard.css';
import routes from '../../../config/routes';

interface NewsCardProps {
  id: number;
  title: string;
  score: number;
  author: string;
  publicationDate: number;
}

function NewsCard({ id, title, score, author, publicationDate }: NewsCardProps): JSX.Element {
  function formatTime(milliseconds: number): string {
    const date = new Date(milliseconds * 1000);
    return date.toLocaleString();
  }

  return (
    <article className="news-card">
      <p className={`news-card__score ${score > 0 ? 'news-card__score_positive' : ''}`}>{score}</p>

      <div className="news-card__content">
        <div className="news-card__header">
          <p className="news-card__author">{author}</p>
          {/* <p className="news-card__publication-date">{dateString}</p> */}
          <p className="news-card__publication-date">{formatTime(publicationDate)}</p>
        </div>

        <Link className="news-card__link" to={`${routes.newsDetail.base}/${id}`}>
          <h2 className="news-card__title">
            {title} <span className="news-card__arrow">&#10140;</span>
          </h2>
        </Link>
      </div>
    </article>
  );
}

export default NewsCard;
