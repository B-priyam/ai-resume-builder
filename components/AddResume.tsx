"use client";

import { Loader2Icon, PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import globalApi from "@/lib/globalApi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter()

  const onCreate = () => {
    setLoading(true)
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    globalApi.createNewResume(data).then(
      (resp) => {
        if (resp) {
          setLoading(false);
          router.push(`dashboard/resume/${resp.data.data.documentId}/edit`)
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div className="mt-10">
      <div
        className="p-14 py-24 border-2 items-center flex justify-center bg-secondary rounded-md h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <Image 
        src={"/add-new.svg"}
        alt="add-new"
        height={150}
        width={150}
        />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new resume</DialogTitle>
            <DialogDescription>
              Add a Title for you new resume
              <Input
                onChange={(e) => setResumeTitle(e.target.value)}
                className="my-2 text-black"
                placeholder="Ex. Full stack developer"
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant={"ghost"}>
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={onCreate}
                className="bg-purple-600"
              >
                {loading && <Loader2Icon className="animate-spin" />}
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
