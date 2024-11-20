'use client';
import React from "react";
import Links from "@/ui/atoms/Link/Link";
import styles from "./Sidebar.module.scss";
import { signOut } from "next-auth/react";
import { LuFolderOpen, LuLogOut } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";

export const Sidebar: React.FC = () => {
    const pathname = usePathname();

    const router = useRouter();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('Cerrando sesión');
        try {
            await signOut({ redirect: false });
            router.push('/login');
        } catch (error) {
            console.log("Error al cerrar la sesión", error);
        }
    };

    const clickedLink = async () => {
        console.log("You clicked on a sidebar link. Wait to be redirected.")
    };

    const navUserLinks = [
        { name: "Proyectos", href: "/dashboard/projects", icon: <LuFolderOpen />, isLogout: false },
        { name: "Cerrar Sesión", href: "/", icon: <LuLogOut />, isLogout: true }
    ]

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
                        <Links  className={isActive ? `${styles.activeLink}` : ""} key={link.name} href={link.href} label={link.name} icon={link.icon} onClick={isLogout} />
                    )
                }
                )}
            </div>
        </div>
    );
};
