import SidebarProducts from "@/components/atoms/sidebar-products";
import ProductsListGrid from "@/components/ui/products/products-list-grid";

const ProductsPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl w-full font-semibold mb-10 text-center md:text-right">محصولات</h1>
      <div className=" grid  grid-cols-3  min-h-[70vh]">
        <aside className="col-span-3 md:col-span-1 px-10 py-6 ">
          <SidebarProducts />
        </aside>
        <section className="px-10 md:px-0 col-span-3 md:col-span-2 ">
          <ProductsListGrid/>
        </section>
      </div>
    </div>
  );
};

export default ProductsPage;
