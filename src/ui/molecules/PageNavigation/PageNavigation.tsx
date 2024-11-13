"use client";

import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import styles from "./PageNavigation.module.scss";
import { Metadata } from "@/app/core/application/dto";

// Interfaz para las props
interface PageNavigationProps {
  pagination: Metadata; // Datos de paginación (totalPages, currentPage, etc.)
  onNext: () => void; // Función para ir a la siguiente página
  onPrevious: () => void; // Función para ir a la página anterior
}

const PageNavigation = ({
  pagination,
  onNext,
  onPrevious,
}: PageNavigationProps) => {
  const currentPage = pagination.currentPage;
  const totalPages = pagination.totalPages;

  // Deshabilitar botones si estamos en la primera o última página
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className={styles.container}>
      {/* Botón para ir a la página anterior */}
      <button
        className={`${styles.button} ${isPreviousDisabled ? styles.disabled : ""}`}
        onClick={onPrevious}
        disabled={isPreviousDisabled}
      >
        <BsChevronLeft />
      </button>

      {/* Texto para mostrar la página actual y total */}
      <span className={styles.pageText}>
        Página {currentPage} de {totalPages}
      </span>

      {/* Botón para ir a la siguiente página */}
      <button
        className={`${styles.button} ${isNextDisabled ? styles.disabled : ""}`}
        onClick={onNext}
        disabled={isNextDisabled}
      >
        <BsChevronRight />
      </button>
    </div>
  );
};

export default PageNavigation;
