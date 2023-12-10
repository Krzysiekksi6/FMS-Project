import register from "./register";
import inventory from "./api/inventory";
import auth from "./auth";
import refresh from "./refresh";
import users from "./api/users";
import logout from "./logout";
import products from "./api/products";
import productsCategory from "./api/productsCategory";
import inventoryItem from "./api/inventoryItem";
import dish from "./api/dish";
import diet from "./api/diet";
import dietCategory from "./api/dietCategory";
import shoopingList from "./api/shoppingList";
export const Routes = [
  ...register,
  ...inventory,
  ...inventoryItem,
  ...auth,
  ...refresh,
  ...logout,
  ...users,
  ...products,
  ...productsCategory,
  ...dish,
  ...diet,
  ...dietCategory,
  ...shoopingList
];
