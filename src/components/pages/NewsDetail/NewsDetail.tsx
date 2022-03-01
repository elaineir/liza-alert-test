import './NewsDetail.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getComments, getNewsDetailById } from '../../../services/hackerNewsService';
import { INewsDetail } from '../../../models';
import { defaultNewsDetail } from '../../../config/constants';

interface NewsDetailParams {
  id: string;
}

function NewsDetail(): JSX.Element {
  const { id }: NewsDetailParams = useParams();
  const [newsDetail, setNewsDetail] = useState<INewsDetail>(defaultNewsDetail);

  function loadNewsDetail() {
    getNewsDetailById(Number(id))
      .then(async (news: INewsDetail) => {
        if (news?.kids?.length) {
          const kids = await getComments(news.kids as number[]);
          if (kids) {
            const newNewsDetail = { ...news, kids };
            console.log(newNewsDetail);
            return setNewsDetail(newNewsDetail);
          }
        }

        console.log(news);
        return setNewsDetail(news);
      })
      .catch((err) => console.log(err));
  }

  useEffect(loadNewsDetail, []);

  return <h1>{newsDetail?.by}</h1>;
}

export default NewsDetail;
