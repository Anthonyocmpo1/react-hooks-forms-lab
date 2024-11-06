import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../components/Filter";
import ShoppingList from "../components/ShoppingList";

const testData = [
  { id: 1, name: "Yogurt", category: "Dairy" },
  { id: 2, name: "Pomegranate", category: "Produce" },
  { id: 3, name: "Lettuce", category: "Produce" },
  { id: 4, name: "String Cheese", category: "Dairy" },
  { id: 5, name: "Swiss Cheese", category: "Dairy" },
  { id: 6, name: "Cookies", category: "Dessert" },
];

const noop = () => {};

// Filter tests
test("uses a prop of 'search' to display the search term in the input field", () => {
  render(<Filter search="testing" onSearchChange={noop} />);
  expect(screen.getByPlaceholderText(/Search\.\.\./).value).toBe("testing");
});

test("calls the onSearchChange callback prop when the input is changed", () => {
  const onChange = jest.fn();
  render(<Filter search="testing" onSearchChange={onChange} />);

  fireEvent.change(screen.getByPlaceholderText(/Search\.\.\./), {
    target: { value: "testing123" },
  });

  expect(onChange).toHaveBeenCalled();
});

// Shopping List tests
test("the shopping list displays all items when initially rendered", () => {
  const { container } = render(<ShoppingList items={testData} search="" />);
  expect(container.querySelector(".Items").children).toHaveLength(testData.length);
});

test("the shopping filters based on the search term to include full matches", () => {
  const { rerender } = render(<ShoppingList items={testData} search="Yogurt" />);
  
  expect(screen.getByText("Yogurt")).toBeInTheDocument();
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();

  // Update the search term
  rerender(<ShoppingList items={testData} search="Lettuce" />);
  
  expect(screen.getByText("Lettuce")).toBeInTheDocument();
  expect(screen.queryByText("Yogurt")).not.toBeInTheDocument();
});

test("the shopping filters based on the search term to include partial matches", () => {
  render(<ShoppingList items={testData} search="Cheese" />);

  // Check if the items that contain "Cheese" are displayed
  expect(screen.getByText("Swiss Cheese")).toBeInTheDocument();
  expect(screen.getByText("String Cheese")).toBeInTheDocument();

  // Check if the items that do NOT contain "Cheese" are not displayed
  expect(screen.queryByText("Lettuce")).not.toBeInTheDocument();
  expect(screen.queryByText("Yogurt")).not.toBeInTheDocument();
});

