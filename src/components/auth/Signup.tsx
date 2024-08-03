import { userSignup } from "@/store/userStore";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleClick = async ()=>{
        try {
            setLoading(true)
            const signup = await userSignup({username, email, password})
            setLoading(false)
            if(signup) navigate("/dashboard")
            
        } catch (error) {
            console.log((error as Error).message);
        }
    }
    
    return (
        <div className="flex flex-col gap-8 items-center w-full px-4 border-0 md:border-l">
            <h1 className="text-2xl font-bold">SIGNUP</h1>
            <Input required type="email" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
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
            <Button onClick={handleClick} disabled={loading}>Signup</Button>
        </div>
    );
}

export default Signup;