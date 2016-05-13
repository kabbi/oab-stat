import createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory } from 'react-router';

export default useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
});
