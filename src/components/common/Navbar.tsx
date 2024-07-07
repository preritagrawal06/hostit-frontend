import { Navmenu } from "@/lib/data/Navmenu";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import { userLogout, userStore } from "@/store/userStore";

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const user = userStore((state) => state.user)
    // console.log(user);
    
    const handleOpen = () => {
        setOpen(!open)
    }
    return (
        <>
            <div className="px-4 py-4 flex justify-between items-center">
                <Link to="/">
                    <h1 className="text-3xl font-semibold">Host-it</h1>
                </Link>
                <div className="hidden md:flex items-center gap-6">
                    {
                        Navmenu.map((item, index) => {
                            return (
                                !(item.authReq === true && user === null) && <a className="hover:text-purple-600 duration-300" key={index} href={item.link}>{item.label}</a>
                            )
                        })
                    }
                    {
                        user ?
                            <Button onClick={userLogout}>Logout</Button>
                            :
                            <Link to="/auth">
                                <Button variant="default">Login</Button>
                            </Link>
                    }
                </div>
                <img onClick={handleOpen} className="flex md:hidden" src={!open ? "/hamburger.svg" : "/cross.svg"} alt="" width={24} height={24} />
            </div>
            <div className={`${open ? "flex" : "hidden"} md:hidden flex-col gap-2 items-center justify-center absolute py-4 w-full border-b transition-all duration-300`}>
                {
                    Navmenu.map((item, index) => {
                        return (
                            !(item.authReq === true && user === null) && <a className="hover:text-purple-600 duration-300" key={index} href={item.link}>{item.label}</a>
                        )
                    })
                }
                {
                    user ?
                        <Button onClick={userLogout}>Logout</Button>
                        :
                        <Link to="/auth">
                            <Button variant="default">Login</Button>
                        </Link>
                }
            </div>
        </>
    );
}

export default Navbar;