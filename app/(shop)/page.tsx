import SliderLandingPage from "@/components/molecules/slider-landing-page";
import LandingCategoriesSection from "@/components/ui/landing/categories";
import FeaturedProduct from "@/components/ui/landing/featured-products";
import PopularReviews from "@/components/ui/landing/popular-reviews";
import SuggestionsProducts from "@/components/ui/landing/suggestion-products";
import TopCategories from "@/components/ui/landing/top-categories";

export default async function Home() {
  return (
    <div className=" min-h-[140vh] ">
      <SliderLandingPage />
      <LandingCategoriesSection />
      <SuggestionsProducts
        title="بهترین لپ تاپ های بازار"
        category="64d712001000000000000002"
      />
      <FeaturedProduct
        title=" پرفروش ترین  هدفون ها"
        category="64d712001000000000000004"
      />
      <SuggestionsProducts
        title="کنسول بازی "
        category="64d712001000000000000006"
      />
      <TopCategories/>
      <PopularReviews />
      
    </div>
  );
}
