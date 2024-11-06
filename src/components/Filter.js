// src/components/Filter.js
import React from "react";

function Filter({ search, category, onSearchChange, onCategoryChange }) {
  return (
    <div className="Filter">
      {/* Search input */}
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={onSearchChange}
      />
      
      {/* Category filter dropdown */}
      <select name="filter" value={category} onChange={onCategoryChange}>
        <option value="All">Filter by category</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
  );
}

export default Filter;
