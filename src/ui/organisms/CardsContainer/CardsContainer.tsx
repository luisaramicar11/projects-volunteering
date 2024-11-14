"use client";
import React, { useState, useEffect } from 'react';
import { FaRegFolderOpen } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IAllProjectsResponse } from '@/app/core/application/dto';
import styles from "./CardsContainer.module.scss";
import Card from '@/ui/molecules/Card/Card';

interface cardProps {
  allData: IAllProjectsResponse;
}

export default function ContainerCard({ allData }: cardProps) {
  const [activeProjects, setActiveProjects] = useState<string>("0");
  const [nextProjectDate, setNextProjectDate] = useState<string>("No disponible");
  const [organizersCount, setOrganizersCount] = useState<string>("0");

  useEffect(() => {
    // Filtrar los proyectos activos
    setActiveProjects(allData.data.filter(project => project.isActive).length.toString());

    // Filtrar y ordenar los proyectos por fecha para obtener el siguiente proyecto
    const nextProject = allData.data
      .filter(project => new Date(project.startDate) > new Date()) // Filtra los proyectos cuya fecha de inicio es mayor que la fecha actual
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];

    if (nextProject) {
      setNextProjectDate(new Date(nextProject.startDate).toLocaleDateString());
    } else {
      setNextProjectDate('No disponible');
    }

    // Contar los organizadores únicos
    const allOrganizer = new Set(allData.data.map(project => project.organizer?.name)).size;
    setOrganizersCount(allOrganizer.toString());

  }, [allData]); // Esto se ejecutará solo cuando `allData` cambie

  return (
    <div className={styles.gridContainer}>
      <Card value={allData.metadata.totalItems.toString()} title="Total Proyectos" icon={<FaRegFolderOpen className="text-[1.4em]" />} />
      <Card value={activeProjects} title="Proyectos Activos" icon={<GiNetworkBars className="text-[1.4em]" />} />
      <Card value={organizersCount} title="Organizadores" icon={<LuUsers className="text-[1.4em]" />} />
      <Card value={nextProjectDate} title="Próximo Proyecto" icon={<FiCalendar className="text-[1.4em]" />} />
    </div>
  );
}
