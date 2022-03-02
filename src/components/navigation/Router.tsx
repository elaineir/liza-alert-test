import { Route, Switch } from 'react-router-dom';
import { Main, NewsDetail } from '../pages';
import routes from '../../config/routes';
import { INewsDetail } from '../../models';

interface RouterProps {
  news: INewsDetail[];
  isLoading: boolean;
}

function Router({ news, isLoading }: RouterProps): JSX.Element {
  return (
    <Switch>
      <Route exact path={routes.mainPage}>
        <Main news={news} isLoading={isLoading} />
      </Route>
      <Route path={`${routes.newsDetail.base}${routes.newsDetail.id}`} component={NewsDetail} />
    </Switch>
  );
}

export default Router;
