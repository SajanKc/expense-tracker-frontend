import React, { useState, useEffect } from "react";

const Category = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [categories, setCategories] = useState([]);

	const BASEURL = "/api/categories";

	const getUrl = async () => {
		const response = await fetch(BASEURL);
		const categories = await response.json();
		setCategories(categories);
		setIsLoading(false);
		return categories;
	};

	useEffect(() => {
		getUrl();
	}, []);

	return isLoading ? (
		<div>Loading.... Please wait</div>
	) : (
		<>
			<h1>Categories</h1>
			{categories.map((category, index) => {
				return (
					<div key={index}>
						<h4>
							{category.id}. {category.name}
						</h4>
					</div>
				);
			})}
		</>
	);
};

export default Category;
