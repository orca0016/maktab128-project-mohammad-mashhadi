import * as z from "zod";
const strongPasswordSchema = z
  .string({error:'رمز عبور را وارد کنید '})
  .min(8, "حداقل طول رمز ورود باید ۸ کاراکتر باشد .")
  .regex(/[A-Z]/, "رمز ورود باید یک حرف بزرگ انگلیسی داشته باشد ")
  .regex(/[a-z]/, "رمز ورود باید حداقل یک حرف کوچک انگلیسی داشته باشد .")
  .regex(/[0-9]/, "رمز ورود باید شامل عدد باشد")
  .regex(/[^A-Za-z0-9]/, "رمز ورود باید حداقل شامل یک حرف خاص باشد .($#@%.)");
export const loginFormSchema = z.object({
  username: z
    .string({ error: "نام کاربری اجباری است." })
    .trim()
    .min(4, { error: "حداقل طول نام کاربری ۴ کاراکتر است ." })
    .max(10, { error: "حداکثر طول نام کاربری ۱۰ کاراکتر است." }),
  password: strongPasswordSchema,
});
export type loginFormSchemaType = z.infer<typeof loginFormSchema>;
