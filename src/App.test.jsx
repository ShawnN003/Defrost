import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

describe("App component", () => {

  test("Testing rendering of the main title", () => {
    render(<App />);
    expect(screen.getByText("[Defrost]")).toBeInTheDocument();
  });

});