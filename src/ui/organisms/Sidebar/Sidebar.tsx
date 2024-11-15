'use client';
import React from "react";
import Links from "@/ui/atoms/Link/Link";
import styles from "./Sidebar.module.scss";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { LuFolderOpen, LuLogOut } from "react-icons/lu";
import Button from '@/ui/atoms/Button';
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

    const navUserLinks = [
        { name: "Proyectos", href: "/dashboard/projects", icon: <LuFolderOpen />, isLogout: false },
        { name: "Cerrar Sesión", href: "/", icon: <LuLogOut />, isLogout: true  }
    ];

    const clickedLink = async () => {
        console.log("You clicked on a sidebar link. Wait to be redirected.")
    };
    

    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.titleContainer}>
                <h1 className={styles.mainTitle}>VolunteerConnect</h1>
            </div>
            <div className={styles.linksContainer}>
            {navUserLinks.map((link) => {
                    const isActive = pathname == (link.href) ? true : false;
                    const isLogout = (link.isLogout) ? handleLogout : clickedLink;

                    return (
                        <Links className={isActive ? `${styles.activeLink}` : ""} key={link.name} href={link.href} label={link.name} icon={link.icon} onClick={isLogout} />
                    )
                }
                )}
            </div>
        </div>
    );
};
