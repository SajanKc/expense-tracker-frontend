import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";

const AppNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="dark" dark expand="md">
				<NavbarBrand href="/">Expense Tracker</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="/">Home</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/categories">Category</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/expenses">Expenses</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default AppNavbar;
