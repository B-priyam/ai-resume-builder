import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import globalApi from "@/lib/globalApi";
import { CertificateList } from "@/lib/types";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { OnSaveHelper } from "@/lib/helpers";
import { LoaderCircle, X } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Certificates = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [certificateList, setCertificateList] = useState<CertificateList[]>([
    {
      id: 1,
      certificateDescription: "",
      certificateName: "",
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
    setCertificateList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  };

  const addNewCertificate = () => {
    setCertificateList([
      ...certificateList,
      {
        id:
          certificateList.length === 0
            ? 1
            : certificateList[certificateList.length - 1].id! + 1,
        certificateDescription: "",
        certificateName: "",
      },
    ]);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      certificate: certificateList,
    });
  }, [certificateList]);

  const onSave = async () => {
    setLoading(true);
    try {
      const resp = await OnSaveHelper(
        certificateList,
        params.resumeId,
        "certificate"
      );
      toast("details updated successfully");
      setLoading(false);
      console.log(resp);
    } catch (error) {
      console.log(error);
      toast("error in updating details");
      setLoading(false);
    }
  };

  useEffect(()=>{
      resumeInfo && setCertificateList(resumeInfo?.certificate)
    },[])

  const removeCertificate = (id: number) => {
    setCertificateList(certificateList.filter((e) => e.id != id));
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-4 border-primary mt-10">
        <h2 className="font-bold text-lg">Certificates</h2>
        <p>Add Your certificates</p>
        <div>
          {certificateList.map((item) => (
            <div
              className="grid grid-cols-2 gap-3 border p-3 my-5 relative"
              key={item.id}
            >
              <div className="col-span-2 flex justify-end top-2 right-2 absolute md:right-5">
                <X
                  size={20}
                  className="rounded-md hover:bg-slate-300 cursor-pointer"
                  onClick={() => removeCertificate(item.id!)}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm pl-1" htmlFor="certificateName">
                  Certificate Name
                </label>
                <Input
                  defaultValue={item.certificateName}
                  autoFocus
                  id="certificateName"
                  placeholder="eg. Certificate name"
                  name="certificateName"
                  onChange={(e) => handleChange(item.id, e)}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm pl-1" htmlFor="certificateDescription">
                  Certificate Description
                </label>
                <Textarea
                  defaultValue={item.certificateDescription}
                  id="certificateDescription"
                  placeholder="eg. About certificate"
                  name="certificateDescription"
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
            onClick={addNewCertificate}
          >
            + Add More Certificates
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

export default Certificates;
