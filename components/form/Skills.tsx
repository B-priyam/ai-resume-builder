import { EnableNextProps, SkillProps } from "@/lib/types";
import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {Rating, RatingChange} from "@smastrom/react-rating"
import '@smastrom/react-rating/style.css'
import { LoaderCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import globalApi from "@/lib/globalApi";

const Skills = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams()
    const [loading, setLoading] = useState(false)
  const [skillList, setskillList] = useState<SkillProps[]>([
    {
      id: 0,
      name: "",
      rating: 0,
    },
  ]);

  const handleChange = (id:number,name:string,value:string|number)=> {
    // enableNext(false);
    setskillList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  }

  useEffect(() => {
      setResumeInfo({
        ...resumeInfo,
        skills: skillList,
      });
    }, [skillList]);

  const addNewSkill = () => {
    setskillList([
      ...skillList,
      {
        id:
          skillList.length === 0
            ? 1
            : skillList[skillList.length - 1].id! + 1,
        name : "",
        rating : 0
      },
    ]);
  };

  useEffect(()=>{
    resumeInfo && setskillList(resumeInfo?.skills)
  },[])

  const removeEducation = (id: number) => {
    setskillList(skillList.filter((e) => e.id != id));
  };

  const onSave = async () => {
    const newList = skillList.map(
      ({ id, ...educationalList }) => educationalList
    );
    let isEmpty = false;
    const cleanedArray = newList.map((obj) => {
      const updatedObj = { ...obj };
      for (const key in updatedObj) {
        if (!updatedObj[key as keyof typeof updatedObj]) {
            isEmpty = true
          return (toast("kindly provide skill name and its rating"))
        }
      }
    });
    if(isEmpty){
        return
    }

    console.log(newList)
    
    const data = {
      data: {
        skills: newList,
      },
    };
    setLoading(true);
    try {
      const resp = await globalApi.updateResumeDeatils(params.resumeId, data);
      toast("details updated successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast("error in updating details");
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your best skills</p>
        <div className="grid gap-2">
          {skillList.map((item: SkillProps) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-lg p-3 gap-5 relative"
            >
              <div className="col-span-2 flex justify-end top-2 right-2 absolute md:right-5">
                <X
                  size={20}
                  className="rounded-md hover:bg-slate-300 cursor-pointer"
                  onClick={() => removeEducation(item.id!)}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="">Name</label>
                <Input
                autoFocus
                defaultValue={item.name}
                placeholder="eg: coding, learning new skills"
                onChange={(e) =>{[
                  handleChange(item.id, "name", e.target.value)
                ]
                }}
                />
              </div>
              <div className="mt-5">
                <Rating
                  style={{ maxWidth: 120 }}
                  value={item.rating!}
                  onChange={(value: number) =>
                    {
                      handleChange(item.id, "rating", value);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3">
          <Button
            variant={"outline"}
            className="text-primary"
            onClick={addNewSkill}
          >
            + Add More Skills
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

export default Skills;
