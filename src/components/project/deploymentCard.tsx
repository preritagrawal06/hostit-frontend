import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type CardProp = {
    deploymentId: string,
    deploymentDate: string,
    status: string
}

const statusColor: any = {
    "FAIL": "text-red-500",
    "READY": "text-green-500",
    "IN_PROGRESS": "text-yellow-500"
}

const DeploymentCard = ({deploymentId, deploymentDate, status}: CardProp) => {
    
    return ( 
        <div className="flex p-4 w-full justify-between items-center border border-b">
            <div>
                <p>Deployment {deploymentId.split("-")[0]}</p>
                <p className="text-sm">{deploymentDate}</p>
                <p className={`font-semibold text-sm ${statusColor[status]} ${status === "IN_PROGRESS" && 'animate-pulse'}`}>{status}</p>
            </div>
            <Link to={`/logs/${deploymentId}`}>
                <Button variant="ghost">Logs</Button>
            </Link>
        </div>
    );
}
 
export default DeploymentCard;