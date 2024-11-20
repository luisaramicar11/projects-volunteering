'use client'

import { IRegisterRequest } from "@/app/core/application/dto";
import Button from "@/ui/atoms/Button";
import Text from "@/ui/atoms/Parragraph";
import { FormField, FormFileField, FormSelectField } from "@/ui/molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./RegisterForm.module.scss"
import * as yup from "yup";
import { toast } from "react-toastify";

const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('Email requerido'),
    password: yup
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Contraseña requerida'),
    name: yup
        .string()
        .min(1, 'El nombre de usuario debe tener al menos 1 caracter')
        .required('Nombre de usuario requerido'),
    role: yup
        .string()
        .required('Rol requerido'),
    photo: yup
        .mixed<File>()
        .nullable()
        .notRequired()
});

const RegisterForm = () => {
    const router = useRouter();
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<IRegisterRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(registerSchema)
    });

    const handleRegister = async (data: IRegisterRequest) => {
        try {
            const formData = new FormData();

            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("name", data.name);
            formData.append("role", data.role);

            if (data.photo instanceof File) {
                formData.append("photo", data.photo);
            }else{
                console.log("La imagen no es un archivo valido")
            }

            const response = await fetch("/api/users/create-user", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Error al registrar el usuario");
            }
            toast.success("Usuario registrado exitosamente");
            router.push("/login")
            return await response.json();

        } catch (error) {
            console.error("Error en el POST:", error);
            throw error;
        }
    };


    return (
        <form className={styles.form} onSubmit={handleSubmit(handleRegister)}>
           <Text classname={styles.h1}>Registrarse</Text>

            <FormField<IRegisterRequest>
                control={control}
                type="email"
                name="email"
                label="Email"
                error={errors.email}
                placeholder="Ingrese Email"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="password"
                name="password"
                label="Contraseña"
                error={errors.password}
                placeholder="Ingrese Contraseña"
            />

            <FormField<IRegisterRequest>
                control={control}
                type="text"
                name="name"
                label="Nombre"
                error={errors.name}
                placeholder="Ingrese Nombre"
            />

            <div className={styles.containerPhoto}>
                <FormSelectField<IRegisterRequest>
                    control={control}
                    options={[
                        { value: "organizer", label: "Organizador" },
                        { value: "user", label: "Usuario" }
                    ]}
                    name="role"
                    label="Rol"
                    error={errors.role}
                    placeholder="Ingrese Rol"
                />

                <FormFileField<IRegisterRequest>
                    control={control}
                    name="photo"
                    label="Foto de Perfil"
                    error={errors.photo}
                />
            </div>
            <Button
        type="submit"
        className={styles.button}
      >
        Registrarse
      </Button>
        </form>
    );
};

export default RegisterForm;