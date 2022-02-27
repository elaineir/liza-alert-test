export default interface IComment {
  by: string;
  id: number;
  parent: number;
  text: string;
  time: number;
  deleted?: boolean;
  kids?: number[] | IComment[];
}
