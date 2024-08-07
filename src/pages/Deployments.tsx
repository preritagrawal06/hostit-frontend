import { Link, useLoaderData, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DeploymentCard from "@/components/project/deploymentCard";
import { Navigate } from "react-router-dom";
import { userStore } from "@/store/userStore"
import {  useState } from "react";
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

type LoaderData = {
    project: Project,
    deployments: Deployment[]
}

const Deployments = () => {
    const params = useParams()
    // console.log(params.projectId);
    const user = userStore((state) => state.user)
    const loaderData = useLoaderData() as LoaderData
    const project = loaderData.project
    // const [project, setProject] = useState<Project>()
    const [deployments, setDeployments] = useState<Deployment[]>(loaderData.deployments)

    const fetchDeployments = async () => {
        const data = await CallBackendApi({ endpoint: "/project/deployments", body: { projectId: params.projectId } })
        // console.log(data.deployments);
        setDeployments(data.deployments)
    }

    // useEffect(() => {
    //     const fetchProject = async () => {
    //         const data = await CallBackendApi({ endpoint: '/project/getone', body: { projectId: params.projectId } })
    //         // console.log(data.project.subDomain);
    //         setProject(data.project)
    //     }
    //     fetchProject()
    //     fetchDeployments()
    // }, [])

    const handleDeploy = async () => {
        try {
            const deployData = await CallBackendApi({ endpoint: "/deploy", body: { projectId: params.projectId, envs: [] } })
            console.log(deployData);
            await fetchDeployments()
        } catch (error) {
            console.log((error as Error).message);
        }
    }

    return (user ?
        (
            <div className="w-full flex flex-col items-center mt-8">
                <div className="flex w-[80%] p-4 md:p-8 justify-between items-center bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg">
                    <div className="flex flex-col ">
                        <h1 className="text-lg md:text-2xl font-semibold">{project && project.name}</h1>
                        <Link to={`https://${project.subDomain}.hostitapp.preritagrawal.in`} target="_blank">{project && project.subDomain}</Link>
                    </div>
                    <Button onClick={handleDeploy}>Deploy</Button>
                </div>
                {
                    deployments && deployments.length > 0 ?
                        <div className="w-[80%] mt-8 flex flex-col rounded-lg border">
                            <div className="hidden md:grid p-4 w-full border border-b grid-cols-8 items-center font-semibold">
                                <p className="col-span-2 ">Deployment ID</p>
                                <p className="col-span-3 place-self-center">Deployment Date</p>
                                <p className={`col-span-2 place-self-center`}>Status</p>
                            </div>
                            {
                                deployments.map((deployment: Deployment, index: number) => {
                                    return <DeploymentCard key={index} deploymentDate={new Date(deployment.createdAt).toUTCString()} deploymentId={deployment.id} status={deployment.status} />
                                })

                            }
                        </div>
                        :
                        <p className="mt-8">No Deployments found</p>

                }
            </div>
        )
        :
        <Navigate to="/auth" />
    );
}

export default Deployments;