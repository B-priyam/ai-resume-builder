import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-32 px-10 md:px-20 lg:px-28">
      <div className=" flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold py-5">
          Build Your Resume <span className="text-primary">With AI</span>
        </h1>
        <h3 className="text-xl font-normal text-gray-500 my-5">
          Effortlessly Craft a Standout Resume with Our AI-Powered Resume
          Builder
        </h3>
        <div className="flex my-5">
          <Link href={"/dashboard"}>
            <Button className="bg-primary hover:bg-purple-600 p-5">
              Get Started <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className="mt-20 my-5 text-center">
          <h2 className="text-2xl font-semibold">How it Works?</h2>
          <p className="my-2 text-gray-500">
            Generate Your Resume in just 3 simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10">
          <div className="h-40 w-60 bg-gray-100 shadow-lg p-5 flex items-center justify-center">
            <h3 className="text-center font-bold">
              Enter Datails About Yourself
            </h3>
          </div>
          <div className="h-40 w-60 bg-gray-100 shadow-lg p-5 flex items-center justify-center">
            <h3 className="text-center font-bold">
              Choose Desired Template and theme color
            </h3>
          </div>
          <div className="h-40 w-60 bg-gray-100 shadow-lg p-5 flex items-center justify-center">
            <h3 className="text-center font-bold">
              Download and share your AI generated resume
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
