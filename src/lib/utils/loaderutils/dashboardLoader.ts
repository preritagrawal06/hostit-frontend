import axios from "axios"

const dashboardLoader = async()=>{
    const {data} = await axios.get(`${import.meta.env.VITE_PROD_BASE_URL}/project/getall`, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    return data.projects
}

export default dashboardLoader