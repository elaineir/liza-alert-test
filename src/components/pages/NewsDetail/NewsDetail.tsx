import './NewsDetail.css';
import { useParams } from 'react-router-dom';
import { ReactNode } from 'react';
import BasePage from '../../layouts/BasePage/BasePage';
import { Comment, NewsDetailBlock } from '../../common';
import { Button, Preloader } from '../../common/ui';
import { useNewsDetail, useToNewsFeed } from '../../../hooks';
import { IComment } from '../../../models';

interface NewsDetailParams {
  id: string;
}

function NewsDetail(): JSX.Element {
  const { id }: NewsDetailParams = useParams();
  const { newsDetail, isLoading } = useNewsDetail(Number(id));
  const returnToNewsFeed = useToNewsFeed();

  function renderCommentsTree(comments: IComment[]): (JSX.Element | null)[] {
    return comments.map((comment) => {
      let children: ReactNode | null = null;
      if (comment?.kids?.length) {
        children = renderCommentsTree(comment.kids as IComment[]);
      }
      return (
        <Comment
          key={comment.id}
          author={comment.by}
          publicationDate={comment.time}
          text={comment.text}
          deleted={comment.deleted ?? false}
          dead={comment.dead ?? false}
        >
          {children}
        </Comment>
      );
    });
  }

  return (
    <BasePage>
      {isLoading && <Preloader />}

      {!isLoading && (
        <div className="news-detail">
          <Button
            handleClick={returnToNewsFeed}
            text="Back to News Feed"
            classMix="news-detail__button-back"
            isArrow
          />
          <div className="news-detail__details">
            <NewsDetailBlock
              linkURL={newsDetail.url}
              author={newsDetail.by}
              title={newsDetail.title}
              publicationDate={newsDetail.time}
              commentsCount={newsDetail.descendants}
              text={newsDetail.text}
            />

            {newsDetail?.kids?.length > 0 && (
              <div className="news-detail__comments">
                {renderCommentsTree(newsDetail.kids as IComment[])}
              </div>
            )}
          </div>
        </div>
      )}
    </BasePage>
  );
}

export default NewsDetail;
