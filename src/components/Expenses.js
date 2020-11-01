import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import {
	Button,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Table,
} from "reactstrap";

const Expenses = (props) => {
	const [date, setDate] = useState(new Date());
	const [isLoading, setIsLoading] = useState(true);
	const [expenses, setExpenses] = useState([]);
	const [categories, setCategories] = useState([]);

	let emptyItem = {
		id: 104,
		expensedate: "2020-07-01T01:25:00Z",
		description: "Bike Loan Payment",
		price: 15020,
		category: [1, "Auto Loan"],
	};
	const [item, SetItem] = useState(emptyItem);

	const getCategories = async () => {
		const response = await fetch("/api/categories");
		const categories = await response.json();
		setCategories(categories);
		setIsLoading(false);
		return categories;
	};

	const getExpenses = async () => {
		const response = await fetch("/api/expenses");
		const expenses = await response.json();
		setExpenses(expenses);
		setIsLoading(false);
		return expenses;
	};

	useEffect(() => {
		getCategories();
		getExpenses();
	}, []);

	const handleChange = () => {};

	const handleSubmit = () => {};

	const remove = async (id) => {
		await fetch(`/api/expenses/${id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		}).then(() => {
			let updatedExpenses = [...expenses].filter((item) => item.id !== id);
			setExpenses(updatedExpenses);
		});
	};

	let optionList = categories.map((category) => {
		return <option key={category.id}>{category.name}</option>;
	});

	let rows = expenses.map((expense) => {
		return (
			<tr>
				<td>{expense.id}</td>
				<td>{expense.description}</td>
				<td>{expense.expensedate}</td>
				<td>{expense.category.name}</td>
				<td>{expense.price}</td>
				<td>
					<Button
						size="sm"
						color="danger"
						onClick={() => remove(expense.id)}
					>
						Delete
					</Button>
				</td>
			</tr>
		);
	});

	if (isLoading) return <div>Loading... Please Wait</div>;
	else {
		return (
			<div>
				<Container>
					<h2>Add Expenses</h2>
					<Form onSubmit={handleSubmit}>
						<FormGroup>
							<Label for="category">Category</Label>

							<select>{optionList}</select>
							<Input
								type="text"
								name="category"
								id="category"
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="expanseDate">Expanse Date</Label>
							<br />
							<DatePicker selected={date} onChange={handleChange} />
						</FormGroup>
						<FormGroup>
							<Label for="description">Description</Label>
							<Input
								type="text"
								name="description"
								id="description"
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Label for="location">Expanse(Rs)</Label>
							<Input
								type="text"
								name="expense"
								id="expense"
								onChange={handleChange}
							/>
						</FormGroup>
						<FormGroup>
							<Button color="primary" type="button">
								Save
							</Button>
							<Button color="secondary" tag={Link} to="/categories">
								Cancle
							</Button>
						</FormGroup>
					</Form>
				</Container>

				<Container>
					<h2>Expenses</h2>
					<Table className="mt-4">
						<thead>
							<tr>
								<th width="10%">ID</th>
								<th width="30%">Description</th>
								<th witdh="10%">Date</th>
								<th width="20%">Category</th>
								<th width="10%">Expense(Rs)</th>
								<th width="10%">Action</th>
							</tr>
						</thead>
						<tbody>{rows}</tbody>
					</Table>
				</Container>
			</div>
		);
	}
};

export default Expenses;
