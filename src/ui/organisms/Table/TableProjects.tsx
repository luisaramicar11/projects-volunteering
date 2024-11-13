"use client";

import { Datum, IAllProjectsResponse } from "@/app/core/application/dto";
import { EndpointProjects } from "@/app/core/application/dto/model/projects.enum";
import TableRow from "@/ui/molecules/TableRows/TableDataRow/TableDataRow";
import TableHeaderRow from "@/ui/molecules/TableRows/TableHeadRow/TableHeaderRow";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./TableProject.module.scss"
import Modal from "../Modal/Modal";

interface ITableProps {
    allData: IAllProjectsResponse;
}
const Table = ({allData}: ITableProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Datum | null>(null);

    const router = useRouter();

    const handleDelete = async (id: number) => {
        console.log("ID a eliminar:", id); // Imprime el id para verificar
      
        // Convertimos el id a string, ya que la URL espera un string
        const idString = id.toString();
        console.log("ID en string:", idString); // Verifica que el ID esté convertido a string
      
        const isConfirmed = confirm("¿Estás seguro que deseas borrar el proyecto?");
        if (!isConfirmed) return;
      
        try {
          const res = await fetch(`${EndpointProjects.DELETE_PROJECT.replace(":id", idString)}`, {
            method: "DELETE",
          });
      
          if (!res.ok) {
            throw new Error("Error borrando el proyecto");
          }
          console.log("Proyecto eliminado");
          router.refresh();
        } catch (error) {
          console.log("Error al eliminar el proyecto", error);
        }
      };

      const handleEdit = (proyect: Datum) => {
        setSelectedProject(proyect);
        setIsModalOpen(true);
      };
      
      const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);  
      };

      return (
        <table className={styles.table}>
            <TableHeaderRow/>
          <tbody>
            {allData.data.map((project) => (
              <TableRow
                key={project.id}
                title={project.title}
                description={project.description}
                startDate={project.startDate}
                endDate={project.endDate}
                isActive={project.isActive}
                organizer={project.organizer.name}
                onDelete={()=> handleDelete(project.id)}
                onEdit={()=> handleEdit(project)}
              />
                
              
            ))}
          </tbody>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} project={selectedProject}/>
        </table>
          
        
      );
      
}

export default Table;