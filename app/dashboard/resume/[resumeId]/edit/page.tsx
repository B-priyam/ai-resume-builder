"use client"

import FormSection from '@/components/FormSection'
import ResumePreview from '@/components/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import dummy from "@/data/dummy"
import globalApi from '@/lib/globalApi'
import ResumeTemplate1 from '@/components/ResumeTemplate-1'
import { templates } from '@/lib/constants'
import Image from 'next/image'
import ResumePreview3 from '@/components/ResumeTemplate-3'
import ResumePreview4 from '@/components/ResumeTemplate-4'

const page = () => {
    const params = useParams()
    const [resumeInfo, setResumeInfo] = useState<any>()
    const [activeTemplate, setactiveTemplate] = useState("first")

    useEffect(()=>{
        getResumeInfo()
    },[])

    const getResumeInfo = async () => {
      const resumeData = await globalApi.getResumeById(params?.resumeId)
      setResumeInfo(resumeData.data.data)
    }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="p-10">
        this is templates section
        <div className="flex gap-5 max-w-[90vw] overflow-auto">
          {templates.map((item, index) => (
            <div key={index} onClick={() => setactiveTemplate(item)} className='bg-primary h-48 min-w-44 flex items-center justify-center rounded-md'>
              <Image 
              src={`/svg-image-${index+1}.svg`}
              alt='image'
              height={150}
              width={150}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        {activeTemplate === "first" && <ResumePreview />}
        {activeTemplate === "second" && <ResumeTemplate1 />}
        {activeTemplate === "third" && 
        <ResumePreview4 />}
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default page