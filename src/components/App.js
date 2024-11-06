// src/components/App.js
import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";
import Filter from "./Filter";
import ItemForm from "./ItemForm";
import itemData from "../data/items";

function App() {
  const [items, setItems] = useState(itemData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Toggle dark mode
  function handleDarkModeClick() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  // Handle changes in search input
  function handleSearchChange(event) {
    setSearch(event.target.value);
  }

  // Handle changes in category dropdown
  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  // Handle new item submission
  function handleItemFormSubmit(newItem) {
    setItems([...items, newItem]);
  }

  // Filter items based on search and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        search={search}
        category={category}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
      />
      <ShoppingList items={filteredItems} />
    </div>
  );
}

export default App;
