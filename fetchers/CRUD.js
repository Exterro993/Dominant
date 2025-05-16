import axios from "axios"


export const GetDataById = async(URL__Server ,id, HandleAsk) =>{
    try {
        const {data, status} = await axios.get(`${URL__Server}/${id}`);
        HandleAsk(data, status)
    } catch (error) {
        HandleAsk(null, error)
    }
}
export const GetData = async(URL__Server , HandleAsk) =>{
    try {
        const {data, status} = await axios.get(URL__Server);
        HandleAsk(data, status)
    } catch (error) {
        HandleAsk(null, error)
    }
}
export const PostData = async(URL__Server , data , HandleAsk = null) =>{
    try {
       await axios.post(URL__Server , data);
       HandleAsk == null ? null : HandleAsk(true)
    } catch (error) {
        HandleAsk == null ? null : HandleAsk(false)
    }
}
export const DeleteData = async(URL__Server , id , HandleAsk = null) =>{
    try {
       await axios.delete(`${URL__Server }/${id}`);
       HandleAsk == null ? null : HandleAsk(true)
    } catch (error) {
        HandleAsk == null ? null : HandleAsk(false)
    }
}
export const UpdateData = async(URL__Server , data , HandleAsk = null) =>{
    try {
       await axios.put(`${URL__Server }/${data.id}`, data);
       HandleAsk == null ? null : HandleAsk(true)
    } catch (error) {
        HandleAsk == null ? null : HandleAsk(false)
    }
}
