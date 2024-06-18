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
        <>
            <div className="flex md:hidden p-4 w-full justify-between items-center border border-b">
                <div>
                    <p>Deployment {deploymentId.split("-")[0]}</p>
                    <p className="text-sm">{deploymentDate}</p>
                    <p className={`font-semibold text-sm ${statusColor[status]} ${status === "IN_PROGRESS" && 'animate-pulse'}`}>{status}</p>
                </div>
                <Link to={`/logs/${deploymentId}`}>
                    <Button variant="ghost">Logs</Button>
                </Link>
            </div>
            <div className="hidden md:grid p-4 w-full border border-b grid-cols-8 items-center">
                <p className="col-span-2 ">Deployment {deploymentId.split("-")[0]}</p>
                <p className="text-sm col-span-3 place-self-center">{deploymentDate}</p>
                <p className={`col-span-2 place-self-center font-semibold text-sm ${statusColor[status]} ${status === "IN_PROGRESS" && 'animate-pulse'}`}>{status}</p>
                <Link to={`/logs/${deploymentId}`} className="col-span-1 place-self-end">
                    <Button variant="ghost">Logs</Button>
                </Link>
            </div>
        </>
    );
}
 
export default DeploymentCard;