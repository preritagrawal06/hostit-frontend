import axios from "axios"

type Props = {
    endpoint: string | null,
    body: object | null,
}

export const CallBackendApi = async ({endpoint, body} : Props)=>{
    try {
        const {data} = await axios.post(
            `${import.meta.env.VITE_PROD_BASE_URL}${endpoint}`,
            body,
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        
        return data

    } catch (e: unknown) {
        console.log((e as Error)?.message);
    }
}