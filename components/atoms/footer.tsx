import Link from "next/link";
import LogoIcon from "./logo-icon";

const Footer = () => {
  return (
    <footer  className="border-t  border-[#E9ECEE] dark:border-[#2D353C] shadow  ">
      <div className="grid grid-cols-3 w-full h-full gap-8 md:gap-2 px-8 py-10">
        <div className="col-span-3 sm:col-span-1 lg:col-span-1">
          <h3 className="text-3xl">لینک‌های سریع</h3>
          <ul>
            <li>
              <Link href="/">صفحه اصلی</Link>
            </li>
            <li>
              <Link href="/products">محصولات</Link>
            </li>
            <li>
              <p>درباره ما</p>
            </li>
            <li>
              <p>تماس با ما</p>
            </li>
            <li>
              <p>سوالات متداول</p>
            </li>
          </ul>
        </div>
        <div className="col-span-3 sm:col-span-1 lg:col-span-1">
          <h3 className="text-3xl">ما را دنبال کنید</h3>
          <ul className="social-media">
            <li>
              <p>فیسبوک</p>
            </li>
            <li>
              <p>توییتر</p>
            </li>
            <li>
              <p>اینستاگرام</p>
            </li>
            <li>
              <p>لینکدین</p>
            </li>
          </ul>
        </div>
        <div className="col-span-3 sm:col-span-3 md:col-span-1 lg:col-span-1">
          <h3 className="text-3xl flex gap-3">تماس با ما <span className="w-8"><LogoIcon/></span></h3>
          <p>آدرس: تهران، خیابان ولیعصر، پلاک 123</p>
          <p>تلفن: 021-12345678</p>
          <p>ایمیل: info@minimalm.com</p>
          <p>ساعات کاری: شنبه تا پنجشنبه، 9:00 تا 18:00</p>
        </div>
      </div>
      <div className="flex flex-col text-center md:text-right py-3 md:flex-row justify-around mt-10 border-t text-[#E9ECEE] dark:text-[#2D353C] border-[#E9ECEE] dark:border-[#2D353C]">
        <div className="space-x-4 ">
            <span>قوانین سرویس </span>
            <span>مرکز کمک </span>
        </div>
        <div>تمام حقوق محفوظ است ©</div>
      </div>
    </footer>
  );
};

export default Footer;
