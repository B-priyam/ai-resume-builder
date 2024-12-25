import { EducationalListProps, EnableNextProps } from "@/lib/types";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoaderCircle, X } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "next/navigation";
import globalApi from "@/lib/globalApi";
import { toast } from "sonner";
import { OnSaveHelper } from "@/lib/helpers";

const Education = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [educationalList, setEducationalList] = useState<
    EducationalListProps[]
  >([
    {
      degree: "",
      description: "",
      endDate: "",
      major: "",
      startDate: "",
      universityName: "",
      id: 1,
    },
  ]);

  useEffect(()=>{
    resumeInfo && setEducationalList(resumeInfo?.education)
  },[])

  const addNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        id:
          educationalList.length === 0
            ? 1
            : educationalList[educationalList.length - 1].id! + 1,
        degree: "",
        description: "",
        endDate: "",
        major: "",
        startDate: "",
        universityName: "",
      },
    ]);
  };

  const removeEducation = (id: number) => {
    setEducationalList(educationalList.filter((e) => e.id != id));
  };

  const handleChange = (id: number, e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setEducationalList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const setPresent = (id: number) => {
    setEducationalList((prevList) =>
      prevList.map((item) =>
        item.id === id && item.endDate !== "present"
          ? { ...item, endDate: "present" }
          : item.id === id && item.endDate === "present"
          ? { ...item, endDate: "" }
          : item
      )
    );
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

 const onSave = async () => {
       setLoading(true)
         const resp = await OnSaveHelper(educationalList, params.resumeId, "education");
         toast(resp);
         setLoading(false);
     }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add Your Educational Details</p>
        <div>
          {educationalList.map((item) => (
            <div key={item.id}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 relative">
                <div className="col-span-2 flex justify-end top-2 right-2 absolute md:right-5">
                  <X
                    size={20}
                    className="rounded-md hover:bg-slate-300 cursor-pointer"
                    onClick={() => removeEducation(item.id!)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm pl-1">University Name</label>
                  <Input
                    defaultValue={item.universityName}
                    autoFocus
                    id="universityName"
                    placeholder="eg. Mumbai University"
                    name="universityName"
                    onChange={(e) => handleChange(item.id, e)}
                  />
                </div>
                <div>
                  <label className="text-sm pl-1" htmlFor="degree">
                    Degree
                  </label>
                  <Input
                    defaultValue={item.degree}
                    placeholder="eg: bscit , ssc, etc"
                    id="degree"
                    name="degree"
                    onChange={(e) => handleChange(item.id, e)}
                  />
                </div>
                <div>
                  <label className="text-sm pl-1" htmlFor="major">
                    Stream
                  </label>
                  <Input
                    defaultValue={item.major}
                    placeholder="eg: science, commerce"
                    id="major"
                    name="major"
                    onChange={(e) => handleChange(item.id, e)}
                  />
                </div>
                <div>
                  <label className="text-sm pl-1" htmlFor="startDate">
                    Start Date
                  </label>
                  <Input
                    defaultValue={item.startDate}
                    type="date"
                    id="startDate"
                    name="startDate"
                    onChange={(e) => handleChange(item.id, e)}
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
                      onChange={(e) => handleChange(item.id, e)}
                    />
                    <div className="flex items-center gap-2">
                      <Input
                        checked={item.endDate === "present"}
                        className="h-4 w-4 ml-1 cursor-pointer"
                        value={"present"}
                        type="checkbox"
                        id="present"
                        onChange={() => setPresent(item.id)}
                      />
                      <label htmlFor="present" className="cursor-pointer">
                        Present
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            variant={"outline"}
            className="text-primary"
            onClick={addNewEducation}
          >
            + Add More Education
          </Button>
          <Button
            disabled={loading}
            className="bg-primary hover:bg-purple-600"
            onClick={onSave}
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

export default Education;
