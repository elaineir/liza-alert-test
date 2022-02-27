import './Main.css';
import { INewsDetail } from '../../../models';

interface MainProps {
  news: INewsDetail[];
}

function Main({ news }: MainProps): JSX.Element {
  console.log(news);
  return <h1>Main Page</h1>;
}

export default Main;
