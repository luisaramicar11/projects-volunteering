"use client";
import React from 'react';
import { useState } from "react";
import styles from "./Projects.module.scss"
import Button from '@/ui/atoms/Button';
import { Datum } from '@/app/core/application/dto';
import Modal from '@/ui/organisms/Modal/Modal';
import Text from '@/ui/atoms/Parragraph';

interface sectionProps {
  project: Datum | null;
}

const Section = ({project}: sectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.div}>
      <Text>Dashboard</Text>
      <Button
            onClick={openModal}
          >
            Agregar Proyecto
          </Button>
          <Modal isOpen={isModalOpen} onClose={closeModal} project={project} />
    </div>
  )
}

export default Section