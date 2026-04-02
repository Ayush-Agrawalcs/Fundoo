import axios from 'axios'
import { useDrawer } from '../Components/DrawerContext';

const api=axios.create({
    baseURL:"http://localhost:3000",
    headers:{
        "Content-Type":"application/json"
    }

})

export const signup=async(userdata)=>{
    const email =userdata.email.trim().toLowerCase();
    
      const userExists = await api.get(`/Employee?email=${email}`);
    
      if (userExists.data.length > 0) {
        alert("User already exists!");
        return;
      }
    
      const res=await api.post("/Employee", {
       ...userdata
      });
      return res.data;
}

export const signin=async(email,password)=>{
  console.log(`/Employee?email=${email}&password:"${password}"`)
       const res = await api.get(`/Employee?email=${email}&password:"${password}"`
        );
        console.log(res.data)
    
         if(res.data.length === 0) {
          alert("Invalid Credentials");
          throw new Error("Invalid Email");
        }
        const user=res.data[0];

        localStorage.setItem("user", JSON.stringify(res.data[0]));
        return user;
}