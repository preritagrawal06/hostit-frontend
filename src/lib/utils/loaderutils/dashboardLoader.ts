import axios from "axios"

const dashboardLoader = async()=>{
    const {data} = await axios.get('http://localhost:9000/api/v1/project/getall', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
    return data.projects
}

export default dashboardLoader