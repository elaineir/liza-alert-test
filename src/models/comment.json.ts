export default interface IComment {
  by: string;
  id: number;
  parent: number;
  text: string;
  time: number;
  deleted?: boolean;
  dead?: boolean;
  kids?: number[] | IComment[];
}
