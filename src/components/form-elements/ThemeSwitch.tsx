// src/ThemeSwitch.js
import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Icon } from "../wrappers";

const ThemeSwitch = ({ theme, toggleTheme }) => {
  return (
    <div className="switch-container" onClick={toggleTheme}>
      <div className={`switch-thumb ${theme}`}>
        <Icon icon="mage:moon" fontSize="2xl" />
        <Icon icon="mage:sun" fontSize="2xl" />
        <div className={`switch-thumb ${theme}`}></div>
      </div>
    </div>
  );
};

export default ThemeSwitch;
