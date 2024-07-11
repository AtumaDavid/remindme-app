"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import SideBar from "./SideBar";

export default function CreateCollectionBtn() {
  const [open, setOpen] = useState(false);
  const handleOpenChange = (open: boolean) => setOpen(open);
  const handleButtonClick = () => setOpen(!open);

  return (
    <div className="bg-gradient-to-r from-green-500 to-blue-500 w-full rounded-md p-[1px]">
      <Button
        variant={"outline"}
        onClick={handleButtonClick}
        className="dark:text-white w-full dark:bg-neutral-950 bg-white"
      >
        <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent  ">
          Create collection
        </span>
      </Button>
      <SideBar open={open} onOpenChange={handleOpenChange} />
    </div>
  );
}
