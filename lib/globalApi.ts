import axios from "axios";
import { resumeType } from "./types";


const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL+ "/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
  },
});

const createNewResume = (data: resumeType) => axiosClient.post("/user-resumes", data);

const getUserResumes = (userEmail: string) =>{
  return axiosClient.get(`/user-resumes?filters[userEmail][$eq]=${userEmail}`)}

const updateResumeDeatils = (id:string| string[] | undefined,data:any)=> axiosClient.put('/user-resumes/'+id,data)

const getResumeById = (id: string | string[] | undefined) =>
  axiosClient.get(`/user-resumes/${id}?populate=*`);

const deleteResumeById = (id:string |string[] |undefined)=>axiosClient.delete(`/user-resumes/${id}`)


export default {
  createNewResume,
  getUserResumes,
  updateResumeDeatils,
  getResumeById,
  deleteResumeById
};
