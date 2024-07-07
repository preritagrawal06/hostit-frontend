import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { userStore } from "@/store/userStore";

const Landing = () => {
    const navigate = useNavigate()
    const user = userStore((state) => state.user)
    return (
        <>
        <div className="relative h-[98vh]">
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl sm:-top-60">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
            <div className="w-full h-[85vh] flex flex-col gap-4 items-center justify-center">
                <h1 className="text-5xl sm:text-8xl font-semibold">Host-it</h1>
                <p className="text-xl">Host your static sites within seconds</p>
                <Button onClick={()=>{user ? navigate('/dashboard') : navigate('/auth')}} variant="destructive" size="lg">Get started</Button>
            </div>
            <div
                className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-2xl sm:top-[calc(100%-40rem)]"
                aria-hidden="true"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                        clipPath:
                            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                />
            </div>
        </div>
        <div id="about" className="flex flex-col items-center gap-20 pb-8">
            <p className="text-3xl sm:text-5xl font-semibold">Why Us?</p>
            <div className="w-[80%] md:w-[60%] flex flex-wrap gap-4 md:gap-0">
                <div className="w-full md:w-[50%] rounded-lg p-4 border hover:border-black duration-300">
                    <p className="font-semibold text-xl">Easy to use</p>
                    <p>Deploy your static sites without any hassle. With easy to use interface, host-it makes it easier to host your site with just few clicks.</p>
                </div>
                <div className="w-full md:w-[50%] rounded-lg p-4 border hover:border-black duration-300">
                    <p className="font-semibold text-xl">Faster deployment</p>
                    <p>Deploy your sites in no time. Host-it takes less than a minute to deploy your site.</p>
                </div>
                <div className="w-full md:w-[50%] rounded-lg p-4 border hover:border-black duration-300">
                    <p className="font-semibold text-xl">Framework support</p>
                    <p>Host-it supports almost all the major javascript frameworks.</p>
                    <div className="flex gap-2 items-center">
                        <img src="/vuejs.svg" alt="vuejs" width={20} height={20}/>
                        <img src="/react.svg" alt="vuejs" width={24} height={24}/>
                        <img src="/vite.svg" alt="vuejs" width={16} height={16}/>
                        <img src="/nextjs.svg" alt="vuejs" width={16} height={16}/>
                    </div>
                </div>
                <div className="w-full md:w-[50%] rounded-lg p-4 border hover:border-black duration-300">
                    <p className="font-semibold text-xl">Logs collection</p>
                    <p>Host-it provides you real-time logs as your site is deployed. Easily check your logs for any error</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default Landing;