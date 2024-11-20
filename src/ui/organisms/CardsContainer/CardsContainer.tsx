"use client";
import React, { useState, useEffect } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IAllProjectsResponse } from "@/app/core/application/dto";
import Card from "@/ui/molecules/Card/Card";
import styles from "./CardsContainer.module.scss";

interface CardProps {
  allData: IAllProjectsResponse;
}

export default function ContainerCard({ allData }: CardProps) {
  const [activeProjects, setActiveProjects] = useState<string>("0");
  const [nextProjectDate, setNextProjectDate] =
    useState<string>("No disponible");
  const [organizersCount, setOrganizersCount] = useState<string>("0");
  const [allProjectsData, setAllProjectsData] =
    useState<IAllProjectsResponse | null>(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await fetch("/api/projects/findAll");
        const data = await response.json();
        setAllProjectsData(data);
      } catch (error) {
        console.error("Error fetching all projects:", error);
      }
    };

    fetchAllProjects();
  }, []);

  useEffect(() => {
    if (allProjectsData) {
      const active = allProjectsData.data.filter(
        (project) => project.isActive
      ).length;
      setActiveProjects(active.toString());

      const nextProject = allProjectsData.data
        .filter((project) => new Date(project.startDate) > new Date())
        .sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        )[0];

      if (nextProject) {
        setNextProjectDate(
          new Date(nextProject.startDate).toLocaleDateString()
        );
      }

      const uniqueOrganizers = new Set(
        allProjectsData.data
          .filter((project) => project.organizer?.name)
          .map((project) => project.organizer.name)
      );
      setOrganizersCount(uniqueOrganizers.size.toString());
    }
  }, [allProjectsData]);

  return (
    <div className={styles.gridContainer}>
      <Card
        value={allData.metadata.totalItems.toString()}
        title="Total Proyectos"
        icon={<FaRegFolderOpen className="text-[1.4em]" />}
      />
      <Card
        value={activeProjects}
        title="Proyectos Activos"
        icon={<GiNetworkBars className="text-[1.4em]" />}
      />
      <Card
        value={organizersCount}
        title="Organizadores"
        icon={<LuUsers className="text-[1.4em]" />}
      />
      <Card
        value={nextProjectDate}
        title="Próximo Proyecto"
        icon={<FiCalendar className="text-[1.4em]" />}
      />
    </div>
  );
}
