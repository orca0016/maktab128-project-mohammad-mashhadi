"use client";

import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { UseFormSetValue } from "react-hook-form";
import { LiaTimesSolid } from "react-icons/lia";

type DropzoneProps = {
  value?: File[];
  onChange: (files: File[]) => void;
  setValue: UseFormSetValue<{
    images: File[];
  }>;
  multiple?: boolean;
};
const CardPreview = ({
  setFiles,
  files,
  src,
}: {
  setFiles: UseFormSetValue<{
    images: File[];
  }>;
  files: File[];
  src: File;
}) => {
  const handleDeletePreview = () => {
    setFiles(
      "images",
      files.filter((item) => item !== src)
    );
    files = files.filter((item) => item !== src);
  };
  return (
    <div className="min-w-20 h-20 relative">
      <LiaTimesSolid
        onClick={handleDeletePreview}
        size={"1.3rem"}
        className="absolute right-1 top-1  font-semibold bg-gray-600/60 p-1 text-white   rounded-full   cursor-pointer"
      />
      <Image
        src={URL.createObjectURL(src)}
        alt="alt"
        width={100}
        height={100}
        className="w-full h-full rounded-lg dark:border-[#3B444F] border-[#E2E5E9] border-2"
      />
    </div>
  );
};
const DropzoneInput = ({
  value = [],
  onChange,
  setValue,
  multiple = false,
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onChange(acceptedFiles),
    multiple,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`border-1 border-dashed rounded-xl p-11 text-center cursor-pointer transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50/40 text-black"
            : "border-[#E2E5E9] dark:border-[#3B444F] dark:bg-[#252E37] bg-[#F6F7F8]"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex items-center flex-col">
          <Image
            src={"/images/inputs/dropzone-img.svg"}
            alt="icon"
            className="w-36 h-28"
            width={100}
            height={100}
          />
          <p className="text-gray-500">فایل خود را اینجا بکشید یا <span className="text-custom-purple font-bold">کلیک کنید</span></p>
        </div>
      </div>
      <div className="py-4 flex gap-3 overflow-x-auto">
        {value.map((item, index) => (
          <CardPreview
            key={index}
            src={item}
            setFiles={setValue}
            files={value}
          />
        ))}
      </div>
    </>
  );
};
export default DropzoneInput;
