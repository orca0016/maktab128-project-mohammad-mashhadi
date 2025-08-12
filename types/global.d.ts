interface IResponseUserData {
  status: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  data: {
    user: {
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
    };
  };
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
