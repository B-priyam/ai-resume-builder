import React, { useEffect, useState } from 'react'
import { ResumeDataProps } from '../app/dashboard/page';
import { LoaderCircle, MoreVerticalIcon, NotebookIcon } from 'lucide-react';
import Link from 'next/link';
import { generateRandomColor } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import globalApi from '@/lib/globalApi';
import { toast } from 'sonner';

const ResumeCard = ({
  documentId,
  resumeId,
  title,
  themeColor,
  refreshData,
}: ResumeDataProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log(themeColor)

  const onDelete = async () => {
    setLoading(true);
    try {
      const res = await globalApi.deleteResumeById(documentId);
      toast("resume deleted");
      refreshData()
      setLoading(false);
      setOpenAlert(false);
    } catch (error) {
      setLoading(false);
      toast("error in deleting resume");
    }
  };
  return (
    <div className="mt-10">
      <div
        className={` border-t-8 border rounded-lg shadow-primary hover:scale-105 transition-all hover:shadow-md`}
        style={{
          borderColor:themeColor
        }}
      >
        <div
          key={resumeId}
          className={cn(
            `p-14 flex items-center h-[240px] flex-col relative `,
            generateRandomColor()
          )}
        >
          <div>
            <div key={resumeId}>
              <Image
                src={`/svg-image-${Math.ceil(Math.random() * 4)}.svg`}
                alt="svg-image-1"
                height={150}
                width={150}
              />
            </div>
          </div>
        </div>
        <div
          className={`bg-primary bottom-0 w-full flex justify-between pl-5 pr-2 rounded-b-md`}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-center my-1 truncate text-white">{title}</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className=" px-2 hover:bg-purple-700 rounded-sm border-none">
              <MoreVerticalIcon className="h-5 w-5 cursor-pointer text-white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <Link href={`/dashboard/resume/${documentId}/edit`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <Link href={`/myresume/${documentId}/view`}>
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <Link href={`/myresume/${documentId}/view`}>
                <DropdownMenuItem>Download</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={() => setOpenAlert(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialog open={openAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-primary hover:bg-purple-600"
                  onClick={onDelete}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      Deleting
                    </>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard