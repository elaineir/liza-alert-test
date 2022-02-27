import { Route, Switch } from 'react-router-dom';
import Main from '../pages/Main/Main';
import NewsDetail from '../pages/NewsDetail/NewsDetail';
import routes from '../../config/routes';
import { INewsDetail } from '../../models';

interface RouterProps {
  news: INewsDetail[];
}

function Router({ news }: RouterProps): JSX.Element {
  return (
    <Switch>
      <Route exact path={routes.mainPage}>
        <Main news={news} />
      </Route>
      <Route path={`${routes.newsDetail.base}${routes.newsDetail.id}`} component={NewsDetail} />
    </Switch>
  );
}

export default Router;
