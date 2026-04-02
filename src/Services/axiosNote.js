import axios from 'axios'
import { useDrawer } from '../Components/DrawerContext';

const api=axios.create({
    baseURL:"http://localhost:3000/Notes",
    headers:{
        "Content-Type":"application/json"
    }

})


export const getNotes = async (currentid) => {
  const res = await api.get(
    `?userId=${currentid.id}&archieve=false&Trash=false`
  )
  return res;
};


export const getArchieve=async(currentid)=>{
    return api.get(`?userId=${currentid.id}&archieve=true&Trash=false`)
}
export const getTrash=async(currentid)=>{
    return api.get(`?userId=${currentid.id}&Trash=true`)
}
export const addNote=async(note)=>{
    return api.post("/",note)
}

export const update=async(currentid,note)=>{
    return api.patch(`/${currentid.id}`,note)
}

export const Delete=async(currentid)=>{
    return api.delete(`/${currentid.id}`)
}
