import './NewsDetailBlock.css';
import formatTime from '../../../utils/convert-unix-to-localestring';
import { Button, CommentIcon } from '../ui';
import { useToNewsFeed } from '../../../hooks';

interface NewsDetailCardProps {
  linkURL: string;
  title: string;
  publicationDate: number;
  author: string;
  commentsCount: number;
  text: string;
}

/** Предполагается, что приходящий текст поста санитайзится сервером */
function NewsDetailBlock({
  linkURL,
  title,
  publicationDate,
  author,
  commentsCount,
  text,
}: NewsDetailCardProps): JSX.Element {
  const returnToNewsFeed = useToNewsFeed();

  return (
    <div className="news-detail-block">
      <h2 className="news-detail-block__title">{title}</h2>

      {text && (
        <div className="news-detail-block__text" dangerouslySetInnerHTML={{ __html: text }} />
      )}

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

      <div className="news-detail-block__footer">
        <div className="news-detail-block__comments-count">
          <CommentIcon classMix="news-detail-block__comment-icon" />
          <span className="news-detail-block__accent">{commentsCount}</span>
        </div>
        <Button
          handleClick={returnToNewsFeed}
          text="Back to News Feed"
          color="secondary"
          classMix="news-detail-block__button-back"
        />
      </div>
    </div>
  );
}

export default NewsDetailBlock;
