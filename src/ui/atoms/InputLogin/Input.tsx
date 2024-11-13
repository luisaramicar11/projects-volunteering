import React from "react";
import styles from "./Input.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  type?: string;
  name?: string;
  error?: string;
}

export const Input = ({
  placeholder,
  type = "text",
  name,
  error,
  ...props
}: InputProps) => {
  return (
    <div className={styles.div}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={styles.input}
        {...props}
      />
      {error && <p className={styles.p}>{error}</p>}
    </div>
  );
};
