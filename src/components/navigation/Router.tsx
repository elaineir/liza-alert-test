import { Route, Switch } from 'react-router-dom';
import { Main, NewsDetail } from '../pages';
import routes from '../../config/routes';
import { INewsDetail } from '../../models';

interface RouterProps {
  news: INewsDetail[];
  isLoading: boolean;
  newsCount: number;
  loadMoreNews: () => void;
}

function Router({ news, isLoading, loadMoreNews, newsCount }: RouterProps): JSX.Element {
  return (
    <Switch>
      <Route exact path={routes.mainPage}>
        <Main news={news} isLoading={isLoading} loadMoreNews={loadMoreNews} newsCount={newsCount} />
      </Route>
      <Route path={`${routes.newsDetail.base}${routes.newsDetail.id}`} component={NewsDetail} />
    </Switch>
  );
}

export default Router;
