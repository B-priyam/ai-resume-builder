"use client"

import ResumePreview from '@/components/ResumePreview'
import ResumePreview3 from '@/components/ResumeTemplate-3'
import ResumeTemplate4 from '@/components/ResumeTemplate-4'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import globalApi from '@/lib/globalApi'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {RWebShare} from "react-web-share"

const page = () => {
    const params = useParams()
    const [resumeInfo, setResumeInfo] = useState<any>()

    const getResumeInfo = async () => {
        const data = await globalApi.getResumeById(params?.resumeId)
        setResumeInfo(data.data.data)
    }

    useEffect(()=>{
        getResumeInfo()
    },[])

    const handleDownload = () => {
        window.print()
    }
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='print:hidden'>
        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center my-2 font-medium text-2xl ">
            Congrats! Your Ai resume is Ready
          </h2>
          <p className="text-center text-gray-400">
            Now your Resume is ready to download and you can share unique url
            with your friends.
          </p>
          <div className="flex justify-between mx-20 md:mx-44 my-10">
            <Button
              onClick={handleDownload}
              className="bg-primary hover:bg-purple-600"
            >
              Download
            </Button>
            <RWebShare
              data={{
                text: "Hello Everyone This is my Resume, open the url to see.",
                url:
                  process.env.NEXT_PUBLIC_BASE_URL +
                  "/myresume/" +
                  params.resumeId +
                  "/view",
                title:
                  resumeInfo?.firstName +
                  " " +
                  resumeInfo?.lastName +
                  " resume",
              }}
            >
              <Button className="bg-primary hover:bg-purple-600">Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36 print:my-0 print:mx-0 ">
        <ResumeTemplate4 />
        {/* <ResumePreview /> */}
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default page