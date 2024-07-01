import { useLoaderData, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { userStore } from "@/store/userStore"
import { useEffect, useState } from "react";
import axios from "axios";

type Deployment = {
    id: string,
    projectId: string,
    status: string,
    createdAt: Date,
    updatedAt?: Date
}

type Log = {
    event_id: string,
    deployment_id: string,
    log: string,
    timestamp: string
}

type LoaderData = {
    logs: Log[],
    deployment: Deployment
}

const statusColor: any = {
    "FAIL": "text-red-500",
    "READY": "text-green-500",
    "IN_PROGRESS": "text-yellow-500"
}

const Logs = () => {
    const params = useParams()
    // console.log(params);
    const user = userStore((state) => state.user)
    const loaderData = useLoaderData() as LoaderData
    const [logs, setLogs] = useState(loaderData.logs)
    const [deployment, setDeployment] = useState<Deployment>(loaderData.deployment)

    const fetchLogs = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_PROD_BASE_URL}/logs/${params.deploymentId}`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        // console.log(data);
        setLogs(data.logs)
    }

    const fetchDeployment = async()=>{
        const {data} = await axios.get(`${import.meta.env.VITE_PROD_BASE_URL}/project/deployment/${params.deploymentId}`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
        // console.log(data);
        setDeployment(data.deployment)
    }

    useEffect(()=>{
        // fetchLogs()
        // fetchDeployment()
        
        const polling = setInterval(()=>{
            fetchLogs()
            fetchDeployment()
        }, 10000)

        return ()=>{clearInterval(polling)}

    },[])

    return (user ?
        (
            <div className="flex flex-col w-full gap-8 min-h-[90vh] items-center justify-center">
                <div className="flex w-[80%] justify-between items-center">
                    <p className="font-semibold">Deployment - {deployment?.id}</p>
                    <p className={`font-semibold text-sm ${statusColor[deployment?.status!]} ${deployment?.status === "IN_PROGRESS" && 'animate-pulse'}`}>{deployment?.status}</p>
                </div>
                <div className="flex flex-col overflow-auto rounded-lg border w-[80%] h-[50vh] p-4">
                    {
                        logs.length > 0 ?
                        logs.map((log: Log, index)=>{
                            return(
                                <div key={index} className="w-full flex gap-8">
                                    <p>{log.timestamp}</p>
                                    <p>{log.log}</p>
                                </div>
                            )
                        })
                        :
                        <div className="flex justify-center">
                            No logs found
                        </div>
                    }
                </div>
            </div>
        )
        :
        <Navigate to="/login"/>
    );
}
 
export default Logs;