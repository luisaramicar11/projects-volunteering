"use client";
import { Datum, ErrorResponse, FieldError, IProjectRequest } from "@/app/core/application/dto";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import styles from "./FormProject.module.scss"
import Text from "@/ui/atoms/Parragraph";
import { FormField } from "@/ui/molecules";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { EndpointProjects } from "@/app/core/application/dto/model/projects.enum";
import Button from "@/ui/atoms/Button";


interface IProjectsFormProps {
    initialData?: Datum | null;
    onClose: () => void;
}

const initialProjectsData = {
    title: "",
    description:  "",
    startDate: new Date(),
    endDate: new Date(),
};

const projectsSchema = yup.object().shape({
    title: yup.string().required("El título es obligatorio"),
    description: yup.string().required("La descripción es obligatoria"),
    startDate: yup.date().required("El inicio del proyecto es obligatorio"),
    endDate: yup.date().required("La fecha de fin del proyecto es obligatoria"),
});

export const ProjectForm = ({ initialData, onClose }: IProjectsFormProps) => {
    const {
        control,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<IProjectRequest>({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(projectsSchema),
        defaultValues: initialProjectsData,
    });
    
    const router = useRouter();
    // Rellenar el formulario con los valores iniciales (si existen)
    useEffect(() => {
        if (initialData) {
            setValue("title", initialData.title);
            setValue("description", initialData.description);
            setValue("startDate", initialData.startDate);
            setValue("endDate", initialData.endDate);
        }
    }, [initialData, setValue]);

    // Función para crear un servicio
    const handleCreateProject = async (data: IProjectRequest) => {
        try {
            const res = await fetch(EndpointProjects.CREATE_PROJECT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Error creando el proyecto");
            }
            const createdProject= await res.json();
            onClose();
            console.log("Proyecto creado", createdProject);
        } catch (error) {
            console.error("Error creando proyecto", error);
            handleError(error);
        }
    };

    // Función para actualizar un servicio
    const handleUpdateProject = async (data: IProjectRequest) => {
        const id = (initialData?.id)?.toString();  
         if (!id) {
             throw new Error("Proyecto no encontrado o sin ID");
         }

        try {
            const res = await fetch(EndpointProjects.UPDATE_PROJECT.replace(":id", id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                throw new Error("Error actualizando proyecto");
            }
            const updatedProject = await res.json();
            router.refresh();
            onClose();
            console.log("Proyecto actualizado", updatedProject);
        } catch (error) {
            console.error("Error actualizando proyecto", error);
            handleError(error);
        }
    };

    // Función para manejar errores de validación y mostrarlos
    const handleError = (error: unknown) => {
        const errorData = error as ErrorResponse;
        if (errorData && errorData.errors) {
            if (Array.isArray(errorData.errors) && "field" in errorData.errors[0]) {
                errorData.errors.forEach((fieldError) => {
                    const { field, error } = fieldError as FieldError;
                    setError(field as keyof IProjectRequest, {
                        message: error,
                    });
                });
            } else {
                if ("message" in errorData.errors[0]) {
                    setError("title", {
                        message: errorData.errors[0].message,
                    });
                }
            }
        }
    };

    // Función para manejar el submit del formulario, decide si crear o actualizar
    const onSubmit = async (data: IProjectRequest) => {
        if (initialData) {
            handleUpdateProject(data);
        } else {
            handleCreateProject(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Text classname={styles.h1}>{initialData ? "Editar Cliente" : "Agregar Cliente"}</Text>

            <FormField<IProjectRequest>
                control={control}
                type="text"
                label="Título"
                name="title"
                error={errors.title}
            />

            <FormField<IProjectRequest>
                control={control}
                type="text"
                label="Descripción"
                name="description"
                error={errors.description}
            />

            <FormField<IProjectRequest>
                control={control}
                type="Date"
                label="Fecha de inicio"
                name="startDate"
                error={errors.startDate}
            />

            <FormField<IProjectRequest>
                control={control}
                type="Date"
                label="Fecha final"
                name="endDate"
                error={errors.endDate}
            />

            <Button
                type="submit"
                className={styles.button}
            >
                {initialData ? "Actualizar" : "Agregar"}
            </Button>
        </form>
    );
};