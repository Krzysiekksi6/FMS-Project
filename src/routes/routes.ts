import register from "./register";
import inventory from "./api/inventory";
import auth from "./auth";
import refresh from "./refresh";
import users from "./api/users";
import logout from "./logout";
import products from "./api/products";
import productsCategory from "./api/productsCategory";
export const Routes = [
  ...register,
  ...inventory,
  ...auth,
  ...refresh,
  ...logout,
  ...users,
  ...products,
  ...productsCategory,
];
