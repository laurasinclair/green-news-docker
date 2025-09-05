import { createBrowserRouter } from 'react-router-dom';
import App from 'src/App';
import {
	HomePage,
	LoginPage,
	ProtectedRoute,
} from "pages";
import { paths } from 'router/paths';

const Router = createBrowserRouter([
	{
		element: <App />,
		path: paths.base,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: paths.login,
				element: <LoginPage />,
			},
		],
	},
]);

export default Router;
