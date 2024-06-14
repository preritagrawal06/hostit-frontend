import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { userStore } from "@/store/userStore"

const Logs = () => {
    // const params = useParams()
    // console.log(params);
    const user = userStore((state) => state.user)
    return (user ?
        (
            <div className="flex w-full min-h-[90vh] items-center justify-center">
                <div className="flex flex-col overflow-auto rounded-lg border w-[80%] h-[50vh]">
                    <p>this is a log</p>
                    <p>this is a log</p>
                    <p>this is a log</p>
                    <p>this is a log</p>
                </div>
            </div>
        )
        :
        <Navigate to="/login"/>
    );
}
 
export default Logs;