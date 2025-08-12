import { AddNewProductSchemaType } from "@/validations/add-new-product-schema";

export const productFormDataBuilder = (data: AddNewProductSchemaType) => {
  const fd = new FormData();
  fd.append("name", data.name);
  fd.append("brand", data.brand);
  fd.append("category", data.category);
  fd.append("subcategory", data.subcategory);
  fd.append("price", data.price);
  fd.append("quantity", data.quantity);
  fd.append("description", data.description);

  if (data.thumbnail instanceof File) {
    fd.append("thumbnail", data.thumbnail);
  }
  if (Array.isArray(data.images)) {
    data.images.forEach((file) => {
      if (file instanceof File) {
        fd.append("images", file);
      }
    });
  }
  return fd
};
