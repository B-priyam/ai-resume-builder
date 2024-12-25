import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import globalApi from "@/lib/globalApi";
import {  AchievementList, CertificateList } from "@/lib/types";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { OnSaveHelper } from "@/lib/helpers";
import { LoaderCircle, X } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Achievement = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [achievementList, setAchievementList] = useState<AchievementList[]>([
    {
      id: 1,
      achievementDescription : ""
    },
  ]);

  const handleChange = (
    id: number,
    e:
      | React.FormEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    // enableNext(false)
    const { name, value } = e.currentTarget;
    setAchievementList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

 

  const addNewAchievement = () => {
    setAchievementList([
      ...achievementList,
      {
        id:
          achievementList.length === 0
            ? 1
            : achievementList[achievementList.length - 1].id! + 1,
        achievementDescription : ""
      },
    ]);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      achievement: achievementList,
    });
  }, [achievementList]);

   useEffect(() => {
     resumeInfo && setAchievementList(resumeInfo?.achievement);
   }, []);

  const onSave = async () => {
    setLoading(true);
      const resp = await OnSaveHelper(
        achievementList,
        params.resumeId,
        "achievement"
      );
      toast(resp);
      setLoading(false);
      console.log(resp);
  };

  const removeAchievement = (id: number) => {
    setAchievementList(achievementList.filter((e) => e.id != id));
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10">
        <h2 className="font-bold text-lg">Achievements</h2>
        <p>Add Your Achievements</p>
        <div>
          {achievementList.map((item) => (
            <div
              className="grid grid-cols-2 gap-3 border p-3 my-5 relative"
              key={item.id}
            >
              <div className="col-span-2 flex justify-end top-2 right-2 absolute md:right-5">
                <X
                  size={20}
                  className="rounded-md hover:bg-slate-300 cursor-pointer"
                  onClick={() => removeAchievement(item.id!)}
                />
              </div>
              <div className="col-span-2">
                <label
                  className="text-sm pl-2"
                  htmlFor="achievementDescription"
                >
                  Achievement Description
                </label>
                <Textarea
                  defaultValue={item.achievementDescription}
                  id="achievementDescription"
                  placeholder="eg. About your achievement"
                  name="achievementDescription"
                  onChange={(e) => handleChange(item.id, e)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            variant={"outline"}
            className="text-primary"
            onClick={addNewAchievement}
          >
            + Add More Achievement
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

export default Achievement;
