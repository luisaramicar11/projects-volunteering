import { Control, Controller, FieldError, FieldValues, Path } from "react-hook-form";
import styles from "./FormSelect.module.scss"
import InputSelect from "@/ui/atoms/InputSelect/InputSelect";

interface IpropsFormSelectField<T extends FieldValues> {
    label: string;
    name: Path<T>;
    control: Control<T>;
    error?: FieldError;
    id?: string;
    placeholder?: string;
    options: { value: string, label: string }[];
}

export const FormSelectField = <T extends FieldValues>({
    label,
    name,
    control,
    error,
    id,
    placeholder,
    options,
}: IpropsFormSelectField<T>) => {
    return(
        <div className={styles.div}>
            <label className={styles.label} htmlFor={id || label.toLowerCase()}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <InputSelect
                        id={id || label.toLowerCase()}
                        error={error?.message}
                        options={options}
                        placeholder={placeholder || `Ingrese su ${label.toLowerCase()}`}
                        {...field}
                    />
                )}
            />
        </div>
    )
}