"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div id="header" className="p-3 px-5 flex justify-between shadow-md items-center">
      <Image src={"/logo.svg"} alt="logo" height={100} width={100} />
      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link href={"/dashboard"}>
            <Button variant={"outline"}>Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link href={"/sign-in"}>
          <Button className="bg-[#9f5bff]">Get started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
