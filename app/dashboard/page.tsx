"use client"

import React, { useEffect, useState } from "react";
import AddResume from "../../components/AddResume";
import { useUser } from "@clerk/nextjs";
import globalApi from "@/lib/globalApi";
import ResumeCard from "../../components/ResumeCard";

export interface ResumeDataProps {
  documentId: string;
  title: string;
  resumeId: string;
  themeColor : string;
  refreshData : ()=>Promise<void>
}


const page = () => {
  const {user} = useUser()
  const [resumesList, setResumesList] = useState<ResumeDataProps[]>([]);
  const getResumesList = async ()=> {
   const res:any = await globalApi.getUserResumes(user?.primaryEmailAddress?.emailAddress!)
    setResumesList(res?.data.data)
  }
  
  useEffect(()=>{
    user && getResumesList()
  },[user])

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My resume</h2>
      <p>Start Creating AI resume for your next job role</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        <AddResume />
        {resumesList.map((resume) => (
          <ResumeCard
            key={resume.resumeId}
            documentId={resume?.documentId}
            resumeId={resume.resumeId}
            title={resume.title}
            themeColor={resume.themeColor}
            refreshData={getResumesList}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
