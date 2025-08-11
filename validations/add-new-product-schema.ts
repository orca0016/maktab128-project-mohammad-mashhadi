import * as z from "zod";
const validFormats = ["image/png", "image/jpg", "image/jpeg"];
const validSize = 2000000;

export const addNewProductSchema = z.object({
  category: z.string({ error: "لطفا یک دسته بندی برای محصول انتخاب کنید." }),
  subcategory: z.string({
    error: "لطفا یک زیر مجموعه برای محصول انتخاب کنید.",
  }),
  name: z
    .string({ error: "لطفا اسم محصول را وارد کنید " })
    .trim()
    .min(4, { error: "اسم محصول باید بیشتر از ۴ کاراکتر باشد " })
    .max(30, { error: "اسم محصول نمیتواند بیشتر از ۳۰ کاراکتر باشد ." }),
  quantity: z
    .string({ error: "قیمت محصول را وارد کنید " })
    .regex(/^\d+$/, "لطفا یک قیمت درست وارد کنید "),
  brand: z
    .string({ error: "برند محصول را وارد کنید ." })
    .trim()
    .min(2, { error: "اسم برند باید بیشتر از ۲ کاراکتر باشد " })
    .max(10, { error: "اسم برند نمیتواند بیشتر از 1۰ کاراکتر باشد ." }),
  thumbnail: z
    .custom<File>()
    .refine(
      (f) => {
        return Boolean(f);
      },
      { message: "تامنیل مورد نیاز است " }
    )
    .refine(
      (f) => {
        return validFormats.includes(f.type);
      },
      { message: "فرمت فایل مورد قبول نمی باشد (png,jpg,jpeg)" }
    )
    .refine(
      (f) => {
        return f.size <= validSize;
      },
      { message: "عکس باید کم تر از ۲ مگابایت حجم داشته باشد" }
    ),

  images: z
    .custom<File[]>()
    .refine(
      (f) => {
        return Boolean(f);
      },
      { message: "تامنیل مورد نیاز است " }
    )
    .refine(
      (f) => {
        const allFilesValid = f.map((item) => validFormats.includes(item.type));
        if (allFilesValid.includes(false)) return false;

        return true;
      },
      { message: "فرمت فایل مورد قبول نمی باشد (png,jpg,jpeg)" }
    )
    .refine(
      (f) => {
        const allFilesValid = f.map((item) => validSize >= item.size);
        if (allFilesValid.includes(false)) return false;
        return true;
      },
      { message: "عکس ها باید کم تر از ۲ مگابایت حجم داشته باشند" }
    ),
});
export type addNewProductSchemaType = z.infer<typeof addNewProductSchema>;
