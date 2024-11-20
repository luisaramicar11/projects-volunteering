import styles from "./inputSelect.module.scss"

interface InputselectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { value: string, label: string }[];
    placeholder?: string;
    error?: string;
    name?: string;
}

const InputSelect = ({
    options,
    placeholder = "Seleccione",
    error,
    name,
    ...props
}: InputselectProps) => {
    return (
        <div className={styles.div}>
            <select
                name={name}
                className={styles.select}
                {...props}
            >
                <option className={styles.option}>{placeholder}</option>
                {options.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
            {error && <p className={styles.p}>{error}</p>}
        </div>
    );
};

export default InputSelect;