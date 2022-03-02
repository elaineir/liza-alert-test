import IComment from './comment.json';

export default interface INewsDetail {
  by: string;
  descendants: number;
  id: number;
  kids: number[] | IComment[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}
