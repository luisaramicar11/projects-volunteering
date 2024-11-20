"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { IAllProjectsResponse, Metadata } from "@/app/core/application/dto";
import styles from "./Projects.module.scss";
import Section from "@/ui/molecules/Section/Projects";
import Table from "@/ui/organisms/Table/TableProjects";
import PageNavigation from "@/ui/molecules/PageNavigation/PageNavigation";
import ContainerCard from "@/ui/organisms/CardsContainer/CardsContainer";

interface IProjectsProps {
  pagination: Metadata;
  data: IAllProjectsResponse;
}

const ProjectsTemplate = ({ data, pagination }: IProjectsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleNext = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= pagination.totalPages) {
      params.set("page", nextPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const handlePrevious = (backPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (backPage > 0) {
      params.set("page", backPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  const currentPage = pagination.currentPage;

  return (
    <>
      <Section project={null} />
      <div className={styles.container}>
        <ContainerCard allData={data} />
        <div className={styles.div}>
          <div className={styles.contentWrapper}>
            <Table allData={data} />
          </div>
          <PageNavigation
            pagination={pagination}
            onNext={() => handleNext(currentPage + 1)}
            onPrevious={() => handlePrevious(currentPage - 1)}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectsTemplate;
