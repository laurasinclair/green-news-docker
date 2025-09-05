import { useState, useEffect, useCallback } from "react";
import { useAuth } from "hooks/useAuth";

const API_URL = import.meta.env.VITE_FIREBASE_DATABASE_URL;

export const useArticles = () => {
	const { user } = useAuth();
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchArticles = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const token = await user.getIdToken();
			const response = await fetch(`${API_URL}/users/${user.uid}/savedArticles.json?auth=${token}`);
			if (!response.ok) throw new Error("Failed to fetch articles. Please check your database URL.");

			const data = await response.json();
			const articles = Object.entries(data).map(([id, article]) => ({
				id,
				isSaved: true,
				...article,
			}));
			setArticles(articles);
		} catch (err) {
			setError(`❌ ${err.message}`);
		} finally {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		fetchArticles();
	}, [fetchArticles]);

	const saveArticle = async (newArticle) => {
		if (!user) {
			throw new Error("You must be logged in to add an article.");
		}

		const token = await user.getIdToken();
		const response = await fetch(
			`${API_URL}/users/${user.uid}/savedArticles.json?auth=${token}`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					uid: newArticle.uid,
					...newArticle,
				}),
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to add article.");
		}

		// Refetch articles to show the new one
		await fetchArticles();
	};

	// Function to delete an article
	const deleteArticle = async (articleId) => {
		if (!user) {
			throw new Error("You must be logged in to delete an article.");
		}

		const token = await user.getIdToken();
		const response = await fetch(
			`${API_URL}/articles/${articleId}.json?auth=${token}`,
			{
				method: "DELETE",
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.error || "Failed to delete article. Check security rules."
			);
		}

		// Refetch articles to reflect the deletion
		await fetchArticles();
	};

	return { articles, loading, error, saveArticle, deleteArticle, user };
};
