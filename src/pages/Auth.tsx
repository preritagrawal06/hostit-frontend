import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import { userStore } from "@/store/userStore";
import { Navigate } from "react-router-dom";

const Auth = () => {
    const user = userStore((state) => state.user)
    return (!user ?
        (
            <div className="mt-16 flex items-center justify-center">
                <div className="px-4 py-8 flex flex-col justify-center md:flex-row w-[80vw] lg:w-[60vw] border gap-8 md:gap-0">
                    <Login />
                    <Signup />
                </div>
            </div>
        )
        :
        <Navigate to="/dashboard" />
    );
}

export default Auth;