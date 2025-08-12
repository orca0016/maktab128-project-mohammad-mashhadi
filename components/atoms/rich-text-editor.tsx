"use client";

import { Button } from "@heroui/button";
import Highlight from "@tiptap/extension-highlight";
import { BulletList, OrderedList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { AiOutlineHighlight } from "react-icons/ai";
import { BiAlignJustify } from "react-icons/bi";
import { HiNumberedList } from "react-icons/hi2";

import {
  BsJustify,
  BsJustifyLeft,
  BsJustifyRight,
  BsParagraph,
} from "react-icons/bs";
import { FaBold } from "react-icons/fa6";
import { FiItalic } from "react-icons/fi";
import { GoStrikethrough } from "react-icons/go";
import { IoList } from "react-icons/io5";
import { MdFormatUnderlined } from "react-icons/md";
import { LuHeading1 ,LuHeading2 , LuHeading3 } from "react-icons/lu";

const TextEditor = ({
  value,
  onChange,
  messageError,
  title,
}: {
  value: string;
  onChange: (val: string) => void;
  messageError?: string;
  title: string;
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Underline,
      BulletList,
      OrderedList,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[150px] p-4 focus:outline-none text-right",
        dir: "rtl",
      },
    },
  });
  return (
    <>
      <h1 className="text-title-text-light dark:text-white text-right my-3">
        {title}
      </h1>
      <div
        className={`border ${
          messageError
            ? "border-red-500"
            : "border-[#E9ECEE] dark:border-gray-700"
        } rounded-lg  dark:bg-[#252E37] bg-[#F6F7F8] text-title-text-light dark:text-white`}
      >
        <MenuBar editor={editor!} />
        <EditorContent editor={editor} />
      </div>
      <p className="text-red-500 text-right text-[12px]">{messageError}</p>
    </>
  );
};
export default TextEditor;

const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="control-group dark:bg-title-text-light bg-white  border-b border-[#E9ECEE] dark:border-[#333E47] py-4 px-3 rounded-t-lg">
      <div className="button-group  flex justify-between flex-wrap gap-4">
        <Button
          isIconOnly
          variant="light"
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? "dark:bg-gray-600 bg-gray-200"
              : ""
          }
        >
          <LuHeading1 size={'1.2rem'}/>
        </Button>

        <Button
          isIconOnly
          variant="light"
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? "dark:bg-gray-600 bg-gray-200"
              : ""
          }
        >
          <LuHeading2 size={'1.2rem'}/>
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? "dark:bg-gray-600 bg-gray-200"
              : ""
          }
        >
          <LuHeading3 size={'1.2rem'}/>
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().toggleUnderline().run()}
          className={
            editor.isActive("underline") ? "dark:bg-gray-600 bg-gray-200" : ""
          }
        >
          <MdFormatUnderlined size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().setParagraph().run()}
          className={
            editor.isActive("paragraph") ? "dark:bg-gray-600 bg-gray-200" : ""
          }
        >
          <BsParagraph  size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold") ? "dark:bg-gray-600 bg-gray-200" : ""
          }
        >
          <FaBold size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic") ? "dark:bg-gray-600 bg-gray-200" : ""
          }
        >
          <FiItalic size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike") ? "dark:bg-gray-600 bg-gray-200" : ""
          }
        >
          <GoStrikethrough  size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().toggleHighlight().run()}
          className={
            editor.isActive("highlight") ? "dark:bg-gray-600 bg-gray-200" : ""
          }
        >
          <AiOutlineHighlight size={'1.2rem'} />
        </Button>

        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" })
              ? "dark:bg-gray-600 bg-gray-200"
              : ""
          }
        >
          <BsJustifyLeft size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" })
              ? "dark:bg-gray-600 bg-gray-200"
              : ""
          }
        >
          <BiAlignJustify size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" })
              ? "dark:bg-gray-600 bg-gray-200"
              : ""
          }
        >
          <BsJustifyRight size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" })
              ? "dark:bg-gray-600 bg-gray-200"
              : ""
          }
        >
          <BsJustify size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList") ? "dark:bg-gray-600 bg-gray-200" : ""
          }
        >
          <IoList size={'1.2rem'} />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onPress={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList") ? "dark:bg-gray-600 bg-gray-200" : ""
          }
        >
          <HiNumberedList size={'1.2rem'} />
        </Button>
      </div>
    </div>
  );
};
