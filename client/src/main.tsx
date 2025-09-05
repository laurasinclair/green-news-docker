import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './router';
import './styles/index.sass';

const globalVars = {
	name: 'Green News',
	slogan: 'Your daily dose of nature',
};

Object.assign(window, globalVars);

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={Router} />
	</React.StrictMode>
);
