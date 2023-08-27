import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
  test("renders Home component with expected text", () => {
    render(<Home />);
    
    const expectedText = "Ravn Star Wars Register";
    const textElement = screen.getByText(expectedText);
    expect(textElement).toBeInTheDocument();
  });
});
