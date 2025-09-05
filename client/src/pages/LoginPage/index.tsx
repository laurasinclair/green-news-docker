import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { paths } from "router/paths";
import styles from "./index.module.sass";

const LoginPage = () => {
	const { user, signInWithGoogle } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate(paths.base);
		}
	}, [user, navigate]);

	return (
		<div className={styles.loginPage}>
			{user ? (
				<>
					<h4>Welcome back, {user.displayName}!</h4>
					<p>Just a second, you're being redirected.</p>
				</>
			) : (
				<button onClick={signInWithGoogle} className="btn-full">Sign in with Google</button>
			)}
		</div>
	);
};

export default LoginPage;
