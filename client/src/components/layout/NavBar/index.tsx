import { NavLink } from 'react-router-dom';
import styles from './index.module.sass';
import { paths } from 'router/paths';
import { useAuth } from 'hooks/useAuth';

export default function Navbar() {
	const { user, loading, signOutUser } = useAuth();

	return (
		<nav className={styles.navbar}>
			<NavLink to={paths.base}>Logo</NavLink>

			<div>
				{user ? (
					<>
						Welcome, {user.displayName}
						<button onClick={signOutUser} className="btn-outline" style={{marginLeft: "10px"}}>
							Log out
						</button>
					</>
				) : (
					<a href={paths.login} className="btn-outline">
						{loading ? "loading..." : "Log in"}
					</a>
				)}
			</div>
		</nav>
	);
}
