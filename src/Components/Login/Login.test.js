import React from "react";
import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

describe("it should render a login form", () => {
  it("should render the labels", () => {
    render(<Login />);
		// const lebelEmail = screen.getByLabelText(/Email address/i);
		// const lebelPassword = screen.getByLabelText(/Contraseña/i);

		// expect(lebelEmail).toBeInTheDocument();
		// expect(lebelPassword).toBeInTheDocument();
	});
});
