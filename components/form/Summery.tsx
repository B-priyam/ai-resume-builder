import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "next/navigation";
import globalApi from "@/lib/globalApi";
import { toast } from "sonner";
import { Brain, LoaderCircle } from "lucide-react";
import { getApiResponse } from "@/lib/GroqApi";
import { AiSummeryListProps, EnableNextProps } from "@/lib/types";


const Summery = () => {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [aiSummeryList, setAiSummeryList] = useState([]);

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery:summery,
      });
  }, [summery]);

  const getAiResponse = async () => {
    setLoading(true);
    const response = await getApiResponse(
      `Provide a JSON array containing professional summaries for the job title ${resumeInfo?.jobTitle}" for different experience levels. Each entry in the JSON array should have the exact structure:
      {"experienceLevel": "fresher|midLevel|experienced", "summary": "A 3-4 sentence professional description tailored to the experience level."}
      Include exactly three entries: one for fresher, one for midLevel, and one for experienced. Return only the JSON objects, without any additional text or explanations.`
    );
    const data = response.endsWith("]") === false ? response.concat("]") : response;
    setAiSummeryList(JSON.parse(data));
    setLoading(false);
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    e.preventDefault();

    const data = { data: { summery:summery } };

    try {
      const res = await globalApi.updateResumeDeatils(params?.resumeId, data);
      toast("Details Updated");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10">
        <h2 className="font-bold text-lg">Summery</h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="summery">Add Summery</label>
            <Button
              type="button"
              className="border-primary text-primary flex gap-2"
              size={"sm"}
              variant={"outline"}
              onClick={getAiResponse}
            >
              <Brain className="h-4 w-4" />
              Generate from Ai
            </Button>
          </div>
          <Textarea
            className="mt-5"
            required
            placeholder="Add something about yourself in brief"
            value={resumeInfo?.summery || ""}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>{
              setSummery(e.target.value)
            }
            }
          />
          <div className="mt-2 flex justify-end">
            <Button
              className="bg-primary hover:bg-purple-600"
              type="submit"
              disabled={loading}
            >
              {loading && <LoaderCircle className="animate-spin" />}Save
            </Button>
          </div>
        </form>
      </div>
      <div>
        {aiSummeryList && (
          <>
            <h2 className="font-bold text-lg">Suggestions</h2>
            {aiSummeryList.map(
              (
                { experienceLevel, summary }: AiSummeryListProps,
                index: number
              ) => (
                <div key={index} 
                onClick={()=>{setResumeInfo({
                  ...resumeInfo,
                  summery: summary,
                });setSummery(summary);}}
                className="p-4 shadow-lg border-t-2 mt-5 border-primary rounded-md hover:bg-gray-200 cursor-pointer">
                  <h2 className="font-bold my-1">Level : {experienceLevel}</h2>
                  <p>{summary}</p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Summery;
