import { useState } from "react";

const backendURL = "http://localhost:5000";

const HomePage: React.FC = () => {
	const [content, setContent] = useState({
		backend: undefined,
		database: undefined,
	});

	const handleClick = async (word: string) => {
		if (!word || typeof word !== "string") return;
		switch (word) {
			case "backend":
				if (content.backend) {
					setContent(prev => ({...prev, backend: undefined}));
					return;
				}
				return fetch(`${backendURL}/test`)
					.then((res) => res.json())
					.then((res) => setContent((prev) => ({ ...prev, backend: res })))
					.catch((err) => console.log(err));
			case "database":
				if (content.database) {
					setContent((prev) => ({ ...prev, database: undefined }));
					return;
				}
				return fetch(`${backendURL}/DBtest`)
					.then((res) => res.json())
					.then((res) =>{
						console.log(res);

						setContent((prev) => ({
							...prev,
							database: {
								articles: res.articles,
								dbState: res.db_state,
							},
						}))
						}
					)
					.catch((err) => console.log(err));
		}
	}

	return (
		<>
			<section>
				<h1>Does the connection to the backend work?</h1>
				<p>This button will trigger a fetch call to the backend.</p>
				<button onClick={() => handleClick("backend")} className="btn-full">
					Let's find out
				</button>
				{content.backend && <p style={{ margin: "20px 0" }}>{content.backend}</p>}
			</section>

			<hr />

			<section>
				<h1>Now does the connection to the database work?</h1>
				<p>Let's try to GET something.</p>
				<button
					onClick={() => handleClick("database")}
					className="btn-full"
				>
					Let's find out
				</button>

				<div style={{ margin: "20px 0" }}>
					{content.database?.dbState ? (
						<strong style={{ color: "green" }}>
							✅ Database connected
						</strong>
					) : (
						<strong style={{ color: "red" }}>
							❌ Database not connected
						</strong>
					)}
					{content.database && (
						content.database.articles?.map((article) => {
							return <p key={article._id}>{article.content}</p>;
						})
					)}
				</div>
			</section>
		</>
	);
}

export default HomePage
