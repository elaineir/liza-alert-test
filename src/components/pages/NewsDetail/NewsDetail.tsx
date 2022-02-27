import './NewsDetail.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getComments, getNewsDetailById } from '../../../services/hackerNewsService';
import { INewsDetail } from '../../../models';
import defaultNewsDetail from '../../../config/constants';

interface NewsDetailParams {
  id: string;
}

function NewsDetail(): JSX.Element {
  const { id }: NewsDetailParams = useParams();
  const [newsDetail, setNewsDetail] = useState<INewsDetail>(defaultNewsDetail);

  function loadNewsDetail() {
    getNewsDetailById(Number(id))
      .then(async (news: INewsDetail) => {
        if (!news?.kids?.length) {
          return setNewsDetail(news);
        }

        const kids = await getComments(news.kids as number[]);
        const newNewsDetail = { ...news, kids };
        // TODO delete timeout
        setTimeout(() => console.log(newsDetail), 1000);

        return setNewsDetail(newNewsDetail);
      })
      .catch((err) => console.log(err));
  }

  useEffect(loadNewsDetail, []);

  return <h1>{newsDetail?.by}</h1>;
}

export default NewsDetail;
