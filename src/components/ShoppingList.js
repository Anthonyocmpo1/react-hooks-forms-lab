// src/components/ShoppingList.js
import React from "react";
import Item from "./Item";

function ShoppingList({ items, search }) {
  const filteredItems = items.filter((item) =>
    item.name && item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ShoppingList">
      <ul className="Items">
        {filteredItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
