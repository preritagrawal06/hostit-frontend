import axios from "axios"
import { ActionFunctionArgs } from "react-router-dom"

const LogsLoader = async({params} : ActionFunctionArgs)=>{
    const {data: deploymentData} = await axios.get(`http://localhost:9000/api/v1/project/deployment/${params.deploymentId}`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
    const {data: logsData} = await axios.get(`http://localhost:9000/api/v1/logs/${params.deploymentId}`, {headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}})
    return ({
        deployment: deploymentData.deployment,
        logs: logsData.logs
    })
}

export default LogsLoader