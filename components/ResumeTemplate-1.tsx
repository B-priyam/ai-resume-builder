"use client"

import React, { useContext, useEffect, useState } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Github, Link, Linkedin, Loader2, Mail, Phone, User } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { AchievementList, CertificateList, EducationalListProps, ExperienceListProps, ProjectList, SkillProps } from "@/lib/types";
import { Button } from "./ui/button";
import globalApi from "@/lib/globalApi";
import { useParams } from "next/navigation";

const SortableItem = ({ id, children }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "16px", // Add spacing between items
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const ResumeTemplate1 = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const params = useParams()
  const [sections, setSections] = useState<string[]>([]);

  const [enableSaveLayoutButton, setenableSaveLayoutButton] = useState(false)

  const themeColor = resumeInfo?.themeColor || "#00274D";

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.indexOf(active.id);
      const newIndex = sections.indexOf(over.id);

      const newSections = arrayMove(sections, oldIndex, newIndex);
      setSections(newSections);
      setenableSaveLayoutButton(true);
    }
  };

  useEffect(() => {
      const savedSections = resumeInfo?.resumeSection;
      if (savedSections) {
        setSections(savedSections);
      } else {
        setSections([
          "Professional Summary",
          "Projects",
          "Experience",
          "Education",
          "Skills",
          "Certifications",
          "Achievements",
        ]);
      }
    }, []);
    const [loading, setLoading] = useState(false)

  const saveLayout = async () => {
      const resp = await globalApi.updateResumeDeatils(params?.resumeId, {
        data: { resumeSection: sections },
      });
      setLoading(false)
      if(resp){
        setenableSaveLayoutButton(false)
      }
    };

  const renderSection = (sectionName:string) => {
    switch (sectionName) {
      case "Professional Summary":
        return resumeInfo?.summery ? (
          <div className="my-4">
            <h2
              className="text-center font-bold text-lg mb-1"
              style={{ color: themeColor }}
            >
              Summary
            </h2>
            <hr
              className="border-[1.5px] my-2"
              style={{ borderColor: themeColor }}
            />
            <p className="text-sm">{resumeInfo?.summery}</p>
          </div>
        ) : null;

      case "Projects":
        return resumeInfo?.project?.length > 0 ? (
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
            {resumeInfo?.project.map((item: ProjectList, index: number) => (
              <div key={index} className="my-3 mb-1">
                <h3
                  className={`font-bold flex justify-between ${
                    item.projectUrl.length > 60 ? "text-xs" : "text-sm"
                  }`}
                >
                  {item.projectName}
                  <div className="flex items-center gap-1">
                    <Link className="h-4 w-4" />
                    <a href={item.projectUrl}>{item.projectUrl}</a>
                  </div>
                </h3>
                <h4 className="text-[13px] font-medium">
                  {item.projectDescription}
                </h4>
              </div>
            ))}
          </div>
        ) : null;

      case "Experience":
        return resumeInfo?.experience?.length > 0 ? (
          <div className="my-6">
            <h2
              className="text-center font-bold text-lg mb-2"
              style={{ color: themeColor }}
            >
              Professional Experience
            </h2>
            <hr
              style={{ borderColor: themeColor }}
              className="border-[1.5px]"
            />
            {resumeInfo.experience.map(
              (experience: ExperienceListProps, index: number) => (
                <div key={index} className="my-5">
                  <h2 className="text-[14px] font-bold">{experience.title}</h2>
                  <h2 className="text-[13px] flex justify-between -mt-1 mb-1">
                    {experience.companyName}, {experience.city},{" "}
                    {experience.state}
                    <span>
                      {experience.startDate} -{" "}
                      {experience.endDate ? "Present" : experience.endDate}
                    </span>
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: experience.workSummary!,
                    }}
                    className="text-[13px]"
                  />
                </div>
              )
            )}
          </div>
        ) : null;

      case "Education":
        return resumeInfo?.education?.length > 0 ? (
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
            {resumeInfo.education.map(
              (education: EducationalListProps, index: number) => (
                <div key={index}>
                  <h2 className="text-[14px] font-bold">
                    {education.degree}{" "}
                    {education.major && `(${education.major})`}
                    {education.grade && ` - ${education.grade}`}
                  </h2>
                  <h2 className="text-sm flex justify-between">
                    {education.universityName}
                    <span>
                      {education.startDate} - {education.endDate}
                    </span>
                  </h2>
                  <p className="text-xs my-2">{education.description}</p>
                </div>
              )
            )}
          </div>
        ) : null;

      case "Skills":
        return resumeInfo?.skills?.length > 0 ? (
          <div className="my-6">
            <h2
              className="text-center font-bold text-lg mb-2"
              style={{ color: themeColor }}
            >
              Skills
            </h2>
            <hr
              style={{ borderColor: themeColor }}
              className="border-[1.5px]"
            />
            <div className="grid grid-cols-2 gap-3 my-4">
              {resumeInfo.skills.map((skill: SkillProps, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2"
                >
                  <h2 className="text-[14px] w-1/2">{skill.name}</h2>
                  <div className="h-2 bg-gray-300 w-1/4 min-w-1/4 mr-2">
                    <div
                      className="h-2"
                      style={{
                        backgroundColor: themeColor,
                        width: skill.rating! * 20 + "%",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      case "Certificates":
        return resumeInfo?.certificate?.length > 0 ? (
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
            {resumeInfo.certificate.map(
              (item: CertificateList, index: number) => (
                <div key={index} className="my-2">
                  <li>{item.certificateName}</li>
                  {item.certificateDescription && (
                    <p className="text-sm ml-5 -mt-1">
                      {item.certificateDescription}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        ) : null;

      case "Achievements":
        return resumeInfo?.achievement?.length > 0 ? (
          <div>
            <h2
              className="text-center font-bold text-lg mt-2"
              style={{ color: themeColor }}
            >
              Achievements
            </h2>
            <hr
              style={{ borderColor: themeColor }}
              className="border-[1.5px] my-2"
            />
            {resumeInfo.achievement.map(
              (item: AchievementList, index: number) => (
                <div key={index}>
                  <li>{item.achievementDescription}</li>
                </div>
              )
            )}
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div>
      {enableSaveLayoutButton && (
        <div className="w-full flex mb-1 justify-end">
          <Button
            className="bg-primary hover:bg-purple-600 flex "
            onClick={saveLayout}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            Save Layout
          </Button>
        </div>
      )}
      <div
        className="shadow-lg h-full py-14 px-4 md:px-14 border-t-[20px]"
        style={{ borderColor: themeColor }}
      >
        <div className="text-center mb-6">
          <h2 className="font-bold text-xl" style={{ color: themeColor }}>
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h2>
          <h2 className="text-sm font-semibold">{resumeInfo?.jobTitle}</h2>
          <h2 className="font-normal text-xs">{resumeInfo?.address}</h2>
        </div>

        <div className="flex justify-between mb-4">
          <div>
            <h2 className="items-center flex gap-1 font-normal text-sm">
              <Phone className="h-4 w-4" />
              {resumeInfo?.phone}
            </h2>
            <h2 className="items-center flex gap-1 font-normal text-sm">
              <Github className="h-4 w-4" />
              {resumeInfo?.github}
            </h2>
            <h2 className="items-center flex gap-1 font-normal text-sm">
              <User className="h-4 w-4" />
              {resumeInfo?.portfolio}
            </h2>
          </div>
          <div>
            <h2 className="items-center flex gap-1 font-normal text-sm">
              <Mail className="w-4 h-4" />
              {resumeInfo?.email}
            </h2>
            <h2 className="items-center flex gap-1 font-normal text-sm">
              <Linkedin className="w-4 h-4" />
              {resumeInfo?.linkedIn}
            </h2>
          </div>
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section: string) => (
              <SortableItem key={section} id={section}>
                {renderSection(section)}
              </SortableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default ResumeTemplate1;
