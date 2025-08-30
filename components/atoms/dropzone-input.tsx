"use client";

import { AddNewProductSchemaType } from "@/validations/add-new-product-schema";
import Image from "next/image";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormSetValue } from "react-hook-form";
import { LiaTimesSolid } from "react-icons/lia";

type DropzoneProps = {
  value?: (File | string)[];
  title: string;
  messageError?: string;
  onChange: (files: File[]) => void;
  setValue: UseFormSetValue<AddNewProductSchemaType>;
  multiple?: boolean;
};
const CardPreview = ({
  setFiles,
  files,
  src,
}: {
  setFiles: UseFormSetValue<AddNewProductSchemaType>;
  files: (File | string)[];
  src: File | string;
  backendBaseUrl: string;
}) => {
  const handleDeletePreview = () => {
    const newFiles = files.filter((item) => item !== src);
    setFiles("images", newFiles);
    if (newFiles.length > 0) {
      setFiles("thumbnail", newFiles[0]);
    } else {
      setFiles("thumbnail", null); 
    }
  };

  const imageSrc =
    typeof src === "string"
      ? `http://localhost:8000/images/products/images/${src}`
      : URL.createObjectURL(src);

  return (
    <div className="min-w-20 h-20 relative">
      <LiaTimesSolid
        onClick={handleDeletePreview}
        size={"1.3rem"}
        className="absolute right-1 top-1 bg-gray-600/60 p-1 text-white rounded-full cursor-pointer"
      />
      <Image
        src={imageSrc}
        alt="preview"
        width={100}
        height={100}
        className="w-full h-full rounded-lg border-2 dark:border-[#3B444F] border-[#E2E5E9]"
      />
    </div>
  );
};
const DropzoneInput = ({
  value = [],
  onChange,
  title,
  messageError,
  setValue,
  multiple = false,
}: DropzoneProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => onChange(acceptedFiles),
    multiple,
  });
  
useEffect(() => {
  if (!value || value.length === 0) {
    setValue("thumbnail", null);
    return;
  }
  setValue("thumbnail", value[0]);
}, [value, setValue]);

  return (
    <>
      <h1 className="text-title-text-light dark:text-white text-right my-3">
        {title}
      </h1>
      <div
        {...getRootProps()}
        className={`border-1 border-dashed rounded-xl p-11 text-center cursor-pointer transition ${
          isDragActive
            ? "border-blue-500 bg-blue-50/40 text-black"
            : `${
                messageError
                  ? "border-red-500"
                  : "border-[#E2E5E9] dark:border-[#3B444F]"
              } dark:bg-[#252E37] bg-[#F6F7F8]`
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
          <p className="text-gray-500">
            فایل خود را اینجا بکشید یا{" "}
            <span className="text-custom-purple font-bold">کلیک کنید</span>
          </p>
        </div>
      </div>
      <p className="text-red-500 text-right text-[12px]">{messageError}</p>
      <div
        className={`${
          value.length === 0 ? "hidden" : "block"
        } py-4 flex gap-3 overflow-x-auto`}
      >
        {value.map((item, index) => (
          <CardPreview
            key={index}
            src={item}
            setFiles={setValue}
            files={value}
            backendBaseUrl={process.env.NEXT_PUBLIC_BACKEND_URL || ""}
          />
        ))}
      </div>
    </>
  );
};
export default DropzoneInput;
