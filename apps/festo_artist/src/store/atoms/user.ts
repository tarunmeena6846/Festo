import { atom } from "recoil";

export const isUserLoggedIn = atom({
  //add these two fields in the rest of the code also so that we can't see
  // sign in page flasghing when we refresh
  key: "isUserLoggedIn",
  default: {
    isLoading: true,
    isAdmin: false,
  },
});
