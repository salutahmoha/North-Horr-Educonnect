import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

function userStore(set) {
  return {
    user: null,
    role: null,
    userId: null,

    setUser: function (userInformationObj) {
      console.log("Setting user information:", userInformationObj); // Debug log
      set({
        user: userInformationObj,
        role: userInformationObj.role,
        userId: userInformationObj.id,
      });
    },

    logoutUser: function () {
      set({ user: null, role: null, userId: null });
    },
  };
}

const useUserStore = create(devtools(persist(userStore, { name: "auth-storage" })));

export default useUserStore;
