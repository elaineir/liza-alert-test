import './NewsDetail.css';
import { useParams } from 'react-router-dom';
import BasePage from '../../layouts/BasePage/BasePage';
import { NewsDetailBlock } from '../../common';
import { Preloader } from '../../common/ui';
import { useNewsDetail } from '../../../hooks';

interface NewsDetailParams {
  id: string;
}

function NewsDetail(): JSX.Element {
  const { id }: NewsDetailParams = useParams();
  const { newsDetail, isLoading } = useNewsDetail(Number(id));

  return (
    <BasePage>
      {isLoading && <Preloader />}

      {!isLoading && (
        <div className="news-detail">
          <NewsDetailBlock
            linkURL={newsDetail.url}
            author={newsDetail.by}
            title={newsDetail.title}
            publicationDate={newsDetail.time}
            commentsCount={newsDetail.descendants}
          />
        </div>
      )}
    </BasePage>
  );
}

export default NewsDetail;
