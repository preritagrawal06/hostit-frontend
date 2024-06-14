import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeploymentCard from "@/components/project/deploymentCard";
import { Navigate } from "react-router-dom";
import { userStore } from "@/store/userStore"
import { useEffect, useState } from "react";
import { CallBackendApi } from "@/lib/utils/callBackendApi";

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

type Deployment = {
    id: string,
    projectId: string,
    status: string,
    createdAt: Date,
    updatedAt?: Date
}

const Deployments = () => {
    const params = useParams()
    // console.log(params.projectId);
    const user = userStore((state) => state.user)
    const [project, setProject] = useState<Project>()
    const [deployments, setDeployments] = useState<Deployment[]>([])
    useEffect(()=>{
        const fetchProject = async()=>{
            const data = await CallBackendApi({endpoint: '/project/getone', body:{projectId: params.projectId}})
            // console.log(data.project.subDomain);
            setProject(data.project)
        }
        const fetchDeployments = async()=>{
            const data = await CallBackendApi({endpoint: "/project/deployments", body: {projectId: params.projectId}})
            // console.log(data.deployments);
            setDeployments(data.deployments)
        }
        fetchProject()
        fetchDeployments()
    }, [])

    return (user ?
        (
            <div className="w-full flex flex-col items-center mt-8">
                <div className="flex w-[80%] p-4 md:p-8 justify-between items-center bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
                    <div className="flex flex-col ">
                        <h1 className="text-lg md:text-2xl font-semibold">{project && project.name}</h1>
                        <Link to="/#">{project && project.subDomain}</Link>
                    </div>
                    <Button>Deploy</Button>
                </div>
                {
                    deployments.length > 0 ?
                    <div className="w-[80%] mt-8 flex flex-col rounded-lg border">
                        {
                            deployments.map((deployment: Deployment, index: number)=>{
                                return <DeploymentCard key={index}/>
                            })

                        }
                    </div>
                    :
                    <p className="mt-8">No Deployments found</p>

                }
            </div>
        )
        :
        <Navigate to="/login"/>
    );
}

export default Deployments;