import './NewsDetailBlock.css';
import formatTime from '../../../utils/convert-unix-to-localestring';
import { CommentIcon } from '../ui';

interface NewsDetailCardProps {
  linkURL: string;
  title: string;
  publicationDate: number;
  author: string;
  commentsCount: number;
}

function NewsDetailBlock({
  linkURL,
  title,
  publicationDate,
  author,
  commentsCount,
}: NewsDetailCardProps): JSX.Element {
  return (
    <div className="news-detail-block">
      <h2 className="news-detail-block__title">{title}</h2>

      {linkURL && (
        <p className="news-detail-block__text">
          <span className="news-detail-block__accent">More details at: </span>
          <a
            className="news-detail-block__link"
            href={linkURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkURL}
          </a>
        </p>
      )}

      <p className="news-detail-block__author">
        Published by: <span className="news-detail-block__accent">{author}</span>
      </p>
      <p className="news-detail-block__publication-date">{formatTime(publicationDate)}</p>

      <p className="news-detail-block__comments">
        <CommentIcon classMix="news-detail-block__comment-icon" />
        <span className="news-detail-block__accent">{commentsCount}</span>
      </p>
    </div>
  );
}

export default NewsDetailBlock;
