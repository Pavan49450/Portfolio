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
  const combinedClassName = `active:scale-90 transitions-all ${
    !disabled
      ? styles.customButton + " bg-white shadow-lg"
      : styles.disabledBtn + " bg-white shadow-lg opacity-50"
  } ${className}`;

  const handleClick = () => {
    if (doNotScrollToTop) {
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
