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
            <div className="w-full flex flex-col p-10 gap-4">
                <div className="flex px-0 md:px-4 items-center justify-between">
                    <p className="text-3xl font-bold">{user.username}'s projects</p>
                    <Link className="font-semibold" to='/project/new'>+ New Project</Link>
                </div>
                <div className="flex flex-wrap gap-6 px-0 md:px-4 py-4">
                    {
                        projects.length > 0 &&
                        projects.map((project: Project, index)=>{
                            return <ProjectCard key={index} project={project}/>
                        })
                    }
                </div>
            </div>
        )
        :
        <Navigate to="/login"/>
    );
}
 
export default Dashboard;