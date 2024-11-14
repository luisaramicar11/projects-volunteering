"use client";
import React from 'react';
import { useState } from "react";
import styles from "./Projects.module.scss"
import Button from '@/ui/atoms/Button';
import { Datum, EndpointReports } from '@/app/core/application/dto';
import Modal from '@/ui/organisms/Modal/Modal';
import { GrAddCircle } from "react-icons/gr";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useSession } from 'next-auth/react';
import Dropdown from '../Dropdown/Dropdown';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
interface sectionProps {
  project: Datum | null;
}

const Section = ({project}: sectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {data: session} = useSession()
  const router = useRouter();

  if (!session || !session.user || !session.user.email) {
    // Si no hay sesión o no hay email, no renderizamos el componente
    return null;
  }

  const user = session.user;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSignOut = () => {
    signOut(); 
    router.push('/login');

  };

  const handleDownloadReport = async () => {
    try {
      const res = await fetch(EndpointReports.GET_REPORTS, {
        method: "GET",
      })
      if (!res.ok) {
        throw new Error("Error descargando el reporte");
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reportes_proyectos.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    } catch (error) {
      console.log("Error descargando los reportes", error)
    }
  }

  return (
    <div className={styles.div}>
      <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>Dashboard de Proyectos</h1>
      </div>
      <Button className={styles.button} onClick={handleDownloadReport}>
      {<LuFileSpreadsheet />}
      Descargar Reporte
      </Button>
      <Button className={styles.button} onClick={openModal}>
      {<GrAddCircle />}
      Nuevo proyecto
      </Button>
      <Dropdown user={user} signOut={handleSignOut}/>
          <Modal isOpen={isModalOpen} onClose={closeModal} project={project} />
    </div>
    </div>
    
  )
}

export default Section