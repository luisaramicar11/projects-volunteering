"use client";

import { Datum, IAllProjectsResponse } from "@/app/core/application/dto";
import { EndpointProjects } from "@/app/core/application/dto/model/projects.enum";
import TableRow from "@/ui/molecules/TableRows/TableDataRow/TableDataRow";
import TableHeaderRow from "@/ui/molecules/TableRows/TableHeadRow/TableHeaderRow";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from "./TableProject.module.scss"
import Modal from "../Modal/Modal";
import { Input } from "@/ui/atoms";

interface ITableProps {
    allData: IAllProjectsResponse;
}

interface ISearchResponse {
    statusCode: number;
    message: string;
    data: Datum[];
    metadata: {
        totalPages: number;
        currentPage: number;
        totalItems: number;
    };
}

const Table = ({ allData }: ITableProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Datum | null>(null);
    const [filteredData, setFilteredData] = useState<Datum[]>(allData.data);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const router = useRouter();

    // Función para obtener todos los proyectos de todas las páginas
    const fetchAllPages = async (searchTerm: string): Promise<Datum[]> => {
        const allProjects: Datum[] = [];
        let currentPage = 1;
        let totalPages = 1;

        do {
            try {
                const response = await fetch(`/api/projects/findAll?page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los proyectos');
                }

                const result: ISearchResponse = await response.json();
                allProjects.push(...result.data);
                totalPages = result.metadata.totalPages;
                currentPage++;
            } catch (error) {
                console.error("Error fetching page", currentPage, error);
                break;
            }
        } while (currentPage <= totalPages);

        // Aplicar el filtro de búsqueda a todos los proyectos recolectados
        if (searchTerm.trim()) {
            const searchTerms = searchTerm.toLowerCase().split(' ');
            return allProjects.filter((project) => {
                const startDateStr = new Date(project.startDate).toLocaleDateString();
                const endDateStr = new Date(project.endDate).toLocaleDateString();
                
                const projectData = {
                    title: project.title.toLowerCase(),
                    description: project.description.toLowerCase(),
                    organizer: project.organizer.name.toLowerCase(),
                    startDate: startDateStr,
                    endDate: endDateStr,
                    status: project.isActive ? 'activo' : 'inactivo'
                };

                return searchTerms.every(term => 
                    Object.values(projectData).some(value => 
                        value.includes(term)
                    )
                );
            });
        }

        return allProjects;
    };

    // Función de búsqueda global
    const handleSearch = useCallback(async (query: string) => {
        setIsSearching(true);
        
        try {
            if (!query.trim()) {
                setFilteredData(allData.data);
                return;
            }

            const results = await fetchAllPages(query);
            setFilteredData(results);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            alert("Hubo un error al realizar la búsqueda. Por favor, intente nuevamente.");
        } finally {
            setIsSearching(false);
        }
    }, [allData.data]);

    // Efecto para el debounce de la búsqueda
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            handleSearch(searchQuery);
        }, 500); // Aumentado a 500ms para reducir las llamadas durante la escritura

        return () => clearTimeout(timeoutId);
    }, [searchQuery, handleSearch]);

    const handleDelete = async (id: number) => {
        const isConfirmed = window.confirm("¿Estás seguro que deseas borrar el proyecto?");
        if (!isConfirmed) return;
      
        try {
            const res = await fetch(`${EndpointProjects.DELETE_PROJECT.replace(":id", id.toString())}`, {
                method: "DELETE",
            });
      
            if (!res.ok) {
                throw new Error("Error borrando el proyecto");
            }
            
            setFilteredData(prevData => prevData.filter(project => project.id !== id));
            router.refresh();
        } catch (error) {
            console.error("Error al eliminar el proyecto:", error);
            alert("Hubo un error al eliminar el proyecto. Por favor, intente nuevamente.");
        }
    };

    const handleEdit = (project: Datum) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };
      
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);  
    };

    return (
        <div className="space-y-4">
            <div className="px-8 flex justify-between items-center">
                <div className="relative w-[37%]">
                    <Input
                        placeholder="Buscar por título, descripción, organizador, fechas o estado..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        disabled={isSearching}
                    />
                    {isSearching && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                        </div>
                    )}
                </div>
            </div>

            <table className={styles.table}>
                <TableHeaderRow/>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((project: Datum) => (
                            <TableRow
                                key={project.id}
                                title={project.title}
                                description={project.description}
                                startDate={project.startDate}
                                endDate={project.endDate}
                                isActive={project.isActive}
                                organizer={project.organizer.name}
                                onDelete={() => handleDelete(project.id)}
                                onEdit={() => handleEdit(project)}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="text-center py-4">
                                {isSearching ? 'Buscando...' : 'No se encontraron proyectos que coincidan con la búsqueda'}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                project={selectedProject}
            />
        </div>
    );
}

export default Table;