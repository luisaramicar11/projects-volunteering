'use client';
import React from "react";
import Links from "@/ui/atoms/Link/Link";
import styles from "./Sidebar.module.scss";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { LuFolderOpen, LuLogOut } from "react-icons/lu";
import Button from '@/ui/atoms/Button';

const navUserLinks = [
    { name: "Proyectos", href: "/dashboard", icon: <LuFolderOpen /> },
    { name: "Cerrar Sesión", href: "/", icon: <LuLogOut /> }
];

export const Sidebar: React.FC = () => {
    const router = useRouter();  
    const pathname = usePathname();

    const handleLogout = async (event: React.MouseEvent) => {
        event.preventDefault(); // Evita la navegación por defecto
        console.log('Cerrando sesión');
        try {
            await signOut({ redirect: false });
            router.push('/login');
        } catch (error) {
            console.log("Error al cerrar la sesión", error);
        }
    };

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.titleContainer}>
                <h1 className={styles.mainTitle}>VolunteerConnect</h1>
            </div>
            <div className={styles.linksContainer}>
                <Links href="/dashboard/projects" label="Proyectos"/>
                <Button  onClick={handleLogout}>Cerrar session</Button>
            </div>
        </div>
    );
};
