"use client";

import { useEffect, useState, useContext } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { CSS } from "@dnd-kit/utilities";
import { Github, Linkedin, Loader, Loader2, MailIcon, Phone, User } from "lucide-react";
import globalApi from "@/lib/globalApi";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";
import { toast } from "sonner";

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

const ResumeTemplate2 = () => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [sections, setSections] = useState<string[]>([]);
  const [enableSaveTemplateButton, setenableSaveTemplateButton] =
    useState(false);
  const [loading, setloading] = useState(false)

  let themeColor = resumeInfo?.themeColor || "#00274D";

  const params = useParams();

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

  const saveLayout = async () => {
    setloading(true)
    const resp = await globalApi.updateResumeDeatils(params?.resumeId, {
      data: { resumeSection: sections },
    });
    setloading(false)
    if (resp) {
      setenableSaveTemplateButton(false);
      toast("layout updated");
    }

  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.indexOf(active.id);
      const newIndex = sections.indexOf(over.id);

      const newSections = arrayMove(sections, oldIndex, newIndex);
      setSections(newSections);
      setenableSaveTemplateButton(true);
    }
  };

  const renderSection = (section: string) => {
    switch (section) {
      case "Professional Summary":
        return (
          <div>
            {resumeInfo?.summery && (
              <div className="my-4">
                <h2
                  className="my-2 font-semibold"
                  style={{ color: themeColor }}
                >
                  PROFESSIONAL SUMMARY
                </h2>
                <p>{resumeInfo?.summery}</p>
                {sections[6] !== "Professional Summary" && (
                  <hr
                    className={`h-1 rounded-full mt-2`}
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </div>
            )}
          </div>
        );
      case "Projects":
        return (
          <div>
            {resumeInfo?.project?.length > 0 && (
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
                {sections[6] !== "Projects" && (
                  <hr
                    className={`h-1 rounded-full mt-2`}
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </div>
            )}
          </div>
        );
      case "Experience":
        return (
          <div>
            {resumeInfo?.experience?.length > 0 && (
              <div>
                <h2
                  className="font-semibold mt-1"
                  style={{ color: themeColor }}
                >
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
                          {item.city && `${item.city}, `}{" "}
                          {item.state && `${item.state}`}
                        </p>
                        <p
                          dangerouslySetInnerHTML={{ __html: item.workSummary }}
                        ></p>
                        {index < resumeInfo?.experience?.length - 1 && (
                          <hr className="mt-2" />
                        )}
                      </div>
                    ))}
                </div>
                {sections[6] !== "Experience" && (
                  <hr
                    className={`h-1 rounded-full mt-2`}
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </div>
            )}
          </div>
        );
      case "Education":
        return (
          <div>
            {resumeInfo?.education?.length > 0 && (
              <div>
                <h2
                  className="font-semibold mt-1"
                  style={{ color: themeColor }}
                >
                  EDUCATION
                </h2>
                <div>
                  {resumeInfo?.education?.length > 0 &&
                    resumeInfo?.education.map((item: any, index: number) => (
                      <div key={index}>
                        <h3 className="-my-1 font-semibold">{item.degree}</h3>
                        <div className="flex">
                          <h4>
                            {item.universityName && `${item.universityName} | `}
                          </h4>
                          <span>
                            {item.startDate && `${item.startDate} - `}
                            {item.endDate}
                          </span>
                        </div>
                        {index < resumeInfo?.education?.length - 1 && (
                          <hr className="my-2" />
                        )}
                      </div>
                    ))}
                </div>
                {sections[6] !== "Education" && (
                  <hr
                    className={`h-1 rounded-full mt-2`}
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </div>
            )}
          </div>
        );
      case "Skills":
        return (
          <div>
            {resumeInfo?.skills?.length > 0 && (
              <div>
                <h2
                  className="font-semibold my-1"
                  style={{ color: themeColor }}
                >
                  SKILLS
                </h2>
                <div className="grid grid-cols-2 max-grid-rows-3">
                  {resumeInfo?.skills?.length > 0 &&
                    resumeInfo?.skills.map((item: any, index: number) => (
                      <div key={index}>
                        <li>{item.name}</li>
                      </div>
                    ))}
                </div>
                {sections[6] !== "Skills" && (
                  <hr
                    className={`h-1 rounded-full mt-2`}
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </div>
            )}
          </div>
        );
      case "Certifications":
        return (
          <div>
            {resumeInfo?.certificate?.length > 0 && (
              <div>
                <h2
                  className="font-semibold mt-1"
                  style={{ color: themeColor }}
                >
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
                {sections[6] !== "Certifications" && (
                  <hr
                    className={`h-1 rounded-full mt-2`}
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </div>
            )}
          </div>
        );
      case "Achievements":
        return (
          <div>
            {resumeInfo?.achievement?.length > 0 && (
              <div>
                <h2
                  className="font-semibold mt-1"
                  style={{ color: themeColor }}
                >
                  ACHIEVEMENTS
                </h2>
                <div>
                  {resumeInfo?.achievement?.map((item: any, index: number) => (
                    <div key={index}>
                      <li>{item.achievementDescription}</li>
                    </div>
                  ))}
                </div>
                {sections[6] !== "Achievements" && (
                  <hr
                    className={`h-1 rounded-full mt-2`}
                    style={{ backgroundColor: themeColor }}
                  />
                )}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sections} strategy={verticalListSortingStrategy}>
        <div className="w-full">
          {enableSaveTemplateButton && (
            <div className="w-full justify-end flex mb-1 print:hidden">
              <Button className="bg-primary hover:bg-purple-600 flex "
              onClick={saveLayout}
              disabled={loading}
              >{
                loading &&
                <Loader2 className="animate-spin" />
              }
                Save Layout
              </Button>
            </div>
          )}
          <div
            className={`px-5 border-t-4`}
            style={{ borderColor: themeColor }}
          >
            <h1
              className="text-center font-bold text-xl my-2"
              style={{ color: themeColor }}
            >
              {resumeInfo?.firstName} {resumeInfo?.lastName}
            </h1>
            <div
              className="flex p-2 justify-between print:mx-0 mb-2"
              style={{
                backgroundColor: themeColor,
                printColorAdjust: "revert",
              }}
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
            {sections.map((section) => (
              <SortableItem key={section} id={section}>
                {renderSection(section)}
              </SortableItem>
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ResumeTemplate2;
