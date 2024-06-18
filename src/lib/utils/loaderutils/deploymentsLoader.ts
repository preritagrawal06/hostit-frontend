import { ActionFunctionArgs } from "react-router-dom";
import { CallBackendApi } from "../callBackendApi";

const DeploymentLoader = async({params} : ActionFunctionArgs) => {
    const deployments = await CallBackendApi({ endpoint: "/project/deployments", body: { projectId: params.projectId } })
    const project = await CallBackendApi({ endpoint: '/project/getone', body: { projectId: params.projectId } })
    
    return {project: project.project, deployments: deployments.deployments}
}
 
export default DeploymentLoader;