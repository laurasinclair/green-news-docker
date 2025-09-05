import { paths } from "router/paths";
import { useAuth } from "hooks/useAuth";
import Spinner from "components/states/Spinner";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const {user, loading} = useAuth();

	if (loading) {
		return "loading";
	}

	if (!user) {
		return (
			<Navigate
				to={paths.login}
				state={{ from: location.pathname }}
				replace
			/>
		);
	}

	return <>ProtectedRoute {children}</>;
};

export default ProtectedRoute;
