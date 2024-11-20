
import { IAllProjectsRequest } from '@/app/core/application/dto';
import { ProjectService } from '@/app/infrastructure';
import ProjectsTemplate from '@/ui/template/Projects/Projects';
import React from 'react'

interface IProps{
  searchParams: IAllProjectsRequest
}

export const generateMetadata = async({searchParams}: IProps) =>{
    const page = searchParams.page ?? 1;
    return {
        title: `Projects List - Page ${page}`,
        description: `List of projects on page ${page}`,
        meta: [
            { name: 'description', content: `List of projects on page ${page}` },
            { property: 'og:title', content: `Projects List - Page ${page}` },
            { property: 'og:description', content: `List of projects on page ${page}` },
        ],
    }
  }

const projectService = new ProjectService();

export default async function ProjectPage({searchParams}: IProps){
    const page = searchParams.page ? parseInt(searchParams.page.toString()): 1;
    const data = await projectService.findAll({page, size:3});
    return (
        <ProjectsTemplate data={data} pagination={data.metadata}/>
    )
}