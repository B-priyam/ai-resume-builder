import { EnableNextProps, ExperienceListProps } from "@/lib/types";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TextEditor from "../TextEditor";
import { LoaderCircle, X } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import globalApi from "@/lib/globalApi";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { OnSaveHelper } from "@/lib/helpers";

const Experience = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const [experienceList, setExperienceList] = useState<ExperienceListProps[]>([
    {
      id: 1,
      city: "",
      companyName: "",
      endDate: "",
      startDate: "",
      state: "",
      title: "",
      workSummary: "",
    },
  ]);

  const handleChange = (id: number, e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setExperienceList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const handleTextEditor = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
    id: number
  ) => {
    setExperienceList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [name]: e.target.value } : item
      )
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  useEffect(()=>{
    resumeInfo && setExperienceList(resumeInfo?.experience)
  },[])

  const addNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        id:
          experienceList.length === 0
            ? 1
            : experienceList[experienceList.length - 1].id! + 1,
        city: "",
        companyName: "",
        endDate: "",
        startDate: "",
        state: "",
        title: "",
        workSummary: "",
      },
    ]);
  };

  const setPresent = (id: number) => {
    setExperienceList((prevList) =>
      prevList.map((item) =>
        item.id === id && item.endDate !== "present"
          ? { ...item, endDate: "present" }
          : item.id === id && item.endDate === "present"
          ? { ...item, endDate: "" }
          : item
      )
    );
  };

  const removeExperience = (id: number) => {
    setExperienceList(experienceList.filter((e) => e.id != id));
  };

  const onSave = async () => {
        setLoading(true)
          const resp = await OnSaveHelper(experienceList, params.resumeId, "experience");
          toast(resp);
          setLoading(false);
      }
    
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job Experience</p>
        <div>
          {experienceList.map((item) => (
            <div key={item.id}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg relative">
                <div className="col-span-2 flex justify-end top-2 right-2 absolute md:right-5">
                  <X
                    size={20}
                    className="rounded-md hover:bg-slate-300 cursor-pointer"
                    onClick={() => removeExperience(item.id!)}
                  />
                </div>

                <div className="mt-3 md:mt-0">
                  <label className="text-sm pl-1" htmlFor="title">
                    Position title
                  </label>
                  <Input
                    autoFocus
                    placeholder="eg: software engineer"
                    defaultValue={item.title}
                    name="title"
                    id="title"
                    onChange={(e) => handleChange(item.id!, e)}
                  />
                </div>
                <div className="mt-3 md:mt-0">
                  <label className="text-sm pl-1" htmlFor="companyName">
                    Company Name
                  </label>
                  <Input
                    defaultValue={item.companyName}
                    placeholder="eg: xyz company"
                    name="companyName"
                    id="companyName"
                    onChange={(e) => handleChange(item.id!, e)}
                  />
                </div>
                <div>
                  <label className="text-sm pl-1" htmlFor="city">
                    City
                  </label>
                  <Input
                    defaultValue={item.city}
                    placeholder="eg: mumbai"
                    name="city"
                    id="city"
                    onChange={(e) => handleChange(item.id!, e)}
                  />
                </div>
                <div>
                  <label className="text-sm pl-1" htmlFor="state">
                    State
                  </label>
                  <Input
                    defaultValue={item.state}
                    placeholder="eg: maharashtra"
                    name="state"
                    id="state"
                    onChange={(e) => handleChange(item.id!, e)}
                  />
                </div>
                <div>
                  <label className="text-sm pl-1" htmlFor="startDate">
                    Start Date
                  </label>
                  <Input
                    defaultValue={item.startDate}
                    name="startDate"
                    id="startDate"
                    type="date"
                    onChange={(e) => handleChange(item.id!, e)}
                  />
                </div>
                <div>
                  <label className="text-sm pl-1" htmlFor="endDate">
                    End Date
                  </label>
                  <div className="flex flex-col lg:flex-row">
                    <Input
                      defaultValue={item.endDate}
                      type="date"
                      id="endDate"
                      name="endDate"
                      disabled={item.endDate === "present"}
                      onChange={(e) => handleChange(item.id!, e)}
                    />
                    <div className=" flex items-center gap-2">
                      <Input
                        checked={item.endDate==="present"}
                        className="h-4 w-4 ml-1 cursor-pointer"
                        value={"present"}
                        type="checkbox"
                        id="present"
                        onChange={() => setPresent(item.id!)}
                      />
                      <label htmlFor="present" className="cursor-pointer">
                        Present
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <TextEditor
                    onTextEditorValueChange={(
                      event: React.ChangeEvent<HTMLInputElement>
                    ) => handleTextEditor(event, "workSummary", item.id!)}
                    defaultValue={item.workSummary}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <Button
            variant={"outline"}
            className="text-primary"
            onClick={addNewExperience}
          >
            + Add More Button
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

export default Experience;
