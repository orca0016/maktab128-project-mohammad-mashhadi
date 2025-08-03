import * as z from "zod";

export const loginFormSchema = z.object({
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
});
export type loginFormSchemaType = z.infer<typeof loginFormSchema>;