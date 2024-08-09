import React from "react";
import { css } from "styled-system/css";
import { Flex } from "styled-system/jsx";

const searchBarContainerStyle = css({
  display: "flex",
  alignItems: "center",
  position: "relative",
  flex: "1",
});

const searchBarIconStyle = css({
  position: "absolute",
  left: "1rem",
  width: "1rem",
  height: "1rem",
  pointerEvents: "none",
});

const searchBarStyle = css({
  padding: "0.5rem 1rem 0.5rem 2.5rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  width: "100%",
});

const SearchBar: React.FC = () => {
  return (
    <div className={searchBarContainerStyle}>
      <svg
        className={searchBarIconStyle}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm6-6l6 6"
        />
      </svg>
      <input
        type="text"
        placeholder="Search product or Art.-Nr."
        className={searchBarStyle}
      />
    </div>
  );
};

export default SearchBar;
