"use client";
import React from "react";
import { ModalOverlay, ModalContent, CloseButtonStyled } from "./ModalStyles";
import { FiX } from 'react-icons/fi';
import { ProjectForm } from '../Form/FormProjects';
import { Datum } from "@/app/core/application/dto";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Datum | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <CloseButtonStyled onClick={onClose}><FiX size={24}/></CloseButtonStyled>
        <ProjectForm initialData = {project} onClose={onClose}/>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;