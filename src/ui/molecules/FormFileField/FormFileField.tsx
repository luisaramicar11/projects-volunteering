import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import styles from "./FormFileField.module.scss"

interface IPropsSelectFile<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    accept?: string;
}

export const FormFileField = <T extends FieldValues>({
    label,
    name,
    control,
    error,
    id,
    accept,
}: IPropsSelectFile<T>) => {
    return (
        <div className={styles.div}>
            <label className={styles.label} htmlFor={id || label.toLowerCase()}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <input
                        className={styles.input}
                        type="file"
                        id={id || label.toLowerCase()}
                        {...field}
                        accept={accept}
                    />
                )}
            />
            {error && <p className={styles.p}>{error.message}</p>}
        </div>
    );
};