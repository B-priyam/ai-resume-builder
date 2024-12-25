import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import { AchievementList, CertificateList, EducationalListProps, ProjectList, SkillProps } from '@/lib/types'
import { Github, Link, Linkedin, Mail, Phone, User } from 'lucide-react'

const ResumePreview = () => {
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext)

    let themeColor = resumeInfo?.themeColor || "#00274D";
  return (
    <div
      className="shadow-lg h-full py-14 px-4 md:px-14 border-t-[20px]"
      style={{ borderColor: themeColor }}
    >
      {/* ------------------------------ */}
      <div>
        <h2
          className="font-bold text-xl text-center"
          style={{ color: themeColor }}
        >
          {resumeInfo?.firstName} {}
          {resumeInfo?.lastName}
        </h2>
        <h2 className="text-center text-sm font-semibold">
          {resumeInfo?.jobTitle}
        </h2>
        <h2 className="text-center font-normal text-xs">
          {resumeInfo?.address}
        </h2>
        <div className="flex justify-between">
          <div>
            <h2 className="items-center flex gap-1 font-normal text-sm ">
              <Phone className="h-4 w-4" />
              {resumeInfo?.phone}
            </h2>
            <h2 className="items-center flex gap-1 font-normal text-sm ">
              <Github className="h-4 w-4" />
              {resumeInfo?.github}
            </h2>
            <h2 className="items-center flex gap-1 font-normal text-sm ">
              <User className="h-4 w-4" />
              {resumeInfo?.portfolio}
            </h2>
          </div>
          <div>
            <h2 className="items-center flex gap-1 font-normal text-sm ">
              <Mail className="w-4 h-4" />
              {resumeInfo?.email}
            </h2>
            <h2 className="items-center flex gap-1 font-normal text-sm ">
              <Linkedin className="w-4 h-4" />
              {resumeInfo?.linkedIn}
            </h2>
          </div>
        </div>
        <hr
          className="border-[1.5px] my-2"
          style={{ borderColor: themeColor }}
        />
      </div>
      {/* --------------------------- */}

      <p className="text-sm">{resumeInfo?.summery}</p>

      {/* --------------------------- */}

      {resumeInfo?.project?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-lg mb-1"
            style={{ color: themeColor }}
          >
            Projects
          </h2>
          <hr
            style={{ borderColor: themeColor }}
            className="border-[1.5px] my-2"
          />
          <div>
            {resumeInfo?.project?.map((item:ProjectList,index:number)=>(
              <div key={index} className="my-3 mb-1">
                <h3 className={`font-bold flex justify-between ${item.projectUrl.length > 60 ? 'text-xs' : 'text-sm'}`}>
                  {item.projectName}
                  <div className='flex items-center gap-1'>
                    <Link className='h-4 w-4'/>
                    <a href={item.projectUrl}>
                      {item.projectUrl}
                      </a>
                  </div>
                  </h3>
                <h4 className='text-[13px] font-medium'>
                  {item.projectDescription}
                </h4>
              </div>
            ))}
          </div>
        </div>
      )}


      { resumeInfo?.experience?.length > 0 && (

        <div className="my-6">
        <h2
          className="text-center font-bold text-lg mb-2"
          style={{ color: themeColor }}
          >
          Professional Experience
        </h2>
        <hr style={{ borderColor: themeColor }} className="border-[1.5px]" />
        {resumeInfo?.experience.map((experience: any, index: number) => (
          <div key={index} className="my-5">
            <h2 className="text-[14px] font-bold">{experience?.title}</h2>
            <h2 className="text-[13px] flex justify-between -mt-1 mb-1">
              {experience?.companyName}, {experience?.city}, {experience?.state}
              <span>
                {experience?.startDate} {"- "}
                {experience?.currentlyWorking
                  ? "Present"
                  : experience?.endDate}{" "}
              </span>
            </h2>
            <div
              dangerouslySetInnerHTML={{ __html: experience.workSummary }}
              className="text-[8px]"
              />
          </div>
        ))}
      </div>
      )}

      {/* ---------------------- */}

      {resumeInfo?.education?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-lg mb-1"
            style={{ color: themeColor }}
          >
            Education
          </h2>
          <hr
            style={{ borderColor: themeColor }}
            className="border-[1.5px] my-2"
          />

          {resumeInfo?.education.map(
            (education: EducationalListProps, index: number) => (
              <div key={index}>
                <h2 className="text-[14px] font-bold">
                  {education?.degree}{" "}
                  {education?.major && ` (${education?.major})`}
                  {education?.grade && ` - ${education?.grade}`}
                </h2>
                <h2 className="text-sm flex justify-between">
                  {education?.universityName}
                  <span>
                    {education?.startDate} - {education?.endDate}
                  </span>
                </h2>
                <p className="text-xs my-2">{education?.description}</p>
              </div>
            )
          )}
        </div>
      )}

      {/* --------------------------- */}

      {resumeInfo?.skills?.length > 0 && (
        <div className="my-6">
          <h2
            className="text-center font-bold text-lg mb-2"
            style={{ color: themeColor }}
          >
            Skills
          </h2>
          <hr style={{ borderColor: themeColor }} className="border-[1.5px]" />

          <div className="grid grid-cols-2 gap-3 my-4">
            {resumeInfo?.skills.map((skill: SkillProps, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <h2 className="text-[14px] w-1/2">{skill?.name}</h2>
                <div className="h-2 bg-gray-300 w-1/4 min-w-1/4 mr-2">
                  <div
                    className="h-2"
                    style={{
                      backgroundColor: themeColor,
                      width: skill?.rating! * 20 + "%",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeInfo?.certificate?.length > 0 && (
        <div>
          <h2
            className="text-center font-bold text-lg mt-2"
            style={{ color: themeColor }}
          >
            Certificates
          </h2>
          <hr
            style={{ borderColor: themeColor }}
            className="border-[1.5px] my-2"
          />
          {resumeInfo?.certificate?.map(
            (item: CertificateList, index: number) => (
              <div key={index} className="my-2">
                <li>{item.certificateName}</li>
                {item?.certificateDescription && (
                  <p className="text-sm ml-5 -mt-1">
                    {item.certificateDescription}
                  </p>
                )}
              </div>
            )
          )}
        </div>
      )}
      {resumeInfo?.achievement?.length > 0 && (
        <div>
          <h2
            className="text-center font-bold text-lg mt-2"
            style={{ color: themeColor }}
          >
            Achievement
          </h2>
          <hr
            style={{ borderColor: themeColor }}
            className="border-[1.5px] my-2"
          />
          {resumeInfo?.achievement?.map(
            (item: AchievementList, index: number) => (
              <div key={index}>
                <li>{item.achievementDescription}</li>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default ResumePreview