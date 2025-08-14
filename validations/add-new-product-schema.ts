import { z } from "zod";

const validFormats = new Set(["image/png", "image/jpg", "image/jpeg"]);
const validSize = 2 * 1024 * 1024; // 2MB

const stripHtml = (html: string) =>
  (html || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, "")
    .trim();

export const addNewProductSchema = (isEditingMode = false) =>
  z.object({
    category: z
      .string({ error: "لطفا یک دسته‌بندی برای محصول انتخاب کنید." })
      .min(1, { message: "لطفا یک دسته‌بندی برای محصول انتخاب کنید." }),

    subcategory: z
      .string({ error: "لطفا یک زیرمجموعه برای محصول انتخاب کنید." })
      .min(1, { message: "لطفا یک زیرمجموعه برای محصول انتخاب کنید." }),

    name: z
      .string({ error: "لطفا اسم محصول را وارد کنید." })
      .trim()
      .min(4, { message: "اسم محصول باید بیشتر از ۴ کاراکتر باشد." })
      .max(30, { message: "اسم محصول نمی‌تواند بیشتر از ۳۰ کاراکتر باشد." }),

    description: z
      .string({ error: "توضیحات محصول را وارد کنید." })
      .superRefine((val, ctx) => {
        if (!stripHtml(val)) {
          ctx.addIssue({
            code: "custom",
            message: "توضیحات محصول را وارد کنید.",
          });
        }
      }),

    price: z
      .string({ error: "قیمت را وارد کنید." })
      .regex(/^\d+$/, { message: "لطفا یک مقدار عددی معتبر وارد کنید." }),

    quantity: z
      .string({ error: "تعداد را وارد کنید." })
      .regex(/^\d+$/, { message: "لطفا یک مقدار عددی معتبر وارد کنید." }),

    brand: z
      .string({ error: "برند محصول را وارد کنید." })
      .trim()
      .min(2, { message: "اسم برند باید بیشتر از ۲ کاراکتر باشد." })
      .max(10, { message: "اسم برند نمی‌تواند بیشتر از ۱۰ کاراکتر باشد." }),

    thumbnail: z.any().superRefine((val, ctx) => {
      if (isEditingMode && typeof val === "string" && val.trim().length > 0)
        return;

      if (!(typeof File !== "undefined" && val instanceof File)) {
        ctx.addIssue({
          code: "custom",
          message: "تصویر بندانگشتی (thumbnail) الزامی است.",
        });
        return;
      }
      if (!validFormats.has(val.type)) {
        ctx.addIssue({
          code: "custom",
          message: "فرمت فایل مورد قبول نمی‌باشد (png, jpg, jpeg).",
        });
      }
      if (val.size > validSize) {
        ctx.addIssue({
          code: "custom",
          message: "حجم تصویر باید کمتر از ۲ مگابایت باشد.",
        });
      }
    }),

    images: z
      .any()
      .transform((val) => {
        if (!val) return [] as Array<File | string>;
        if (val instanceof FileList) return Array.from(val) as File[];
        if (Array.isArray(val)) return val as Array<File | string>;
        return [] as Array<File | string>;
      })
      .superRefine((arr: Array<File | string>, ctx) => {
        if (!isEditingMode && arr.length === 0) {
          ctx.addIssue({
            code: "custom",
            message: "آپلود حداقل یک تصویر الزامی است.",
          });
          return;
        }

        for (const item of arr) {
          if (typeof item === "string") {
            if (!isEditingMode) {
              ctx.addIssue({
                code: "custom",
                message: "ارسال تصویر جدید الزامی است.",
              });
              return;
            }
            if (!item.trim()) {
              ctx.addIssue({
                code: "custom",
                message: "شناسه/آدرس تصویر نامعتبر است.",
              });
              return;
            }
          } else if (typeof File !== "undefined" && item instanceof File) {
            if (!validFormats.has(item.type)) {
              ctx.addIssue({
                code: "custom",
                message: "فرمت یکی از تصاویر مجاز نیست (png, jpg, jpeg).",
              });
            }
            if (item.size > validSize) {
              ctx.addIssue({
                code: "custom",
                message: "حجم هر تصویر باید کمتر از ۲ مگابایت باشد.",
              });
            }
          } else {
            ctx.addIssue({ code: "custom", message: "نوع تصویر نامعتبر است." });
            return;
          }
        }
      }),
  });

export type AddNewProductSchemaType = z.infer<
  ReturnType<typeof addNewProductSchema>
>;
