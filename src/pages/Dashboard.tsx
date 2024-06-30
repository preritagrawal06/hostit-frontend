import ProjectCard from "@/components/project/projectCard";
import { Link, useLoaderData } from "react-router-dom";
import { userStore } from "@/store/userStore";
import { Navigate } from "react-router-dom";

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

const Dashboard = () => {

    const user = userStore((state) => state.user)
    const projects = useLoaderData() as Project[]
    
    // const [projects, setProjects] = useState<Project[]>(data as Project[])

    // useEffect(()=>{
    //     const fetchData = async()=>{
    //         const {data} = await axios.get('http://localhost:9000/api/v1/project/getall', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    //         // console.log(data.projects);
    //         setProjects(data.projects)
    //     }
    //     fetchData()
    // },[])

    return (user ?
        (
            <div className="w-full flex p-10">
                <div className="flex flex-wrap justify-center gap-6 px-0 md:px-4 py-4">
                    {
                        projects.length > 0 &&
                        projects.map((project: Project, index)=>{
                            return <ProjectCard key={index} name={project.name} projectId={project.id}/>
                        })
                    }
                    <Link to="/project/new" className="flex">
                        <div className="w-[240px] flex flex-col items-center justify-center gap-4 p-4 cursor-pointer border border-dashed hover:rounded-lg hover:border-black transition-all">
                            <h1 className="text-5xl font-bold">+</h1>
                            <h1>New Project</h1>
                        </div>
                    </Link>
                </div>
            </div>
        )
        :
        <Navigate to="/login"/>
    );
}
 
export default Dashboard;