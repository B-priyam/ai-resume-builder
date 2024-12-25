import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import {
  GitBranchPlus,
  Github,
  Linkedin,
  MailIcon,
  Phone,
  User,
} from "lucide-react";
import React, { useContext, useState } from "react";
import {DndContext} from "@dnd-kit/core"
import { Draggable } from "@/hooks/useDraggble";
import { Droppable } from "@/hooks/useDropabble";

const ResumeTemplate4 = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [isDropped, setIsDropped] = useState(false);

  let themeColor = resumeInfo?.themeColor || "#00274D";

  function handleDragEnd(event:any) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
    <div className={`px-5 border-t-4`} style={{ borderColor: themeColor }}>
      <h1
        className="text-center font-bold text-xl my-2"
        style={{ color: themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>
      <div
        className="flex p-2 justify-between print:mx-0"
        style={{ backgroundColor: themeColor, printColorAdjust: "revert" }}
      >
        <div>
          <p className="text-white flex items-center gap-2">
            <Phone className="h-4 w-4" /> {resumeInfo?.phone}
          </p>
          <p className="text-white flex items-center gap-2">
            <MailIcon className="h-4 w-4" />
            {resumeInfo?.email}
          </p>
          <p className="text-white flex items-center gap-2">
            <User className="h-4 w-4" />
            {resumeInfo?.portfolio}
          </p>
        </div>
        <div>
          <p className="text-white flex items-center gap-2">
            <Github className="h-4 w-4" />
            {resumeInfo?.github}
          </p>
          <p className="text-white flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            {resumeInfo?.linkedIn}
          </p>
        </div>
      </div>
      <div className="my-4">
        <h2 className="my-2 font-semibold" style={{ color: themeColor }}>
          PROFESSIONAL SUMMARY
        </h2>
        {resumeInfo?.summery}
        <hr
          className="h-1 my-2 rounded-sm"
          style={{ backgroundColor: themeColor }}
          />
      </div>
      
      <div>
        <h2 className="font-semibold" style={{ color: themeColor }}>
          PROJECTS
        </h2>
        <div>
          {resumeInfo?.project.length > 0 &&
            resumeInfo?.project.map((item: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between my-1">
                  <h3 className="font-bold">{item.projectName}</h3>
                  <a className="font-semibold" href={item.projectUrl}>
                    {item.projectUrl}
                  </a>
                </div>
                <p className="">{item.projectDescription}</p>
              </div>
            ))}
        </div>
      </div>
      <hr
        className="h-1 my-2 rounded-sm"
        style={{ backgroundColor: themeColor }}
        />
      <div>
        <h2 className="font-semibold my-1" style={{ color: themeColor }}>
          SKILLS
        </h2>
      </div>
      <div className="grid grid-cols-2 max-grid-rows-3">
        {resumeInfo?.skills?.length > 0 &&
          resumeInfo?.skills.map((item: any, index: number) => (
            <div key={index}>
              <li>{item.name}</li>
            </div>
          ))}
      </div>

      <hr
        className="h-1 my-2 rounded-sm"
        style={{ backgroundColor: themeColor, printColorAdjust: "revert" }}
        />
      <div>
        <h2 className="font-semibold mt-1" style={{ color: themeColor }}>
          EXPERIENCE
        </h2>
        <div className="flex flex-col gap-2">
          {resumeInfo?.experience?.length > 0 &&
            resumeInfo?.experience.map((item: any, index: number) => (
              <div key={index}>
                <div className="flex justify-between">
                  <h3 className="font-bold">{item.title}</h3>
                  <h4 className="font-semibold">
                    {item.startDate && `${item.startDate} - `}
                    {item.endDate}
                  </h4>
                </div>
                <p className="text-gray-600 text-sm -mt-1">
                  {item.companyName && `${item.companyName}, `}{" "}
                  {item.city && `${item.city} ,`}{" "}
                  {item.state && `${item.state}`}
                </p>
                <p dangerouslySetInnerHTML={{ __html: item.workSummary }}></p>
                {index < resumeInfo?.experience?.length - 1 && (
                  <hr className="mt-2" />
                )}
              </div>
            ))}
        </div>
      </div>
      <hr
        className="h-1 my-2 rounded-sm"
        style={{ backgroundColor: themeColor }}
      />
      <div>
        <h2 className="font-semibold mt-1" style={{ color: themeColor }}>
          EDUCATION
        </h2>
        <div>
          {resumeInfo?.education?.length > 0 &&
            resumeInfo?.education.map((item: any, index: number) => (
              <div key={index}>
                <h3 className="-my-1 font-semibold">{item.degree}</h3>
                <div className="flex">
                  <h4>{item.universityName && `${item.universityName} | `}</h4>
                  <span>
                    {item.startDate && `${item.startDate} - `}
                    {item.endDate}
                  </span>
                </div>
                {index < resumeInfo?.education?.length - 1 && (
                  <hr className="mt-2" />
                )}
              </div>
            ))}
        </div>
      </div>
      {resumeInfo?.certificate?.length > 0 && (
        <>
          <hr
            className="h-1 my-2 rounded-sm"
            style={{ backgroundColor: themeColor }}
          />
          <div>
            <h2 className="font-semibold mt-1" style={{ color: themeColor }}>
              CERTIFICATIONS
            </h2>
            <div>
              {resumeInfo?.certificate?.length > 0 &&
                resumeInfo?.certificate.map((item: any, index: number) => (
                  <div key={index}>
                    <li>{item.certificateName}</li>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
      {resumeInfo?.achievement?.length > 0 && (
        <>
          <hr
            className="h-1 my-2 rounded-sm"
            style={{ backgroundColor: themeColor }}
            />
          <div>
            <h2 className="font-semibold mt-1" style={{ color: themeColor }}>
              ACHIEVEMENTS
            </h2>
            <div>
              {resumeInfo?.achievement?.map((item:any,index:number)=>(
                <div key={index}>
                  <li>
                  {item.achievementDescription}
                  </li>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
            </DndContext>
  );
};

export default ResumeTemplate4;
