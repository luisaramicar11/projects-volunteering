import React from "react";
import styles from "./InputSearch.module.scss";

interface InputProps {
  placeholder?: string;
  type?: string;
  name?: string;
  onChange?: (value: string) => void;
  value?: string | number;
}

export const InputSearch = ({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div className={styles.div}>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className={styles.input}
        onChange={(e) => onChange?.(e.target.value)}
        {...props}
      />
    </div>
  );
};
