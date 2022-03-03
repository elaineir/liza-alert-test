import formatTime from '../../../utils/convert-unix-to-localestring';
import './NewsCard.css';

interface NewsCardProps {
  title: string;
  score: number;
  author: string;
  publicationDate: number;
}

function NewsCard({ title, score, author, publicationDate }: NewsCardProps): JSX.Element {
  return (
    <article className="news-card">
      <div className={`news-card__score ${score > 0 ? 'news-card__score_positive' : ''}`}>
        {score}
      </div>

      <div className="news-card__content">
        <div className="news-card__header">
          <p className="news-card__author">{author}</p>
          <p className="news-card__publication-date">{formatTime(publicationDate)}</p>
        </div>
        <h2 className="news-card__title">
          {title} <span className="news-card__arrow">&#10140;</span>
        </h2>
      </div>
    </article>
  );
}

export default NewsCard;
