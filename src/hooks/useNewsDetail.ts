import { useEffect, useState } from 'react';
import { INewsDetail } from '../models';
import { defaultNewsDetail } from '../config/constants';
import { getComments, getNewsDetailById } from '../services/hacker-news.service';

function useNewsDetail(id: number) {
  const [newsDetail, setNewsDetail] = useState<INewsDetail>(defaultNewsDetail);
  const [isLoading, setIsLoading] = useState(true);

  function loadNewsDetail() {
    getNewsDetailById(id)
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
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  useEffect(loadNewsDetail, []);

  return {
    newsDetail,
    isLoading,
  };
}

export default useNewsDetail;
