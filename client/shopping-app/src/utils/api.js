import { jsx } from "@emotion/react";
import axios from "axios"

 export const fetchDataFromApi=async (url)=>{
    try{
        const {data}=await axios.get(`http://localhost:5100${url}`)
        return data
    }catch(err){
        console.log(err);
        return err
    }
 }
 export const PostData=async(url,FormData)=>{
    try{
       const response =await fetch(`http://localhost:5100${url}`,{
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
           const {res}=await axios.put(`http://localhost:5100${url}`,updateData);
           return res; 
        } catch (err) {
            console.log(err)
            return err
        }
    }
    export  const deleteData= async (url)=>{
try {
    let token=(localStorage.getItem("token"));
    console.log(token)
    const {res}= await axios.delete(`http://localhost:5100${url}`,{
        headers:{
            "Authorization":`Bearer ${token}`,
         "Content-Type":"application/json"
        }
    });
    return res
} catch (err) {
    console.log(err)
    return err
    
}
    }
  
