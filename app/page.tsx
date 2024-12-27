import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>

    <div className="py-20 px-10 md:px-20 lg:px-20">
      <div className=" flex justify-center items-center flex-col">
        <h1 className="text-4xl md:text-6xl lg:text-4xl font-bold py-5 text-center">
          Build Your Resume <span className="text-primary">With AI</span>
        </h1>
        <h3 className="text-xl font-normal text-gray-500 mb-5 text-center">
          Effortlessly Craft a Standout Resume with Our AI-Powered Resume
          Builder
        </h3>
        <div className="flex">
          <Link href={"/dashboard"}>
            <Button className="bg-primary hover:bg-purple-600 p-5">
              Get Started <ArrowRight />
            </Button>
          </Link>
        </div>
        <div className="mt-10 lg:my-5 text-center">
          <h2 className="text-2xl font-semibold">How it Works?</h2>
          <p className=" text-gray-500">
            Generate Your Resume in just 3 simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 w-full items-center lg:px-10 ">
          <div className="shadow-lg flex items-center py-10 justify-center rounded-md flex-col border">
            <p className="text-primary text-center text-2xl font-semibold">
              Step 1
            </p>
            <h3 className="text-center font-bold text-gray-500">
              Enter Datails About Yourself
            </h3>
          </div>
          <div className="shadow-lg flex items-center py-10 justify-center rounded-md flex-col border">
            <p className="text-primary text-center text-2xl font-semibold">
              Step 2
            </p>
            <h3 className="text-center font-bold">
              Choose Desired Template and theme color
            </h3>
          </div>
          <div className="shadow-lg flex items-center py-10 justify-center rounded-md flex-col border">
            <p className="text-primary text-center text-2xl font-semibold">
              Step 3
            </p>
            <h3 className="text-center font-bold">
              Download and share your AI generated resume
            </h3>
          </div>
        </div>
      </div>
    </div>
        <footer className="bg-purple-700 text-white text-center py-5 w-full">
          <p>© 2024 AI Mock Interview. All rights reserved.</p>
        </footer>
    </div>
  );
}
