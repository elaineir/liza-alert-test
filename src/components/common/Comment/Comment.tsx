import './Comment.css';
import { ReactNode } from 'react';
import formatTime from '../../../utils/convert-unix-to-localestring';

interface CommentProps {
  author: string;
  publicationDate: number;
  text: string;
  children?: ReactNode;
  deleted: boolean;
  dead: boolean;
}

/** Предполагается, что приходящий текст комментария санитайзится сервером */
function Comment({
  author,
  publicationDate,
  text,
  deleted,
  dead,
  children,
}: CommentProps): JSX.Element {
  return (
    <div className={`comment ${deleted || dead ? 'comment_deleted' : ''}`}>
      <div className="comment__current">
        {(deleted || dead) && (
          <p className="comment__text comment__text_deleted">This comment was deleted.</p>
        )}

        {!(deleted || dead) && (
          <>
            <div className="comment__header">
              <p className="comment__author">{author}</p>
              <p className="comment__publication-date">{formatTime(publicationDate)}</p>
            </div>

            <div className="comment__text" dangerouslySetInnerHTML={{ __html: text }} />
          </>
        )}
      </div>

      {children && <div className="comment__children">{children}</div>}
    </div>
  );
}

Comment.defaultProps = {
  children: null,
};

export default Comment;
