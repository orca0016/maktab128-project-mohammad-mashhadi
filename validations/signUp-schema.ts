import * as z from "zod";

export const signUpFormSchema = z.object({
  username: z
    .string({ error: "نام کاربری اجباری است." })
    .trim()
    .min(4, { error: "حداقل طول نام کاربری ۴ کاراکتر است ." })
    .max(10, { error: "حداکثر طول نام کاربری ۱۰ کاراکتر است." }),
  password: z
    .string({ error: "رمز عبور مورد نیاز است ." })
    .trim()
    .min(6, { error: "رمز عبور باید بیشتر از ۶ کاراکتر باشد ." })
    .max(14, { error: "حداکثر طول رمز عبور ۱۴ کاراکتر است ." }),
  firstname: z
    .string({ error: "اسم   اجباری است." })
    .trim()
    .min(2, { error: "حداقل طول اسم  ۲ کاراکتر است ." })
    .max(20, { error: "حداکثر طول اسم  ۲۰ کاراکتر است." }),
  lastname: z
    .string({ error: "نام خانوادگی  اجباری است." })
    .trim()
    .min(5, { error: "حداقل طول  نام خانوادگی ۵ کاراکتر است ." })
    .max(20, { error: "حداکثر طول نام خانوادگی ۲۰ کاراکتر است." }),
  phoneNumber: z
    .string({ error: "شماره تلفن اجباری است " })
    .refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value), {
      error: "لطفا یک شماره تلفن واقعی وارد کنید",
    }),
  address: z
    .string({ error: "ادرس الزامی است ." })
    .trim()
    .min(10, { error: "حداقل طول ادرس شما باید ۱۰ کاراکتر باشد ." })
    .max(50, { error: "حداکثر طول  ادرس شما باید ۵۰ کاراکتر باشد ." }),
});
export type signUpFormSchemaType = z.infer<typeof signUpFormSchema>;
