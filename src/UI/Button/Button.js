import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  className,
  style,
  disabled,
  doNotScrollToTop,
}) => {
  const combinedClassName = ` transitions-all ${
    !disabled
      ? styles.customButton + " bg-white shadow-lg"
      : styles.disabledBtn + " bg-zinc-200"
  } ${className}`;

  const handleClick = () => {
    if (doNotScrollToTop) {
      console.log("hey");
      return;
    }
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  return (
    <button
      className={combinedClassName}
      disabled={disabled}
      onClick={(event) => {
        handleClick();
        if (onClick) onClick(event);
      }}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
