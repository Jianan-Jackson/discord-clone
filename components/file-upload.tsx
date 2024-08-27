"use client"

import {X} from "lucide-react";
import Image from "next/image";

import {UploadDropzone} from "@/lib/uploadthing";

// import "@uploadthing/react/styles.css";

import { FileIcon } from "lucide-react";

interface FileUploadProps {
    endpoint: "serverImage" | "messageFile";
    onChange: (url?: string) => void;
    value: string;
}


export const FileUpload: React.FC<FileUploadProps> = ({ endpoint, onChange, value }) => {
    const fileType = value?.split(".").pop();

    if(value&& fileType !== "pdf") {
        return(
            <div className="relative h-20 w-20">
                <Image 
                    fill
                    src={value}
                    alt="Upload"
                    className="rounded-full"
                />
                <button 
                    onClick={()=>onChange("")}
                    className="bg-rose-600 text-white p1 rounded-full absolute top-0 right-0 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    if (value && fileType === "pdf") {

        return (
            <div className="relative flex items-center p-2 mt-2 rounderd-md bg-background/10">

                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />

                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
                >
                    {value.split("/").pop()}

                </a>
                <button 
                    onClick={()=>onChange("")}
                    className="bg-rose-500 text-white p1 rounded-full absolute -top-1 -right-1 shadow-sm"
                    type="button"
                >
                    <X className="h-4 w-4"/>
                </button>

            </div>
        )


    }

    return (
        <UploadDropzone 
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}

            onUploadError={(err) => {
                console.error(err);
            }}
        />
    )
}
