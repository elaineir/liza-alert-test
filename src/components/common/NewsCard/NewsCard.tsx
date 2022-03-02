import { Link } from 'react-router-dom';
import formatTime from '../../../utils/convert-unix-to-localestring';
import './NewsCard.css';

interface NewsCardProps {
  title: string;
  score: number;
  author: string;
  publicationDate: number;
  linkURL: string;
}

function NewsCard({ title, score, author, publicationDate, linkURL }: NewsCardProps): JSX.Element {
  return (
    <article className="news-card">
      <p className={`news-card__score ${score > 0 ? 'news-card__score_positive' : ''}`}>{score}</p>

      <div className="news-card__content">
        <div className="news-card__header">
          <p className="news-card__author">{author}</p>
          <p className="news-card__publication-date">{formatTime(publicationDate)}</p>
        </div>

        <Link className="news-card__link" to={linkURL}>
          <h2 className="news-card__title">
            {title} <span className="news-card__arrow">&#10140;</span>
          </h2>
        </Link>
      </div>
    </article>
  );
}

export default NewsCard;
