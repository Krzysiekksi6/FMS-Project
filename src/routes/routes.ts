import register from "./register";
import auth from "./auth";
import refresh from "./refresh";
import users from "./api/users";
import logout from "./logout";
import products from "./api/products";
import productsCategory from "./api/productsCategory";
export const Routes = [
  ...register,
  ...auth,
  ...refresh,
  ...logout,
  ...users,
  ...products,
  ...productsCategory,
];
