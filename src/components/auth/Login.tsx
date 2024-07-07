import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react"
import { userLogin } from "@/store/userStore";
import { useNavigate } from "react-router-dom";


const Login = () => {

    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleClick = async ()=>{
        setLoading(true)
        await userLogin({email, password})
        setLoading(false)
        navigate("/dashboard")
    }

    return (
        <div className="flex flex-col gap-8 items-center w-full px-4 pb-8 md:pb-0 border-b md:border-0">
            <h1 className="text-2xl font-bold">LOGIN</h1>
            <Input required type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <div className="flex w-full items-center space-x-2">
                <Input required type={visible ? "text" : "password"} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <Button variant="outline" size="icon" onClick={() => { setVisible(!visible) }}>
                    {
                        visible ?
                            <img src="/openEye.svg" width={16} height={16} />
                            :
                            <img src="/closeEye.svg" width={16} height={16} />
                    }
                </Button>
            </div>
            <Button onClick={handleClick} disabled={loading}>Login</Button>
        </div>
    );
}

export default Login;