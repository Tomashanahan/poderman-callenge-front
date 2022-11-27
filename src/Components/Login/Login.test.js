/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import {screen, render, fireEvent} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";

import Login from "./Login";

beforeEach(() =>
  render(
    <Router>
      <Login />
    </Router>,
  ),
);

describe("when the form is mounted", () => {
  it("should render the labels", () => {
    const lebelEmail = screen.getByLabelText(/Email address/i);
    const lebelPassword = screen.getByLabelText(/Contraseña/i);

    expect(lebelEmail).toBeInTheDocument();
    expect(lebelPassword).toBeInTheDocument();
  });

  it("should render the submit button", () => {
    const button = screen.getByRole("button", {name: /Iniciar Sesion/i});

    expect(button).toBeInTheDocument();
  });

  it("should render the 'Crear cuenta' button", () => {
    const button = screen.getByText(/Crear cuenta/i);

    expect(button).toBeInTheDocument();
  });
});

describe("when the user submits the form without values", () => {
  it("should display an error", () => {
    const button = screen.getByRole("button", {name: /Iniciar Sesion/i});

    fireEvent.click(button);
    expect(screen.getByText(/Complete todos los campos por favor/i)).toBeInTheDocument();
  });
});
