import React from "react";
import { useRouter } from "next/router";

const FilterBar: React.FC<{
  categories: string[];
  selectedCategory: string;
}> = ({ categories, selectedCategory }) => {
  const router = useRouter();
  console.log("tarun insde filterbar", categories, selectedCategory);
  const handleCategoryClick = (category: string) => {
    router.push(`/?category=${encodeURIComponent(category)}`);
  };

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          style={{
            fontWeight: category === selectedCategory ? "bold" : "normal",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
