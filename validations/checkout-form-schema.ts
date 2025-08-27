import * as z from "zod";

export const checkoutFormSchema = z.object({
  firtname: z.string({ error: "نام اجباری است." }).trim(),
  lastname: z.string({ error: "نام خانوادگی اجباری است" }),
  phoneNumber: z.string({ error: "شماره تماس اجباری است" }),
  address: z.string({ error: "ادرس اجباری است" }),
  deliveryDate: z.string({ error: "تاریخ دریافت مرسوله را انتخاب کنید." }),
});
export type checkoutFormSchemaType = z.infer<typeof checkoutFormSchema>;
