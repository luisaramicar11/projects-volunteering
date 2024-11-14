import React from 'react'

import { FaRegFolderOpen } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IAllProjectsResponse } from '@/app/core/application/dto';
import styles from "./CardsContainer.module.scss"
import Card from '@/ui/molecules/Card/Card';
interface cardProps{
    allData: IAllProjectsResponse
}

export default function ContainerCard( { allData } : cardProps ) {

    return (
        <div className={styles.gridContainer}>
            <Card value={allData.metadata.totalItems} title="Total Proyectos" icon={<FaRegFolderOpen className="text-[1.4em]"  />} />
            <Card value={allData.metadata.totalItems} title="Proyectos Activos" icon={<GiNetworkBars className="text-[1.4em]" />} />
            <Card value={3} title="Organizadores" icon={<LuUsers className="text-[1.4em]" />} />
            <Card value={3} title="Proximo Proyecto" icon={<FiCalendar className="text-[1.4em]" />} />
        </div>
    )
}