"use client";

import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import {
  AchievementList,
  CertificateList,
  EducationalListProps,
  ExperienceListProps,
  ProjectList,
  SkillProps,
} from "@/lib/types";
import { Github, HomeIcon, Linkedin, Mail, Phone, User, User2 } from "lucide-react";
import React, { useContext } from "react";

const ResumePreview3 = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);

  const themeColor = resumeInfo?.themeColor || "#00274D";
  return (
    <div className=" flex items-center justify-center bg-gray-100">
      {/* Outer Container */}
      <div className="w-full max-w-4xl bg-white shadow-lg border border-gray-200">
        {/* Top Header with Name */}
        <div
          className=" text-white p-6"
          style={{ backgroundColor: themeColor }}
        >
          <h1 className="text-2xl font-bold">
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h1>
          <p className="text-lg font-medium">{resumeInfo?.jobTitle}</p>
        </div>

        {/* Content */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1">
            {/* Personal Info */}
            <div className="mb-6">
              <h2
                className="text-sm font-semibold text-gray-800 uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                Personal Info
              </h2>
              <p className="text-sm text-gray-600 mt-2 flex">
                <HomeIcon className="h-4 w-4" />: {resumeInfo?.address}
              </p>
              <p className="text-sm text-gray-600 mt-1 flex">
                <Phone className="h-4 w-4" />: {resumeInfo?.phone}
              </p>
              <p className="text-sm text-gray-600 mt-1 flex">
                <Mail className="h-4 w-4" />: {resumeInfo?.email}
              </p>
              {resumeInfo?.linkedIn && (
                <p className="text-sm text-gray-600 mt-1 flex">
                  <Linkedin className="h-4 w-4" />: {resumeInfo?.linkedIn}
                </p>
              )}
              {resumeInfo?.github && (
                <a href={resumeInfo?.github} className="text-sm text-gray-600 mt-1 flex">
                  <Github className="h-4 w-4" />: {resumeInfo?.github}
                </a>
              )}
              {resumeInfo?.portfolio && (
                <a href={resumeInfo?.portfolio} className="text-sm text-gray-600 mt-1 flex flex-wrap">
                  <User2 className="h-4 w-4" />: <p>
                    {resumeInfo?.portfolio}
                    </p>
                </a>
              )}
            </div>

            {/* Skills */}
            {resumeInfo?.skills?.length > 0 && (
              <div className="mb-6">
                <h2
                  className="text-sm font-semibold uppercase tracking-wide"
                  style={{ color: themeColor }}
                >
                  Skills
                </h2>
                <div className="mt-3 space-y-3">
                  {resumeInfo?.skills?.map((skill: SkillProps) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-gray-600">
                        {skill.name}
                      </span>
                      <div className="w-1/2 bg-gray-200 rounded-full h-2 ">
                        <div
                          className=" h-2 rounded-full"
                          style={{
                            width: `${skill.rating! * 20}%`,
                            backgroundColor: themeColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {resumeInfo?.language?.length > 0 && (
              <div>
                <h2
                  className="text-sm font-semibold text-gray-800 uppercase tracking-wide"
                  style={{ color: themeColor }}
                >
                  Languages
                </h2>
                <p className="text-sm text-gray-600 mt-2">Spanish: C1</p>
                <p className="text-sm text-gray-600 mt-1">Polish: A2</p>
              </div>
            )}

            {/* Certifications */}
            {resumeInfo?.certificate?.length > 0 && (
              <div>
                <h2
                  className="text-sm font-semibold text-gray-800 uppercase tracking-wide mt-4"
                  style={{ color: themeColor }}
                >
                  Certifications
                </h2>
                {resumeInfo?.certificate?.map((item: CertificateList) => (
                  <div key={item.id}>
                    <p className="text-sm text-gray-600 mt-2">
                      {item.certificateName}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {/* Achievements */}
            <div>
              <h2
                className="text-sm font-semibold text-gray-800 uppercase tracking-wide mt-4"
                style={{ color: themeColor }}
              >
                Achievements
              </h2>
              {
                resumeInfo?.achievement?.map((item:AchievementList)=>(
                  <div key={item.id}>
                  <li className="text-sm text-gray-600 mt-2">{item.achievementDescription}</li>
                  </div>
                ))
              }
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2">
            {/* Summary */}
            
            <div className="mb-6">
              <h2
                className="text-sm font-semibold text-gray-800 uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                Summary
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                {resumeInfo?.summery}
              </p>
            </div>

            {/* Projects */}
            {
              resumeInfo?.project?.length > 0 &&
            <div className="mb-6">
              <h2
                className="text-sm font-semibold text-gray-800 uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                Professional Projects
              </h2>
              <div className="mt-3">
                {/* Job 1 */}
                <div className="mb-4">
                  {resumeInfo?.project?.map(
                    (item: ProjectList, index: number) => (
                      <div key={item.id}>
                        <h3 className="text-sm font-semibold text-gray-700 -mb-1">
                          {item.projectName}
                        </h3>
                        <a
                          href={item.projectUrl}
                          className="text-sm text-gray-600"
                        >
                          {item.projectUrl}
                        </a>
                        <div className="list-disc text-sm text-gray-600">
                          {item.projectDescription}
                        </div>
                        {index < resumeInfo?.project?.length - 1 && (
                          <hr className="my-2" />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            }

            {/* Experience */}
            {
              resumeInfo?.certificate?.length > 0 &&
            <div className="mb-6">
              <h2
                className="text-sm font-semibold text-gray-800 uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                Professional Experience
              </h2>
              <div className="mt-3">
                {/* Job 1 */}
                <div className="mb-4">
                  {resumeInfo?.experience?.map(
                    (item: ExperienceListProps, index: number) => (
                      <div key={item.id}>
                        <h3 className="text-sm font-semibold text-gray-700">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {`${item.companyName}  ${
                            item.startDate ? " | " + item.startDate : ""
                          } ${item.endDate ? " - " + item.endDate : ""}`}
                        </p>
                        <div className="list-disc text-sm text-gray-600">
                          {item.workSummary}
                        </div>
                        {index < resumeInfo?.experience?.length - 1 && (
                          <hr className="my-2" />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            }

            {/* Education */}
            <div>
              <h2
                className="text-sm font-semibold text-gray-800 uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                Education
              </h2>
              <div className="mt-3 space-y-4">
                {resumeInfo?.education?.map(
                  (item: EducationalListProps, index: number) => (
                    <div key={index}>
                      <h3 className="text-sm font-semibold text-gray-700">
                        {`${item.degree} ${
                          item?.major ? " in " + item.major : ""
                        }`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {`${item.universityName} ${
                          item.startDate ? " | " + item.startDate : ""
                        } ${item.endDate ? " - " + item.endDate : ""}`}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview3;
