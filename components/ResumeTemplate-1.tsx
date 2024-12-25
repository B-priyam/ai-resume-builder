import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

const ResumePreview = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="w-[800px] mx-auto bg-white shadow-lg border border-gray-300">
      {/* Header Section */}
      <div
        className=" text-white p-6"
        style={{ borderBottom: "4px solid #FFC72C",backgroundColor:resumeInfo?.themeColor }}
      >
        <h1 className="text-5xl font-bold leading-tight">{`${
          resumeInfo?.firstName || ""
        } ${resumeInfo?.lastName || ""}`}</h1>
        <p className="text-lg font-semibold mt-2">
          {resumeInfo?.jobTitle || "Job Title"}
        </p>
        <div className="flex justify-between text-sm mt-4">
          <div>
            {resumeInfo?.email && <p>{resumeInfo.email}</p>}
            {resumeInfo?.address && <p>{resumeInfo.address}</p>}
          </div>
          <div>
            {resumeInfo?.phone && <p>{resumeInfo.phone}</p>}
            {resumeInfo?.linkedin && <p>LinkedIn</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 p-6">
        {/* Left Column */}
        <div className="col-span-1">
          {/* Education Section */}
          {resumeInfo?.education?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#00274D] border-b-2 border-gray-300 pb-2">
                EDUCATION
              </h2>
              {resumeInfo.education.map((edu: any, index: number) => (
                <div key={index} className="mt-4">
                  <h3 className="text-lg font-semibold">{edu?.degree}</h3>
                  <p className="text-sm font-medium text-gray-700">
                    {edu?.universityName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {edu?.startDate} – {edu?.endDate}
                  </p>
                  {edu?.description && (
                    <p className="text-sm mt-2">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {resumeInfo?.skills?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#00274D] border-b-2 border-gray-300 pb-2">
                SKILLS
              </h2>
              <ul className="list-disc pl-5 mt-4 space-y-1">
                {resumeInfo.skills.map((skill: any, index: number) => (
                  <li key={index} className="text-sm text-gray-700">
                    {skill?.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications Section */}
          {resumeInfo?.certifications?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#00274D] border-b-2 border-gray-300 pb-2">
                CERTIFICATIONS
              </h2>
              {resumeInfo.certifications.map((cert: any, index: number) => (
                <div key={index} className="mt-4">
                  <h3 className="text-sm font-medium">{cert?.title}</h3>
                  <p className="text-sm text-gray-600">{cert?.year}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-1">
          {/* Work Experience Section */}
          {resumeInfo?.experience?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#00274D] border-b-2 border-gray-300 pb-2">
                WORK EXPERIENCE
              </h2>
              {resumeInfo.experience.map((exp: any, index: number) => (
                <div key={index} className="mt-4">
                  <p className="text-sm text-gray-600">
                    {exp?.startDate} –{" "}
                    {exp?.currentlyWorking ? "Present" : exp?.endDate}
                  </p>
                  <h3 className="text-lg font-semibold">
                    {exp?.title || "Position"}
                  </h3>
                  <p className="text-sm font-medium text-gray-700">
                    {exp?.companyName}, {exp?.city}, {exp?.state}
                  </p>
                  <div className="list-disc pl-5 mt-2 space-y-1">
                    {exp.workSummary?.split("\n").map((summary: string, i:number) => (
                      <div dangerouslySetInnerHTML={{__html  : summary}} key={i} className="text-sm text-gray-700">
                        {/* {summary} */}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects Section */}
          {resumeInfo?.projects?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#00274D] border-b-2 border-gray-300 pb-2">
                PROJECTS
              </h2>
              {resumeInfo.projects.map((project: any, index: number) => (
                <div key={index} className="mt-4">
                  <h3 className="text-lg font-semibold">{project?.title}</h3>
                  <p className="text-sm text-gray-600">
                    {project?.startDate} – {project?.endDate || "Present"}
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {project?.description
                      ?.split("\n")
                      .map((desc: string, i:number) => (
                        <li key={i} className="text-sm text-gray-700">
                          {desc}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
