
import axios from "axios"
const baseurl=import.meta.env.VITE_BASE_URL;
 export const fetchDataFromApi=async (url)=>{
    try{
        const {data}=await axios.get(`${baseurl}${url}`,{timeout:100000})
        return data
    }catch(err){
        console.log(err);
        return err
    }
 }
 export const PostData=async(url,FormData)=>{
    try{
       const response =await fetch(`${baseurl}${url}`,{
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
      
        body:JSON.stringify(FormData)
       })
       if(response.ok){
        const data=await response.json();
        console.log(data)
        return data;
       }
    }catch(err){
        console.log(err);
        return err
    }
    }
    export const editData=async (url, updateData)=>{
        try {
           const res=await axios.put(`${baseurl}${url}`,updateData);
           return res.data; 
        } catch (err) {
            console.log(err)
            return err;
        }
    }
    export  const deleteData= async (url)=>{
try {
    let token=(localStorage.getItem("token"));
    console.log(token)
    const {res}= await axios.delete(`${baseurl}${url}`,{
        headers:{
            "Authorization":`Bearer ${token}`,
         "Content-Type":"application/json"
        }
    });
    return res;
} catch (err) {
    console.log(err)
    return err;
    
}
    }
    export const uploadImage = async (url,formdata) => {
        const {res}=await axios.post(baseurl+url,formdata);
        return res;
    }
    export const deleteImage = async (url,formdata) => {
        const {res}=await axios.delete(`${baseurl}${url}`,formdata);
        return res;
    }