import axios from "axios"

export const axiosInstance = ()=>{
    return axios.create({
        baseURL:'http://localhost:3000'
    })
}
export const axiosInstanceBackEnd = ()=>{
    return axios.create({
        baseURL:'http://localhost:8000'
    })
}