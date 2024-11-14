"use client";
import React from 'react';
import { useState } from "react";
import styles from "./Projects.module.scss"
import Button from '@/ui/atoms/Button';
import { Datum } from '@/app/core/application/dto';
import Modal from '@/ui/organisms/Modal/Modal';
import { GrAddCircle } from "react-icons/gr";
import { LuFileSpreadsheet } from "react-icons/lu";
import Links from '@/ui/atoms/Link/Link';
interface sectionProps {
  project: Datum | null;
}

const Section = ({project}: sectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.div}>
      <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.mainTitle}>Dashboard de Proyectos</h1>
      </div>
      <Button className={styles.button}>
      {<LuFileSpreadsheet />}
      Descargar Reporte
      </Button>
      <Button className={styles.button} onClick={openModal}>
      {<GrAddCircle />}
      Nuevo proyecto
      </Button>
      <Links
          href="/"
          className={styles.profileLink}
          label={"Profile"}
          icon={<GrAddCircle />}
        />
          <Modal isOpen={isModalOpen} onClose={closeModal} project={project} />
    </div>
    </div>
    
  )
}

export default Section