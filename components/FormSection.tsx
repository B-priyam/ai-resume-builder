"use client";

import React, { useContext, useEffect, useState } from "react";
import PersonalDetails from "./form/PersonalDetails";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight, LayoutGridIcon, LoaderCircle, View } from "lucide-react";
import Summery from "./form/Summery";
import Experience from "./form/Experience";
import Education from "./form/Education";
import Skills from "./form/Skills";
import { useParams } from "next/navigation";
import Link from "next/link";
import globalApi from "@/lib/globalApi";
import { toast } from "sonner";
import Projects from "./form/Projects";
import Certificates from "./form/Certificates";
import Achievement from "./form/Achievement";

const FormSection = () => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const [themeColor, setThemeColor] = useState<string | undefined>(undefined);
  const [changeThemeButton, setchangeThemeButton] = useState(false)
  const [loading, setloading] = useState(false)

  useEffect(() => {
    setThemeColor(resumeInfo?.themeColor || "#000000");
  }, [resumeInfo?.themeColor]);

  const onThemeColorChange = (color: string) => {
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    setchangeThemeButton(true)
  };

  const saveTheme = async ()=> {
    setloading(true)
     try {
      const res = await globalApi.updateResumeDeatils(params.resumeId, {
        data: { themeColor: themeColor },
      });
     } catch (error) {
      toast("error in updating theme");
      setloading(false);
     }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
        <Button variant={"outline"} size={"sm"} className="flex gap-2">
          {themeColor && (
            <input
            type="color"
            className="w-6 rounded-md"
            value={themeColor} 
            onChange={(e) => {
              setThemeColor(e.target.value);
              onThemeColorChange(e.target.value);
            }}
            />
          )}
          Theme
        </Button>
        {changeThemeButton && <Button onClick={saveTheme} disabled={loading} size={"sm"} className="bg-primary hover:bg-purple-600">{loading ? <><LoaderCircle className="animate-spin" />Saving</> :"Save Theme"}</Button>
          }          
          </div>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
              className="bg-primary hover:bg-purple-600"
              size={"sm"}
            >
              <ArrowLeft />
            </Button>
          )}

          <Button
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            disabled={!enableNext}
            className="flex gap-2 bg-primary hover:bg-purple-600"
            size={"sm"}
          >
            {activeFormIndex === 8 ? (
              <Link
                href={`/myresume/${params.resumeId}/view`}
                className="flex gap-2"
              >
                <View />
                View Form
              </Link>
            ) : (
              <>
                Next <ArrowRight />
              </>
            )}
          </Button>
        </div>
      </div>
      {activeFormIndex === 1 && (
        <PersonalDetails  />
      )}
      {activeFormIndex === 2 && (
        <Summery />
      )}
      {activeFormIndex === 3 && (
        <Experience />
      )}
      {activeFormIndex === 4 && (
        <Education  />
      )}
      {activeFormIndex === 5 && (
        <Skills  />
      )}
      {activeFormIndex === 6 && (
        <Projects />
      )}
      {activeFormIndex === 7 && (
          <Certificates />
        )}
      {activeFormIndex === 8 && (
          <Achievement />
        )}
      
    </div>
  );
};

export default FormSection;
