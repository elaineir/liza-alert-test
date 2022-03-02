import { useHistory } from 'react-router';
import routes from '../config/routes';

function useToNewsFeed() {
  const history = useHistory();

  function returnToNewsFeed() {
    history.push(routes.mainPage);
  }

  return returnToNewsFeed;
}

export default useToNewsFeed;
