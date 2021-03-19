import { screen } from "@testing-library/react";
import React from "react";
import { CenterSpinner } from "./components/CenterSpinner";
import { EmptyScreen } from "./components/EmptyScreen";
import { ErrorScreen } from "./components/ErrorScreen";
import { render } from "./test-utils";

test("renders empty screen correctly", () => {
  render(<EmptyScreen message={"Message"} />);
  const linkElement = screen.getByText(/Message/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders error screen correctly", () => {
  render(<ErrorScreen message={"Message"} />);
  const linkElement = screen.getByText(/Message/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders center spinner", () => {
  render(<CenterSpinner />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
