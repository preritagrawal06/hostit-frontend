import { useNavigate } from "react-router-dom";
type CardProp = {
    name: string,
    projectId: string,
}
const ProjectCard = ({name, projectId}:CardProp) => {
    const navigate = useNavigate()
    return (
        <div onClick={()=>{navigate(`/project/${projectId}`)}} className="flex flex-col items-center gap-4 p-4 border hover:rounded-lg hover:border-black transition-all duration-300 cursor-pointer">
            <div className="w-[200px] h-[200px] bg-slate-500">
                {/* insert preview image */}
            </div>
            <div className="w-full flex justify-between items-center">
                <h1>{name}</h1>
                <p>Live</p>
            </div>
        </div>
    );
}

export default ProjectCard;