import styles from "./Button.module.css";
import React, { HTMLAttributes } from "react";
import classNames from "classnames";

interface ButtonProps extends Pick<HTMLAttributes<HTMLElement>, "className"> {
  children: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={classNames(styles.buttonElement, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
