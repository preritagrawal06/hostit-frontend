import { useNavigate } from "react-router-dom";

type Project = {
    id: string,
    name: string,
    gitURL: string,
    subDomain: string,
    customDomain?: string,
    userId: string,
    createdAt: Date,
    updatedAt?: Date
}

const ProjectCard = ({project}:{project: Project}) => {
    const navigate = useNavigate()
    return (
        <div onClick={()=>{navigate(`/project/${project.id}`)}} className="w-full md:w-[45%] lg:w-[30%] flex flex-col p-4 border hover:rounded-lg hover:border-black transition-all duration-300 cursor-pointer">
            <h1>{project.name || "dummy name"}</h1>
            <p>{project.subDomain}</p>
            <div className="my-2 px-3 py-1 bg-gray-700 w-fit rounded-2xl flex gap-2 items-center">
                <img src="/github.svg" alt="github logo" width={16}/>
                <p className="text-sm text-white">{project.gitURL.substring(19, project.gitURL.length - 4)}</p>
            </div>
            <p className="text-sm">Created - {project.createdAt.toString().split('T')[0]}</p>
        </div>
    );
}

export default ProjectCard;