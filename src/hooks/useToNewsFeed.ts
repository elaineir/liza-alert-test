import { useHistory, useLocation } from 'react-router';
import routes from '../config/routes';

interface LocationState {
  state: {
    fromNewsFeed: boolean;
  };
}

function useToNewsFeed() {
  const history = useHistory();
  const location: LocationState = useLocation();

  function returnToNewsFeed() {
    if (location?.state?.fromNewsFeed) {
      history.goBack();
    } else {
      history.push(routes.mainPage);
    }
  }

  return returnToNewsFeed;
}

export default useToNewsFeed;
