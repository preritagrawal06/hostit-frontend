import { Button } from "../ui/button";

const DeploymentCard = () => {
    return ( 
        <div className="flex p-4 w-full justify-between items-center border border-b">
            <div>
                <p>Deployment live</p>
                <p className="text-sm">date of deployment</p>
            </div>
            <Button variant="ghost">Logs</Button>
        </div>
    );
}
 
export default DeploymentCard;