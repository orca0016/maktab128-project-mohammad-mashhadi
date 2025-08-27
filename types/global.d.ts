interface IResponseUserData {
  status: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  data: { user: IUserData };
}
interface IUserData {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}
interface IResponseCategoryData {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    categories: ICategory[];
  };
}

interface ICategory {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

interface IResponseSubCategory {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    subcategories: ISubCategory[];
  };
}

interface ISubCategory {
  category: string;
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}
interface IAuthorizedUser {
  id: string;
  role?: string;
}

interface IResponseProduct {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    products: IProduct[];
  };
}
interface IProduct {
  rating: {
    rate: number;
    count: number;
  };
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: [string];
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

interface IResponseSingleProduct {
  status: string;
  data: {
    product: ISingleProduct;
  };
}
interface ISingleProduct {
  rating: {
    rate: number;
    count: number;
  };
  _id: string;
  category: {
    _id: string;
    name: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  subcategory: {
    _id: string;
    category: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    slugname: string;
    __v: number;
  };
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

interface IResponseOrders {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    orders: IOrder[];
  };
}
interface IOrder {
  _id: string;
  user: string;
  products: Array<{
    product: string;
    count: number;
    _id: string;
  }>;
  totalPrice: number;
  deliveryDate: string;
  deliveryStatus: false;
  createdAt: string;
  updatedAt: string;
  payed:boolean
}

interface IResponseUserList {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    users: IUserData[];
  };
}

interface IResponseSingleOrder {
  status: string;
  data: {
    order: {
      _id: string;
      user: IUserData;
      products: Array<{
        product: IProduct;
        count: number;
        _id: string;
      }>;
      totalPrice: number;
      deliveryDate: string;
      deliveryStatus: boolean;
      createdAt: string;
      updatedAt: string;
      __v: number;
      payed:boolean
    };
  };
}

interface IResponseSingleCategory {
  status: string;
  data: {
    category: ISingleCategory;
  };
}
interface ISingleCategory {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
  __v: number;
}

interface IResponseSingleUser {
  status: string;
  data: {
    user: ISingleUser;
  };
}
interface ISingleUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
