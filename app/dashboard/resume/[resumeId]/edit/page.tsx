"use client"

import FormSection from '@/components/FormSection'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import dummy from "@/data/dummy"
import globalApi from '@/lib/globalApi'
import ResumeTemplate1 from '@/components/ResumeTemplate-1'
import { templates } from '@/lib/constants'
import Image from 'next/image'
import ResumePreview3 from '@/components/ResumeTemplate-3'
import ResumePreview4 from '@/components/ResumeTemplate-2'
import ResumeTemplate4 from '@/components/ResumeTemplate-2'
import { OnSaveHelper } from '@/lib/helpers'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const page = () => {
    const params = useParams()
    const [resumeInfo, setResumeInfo] = useState<any>()
    const [activeTemplate, setactiveTemplate] = useState<string>("first")

    useEffect(()=>{
        getResumeInfo()
    },[])

    const getResumeInfo = async () => {
      const resumeData = await globalApi.getResumeById(params?.resumeId)
      setResumeInfo(resumeData.data.data)
    }

    useEffect(()=>{
      resumeInfo && setactiveTemplate(resumeInfo?.template)
    },[resumeInfo])

    const saveactiveTemplate = async (name:string)=>{
      await globalApi.updateResumeDeatils(params?.resumeId, {data:{"template":name}});
      toast("template updated")
    }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="p-10">
        this is templates section
        <div className="flex gap-5 max-w-[90vw] overflow-auto">
          {templates.map((item, index) => (
            <div key={index} onClick={() => {setactiveTemplate(item.name);
              saveactiveTemplate(item.name)
            }} className={cn(`border border-primary py-2 min-w-44 flex items-center justify-center rounded-md`,activeTemplate == item.name ? 'border-4' : 'border')}>
              <Image 
              src={item.image ||`/svg-image-${index+1}.svg`}
              alt='image'
              height={50}
              width={150}
              className=''
              />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        {activeTemplate === "first" && <ResumeTemplate1 />}
        {activeTemplate === "second" && <ResumeTemplate4 />}
        {activeTemplate === "third" && 
        <ResumePreview3 />}
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default page