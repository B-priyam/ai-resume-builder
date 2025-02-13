import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import globalApi from "@/lib/globalApi";
import { ProjectList } from "@/lib/types";
import { AudioWaveform, LoaderCircle, X } from "lucide-react";
import { useParams } from "next/navigation";
import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { OnSaveHelper } from "@/lib/helpers";
import { getApiResponse } from "@/lib/GroqApi";

const Projects = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [projectList, setProjectList] = useState<ProjectList[]>([
    {
      id: 1,
      projectDescription: "",
      projectName: "",
      projectUrl: "",
    },
  ]);

  const handleChange = (
    id: number,
    e: React.FormEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setProjectList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const addNewProject = () => {
    setProjectList([
      ...projectList,
      {
        id:
          projectList.length === 0
            ? 1
            : projectList[projectList.length - 1].id! + 1,
        projectDescription: "",
        projectName: "",
        projectUrl: "",
      },
    ]);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      project: projectList,
    });
  }, [projectList]);

   useEffect(()=>{
      resumeInfo && setProjectList(resumeInfo?.project)
    },[])

  const onSave = async () => {
      setLoading(true)
        const resp = await OnSaveHelper(projectList, params.resumeId, "project");
        toast(resp);
        setLoading(false);
    }

  const removeProjects = (id: number) => {
    setProjectList(projectList.filter((e) => e.id != id));
  };

  const enhanceWithAI = useCallback( async(id:number)=>{
    let projectDescription = "",
      title = "";

    projectList.map(
      (item: ProjectList) =>
        item.id === id &&
        ((projectDescription = item.projectDescription),
        (title = item.projectName))
    );
    if (!projectDescription || !title) {
      toast(
        "kindly enter project name and some description in description box to enhance it"
      );
      return;
    }
    const prompt = `Enhance the provided project description using provided data and project name to improve clarity, professionalism, and detail while remaining concise and within 20-30 words. Ensure the response contains only the enhanced description without any introductory or additional phrases like 'Here is the refined project description.' and without quotation marks.

Provided Data: ${projectDescription} , project name: ${title}`;

    const response = await getApiResponse(prompt);
    setProjectList(
      projectList.map((item) =>
        item.id === id ? { ...item, projectDescription: response } : item
      )
    );

  },[projectList])

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10">
        <h2 className="font-bold text-lg">Personal Projects</h2>
        <p>Add Your Best Projects</p>
        {projectList.map((item) => (
          <div
            className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg relative"
            key={item.id}
          >
            <div className="col-span-2 flex justify-end top-2 right-2 absolute md:right-5">
              <X
                size={20}
                className="rounded-md hover:bg-slate-300 cursor-pointer"
                onClick={() => removeProjects(item.id!)}
              />
            </div>
            <div className="col-span-2 lg:col-span-1 mt-3 md:mt-0">
              <label className="text-sm pl-1" htmlFor="projectName">
                Project Name
              </label>
              <Input
                autoFocus
                placeholder="eg: Chat app"
                defaultValue={item.projectName}
                name="projectName"
                id="projectName"
                onChange={(e) => handleChange(item.id!, e)}
              />
            </div>
            <div className="col-span-2 md:col-span-1 mt-3 md:mt-0">
              <label className="text-sm pl-1" htmlFor="projectUrl">
                Project Url
              </label>
              <Input
                placeholder="eg: https://my-chat-app.com"
                defaultValue={item.projectUrl}
                name="projectUrl"
                id="projectUrl"
                onChange={(e) => handleChange(item.id!, e)}
              />
            </div>
            <div className="col-span-2 mt-3 md:mt-0">
              <div className="flex justify-between items-center py-0">
                <label className="text-sm pl-1" htmlFor="projectDescription">
                  Project Description
                </label>
                <div>
                  <Button onClick={()=>enhanceWithAI(item.id)} variant={"outline"} className="border border-primary mb-1">
                    <AudioWaveform className="text-primary"/>
                    Enhance with AI
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="explain in short about your project"
                defaultValue={item.projectDescription}
                name="projectDescription"
                id="projectDescription"
                onChange={(e) => handleChange(item.id!, e)}
              />
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <Button
            variant={"outline"}
            className="text-primary"
            onClick={addNewProject}
          >
            + Add More Projects
          </Button>
          <Button
            disabled={loading}
            onClick={onSave}
            className="bg-primary hover:bg-purple-600"
          >
            {loading ? (
              <>
                <LoaderCircle className="animate-spin" /> Saving
              </>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
