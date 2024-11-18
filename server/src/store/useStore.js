// import { create } from 'zustand';
// import { devtools, persist } from 'zustand/middleware';

// function userStore(set) {
//   return {
//     user: null,
//     role: null,

//     setUser: function (userInformationObj) {
//       set((state) => {
//         return { user: userInformationObj, role: userInformationObj.role };
//       });
//     },

//     logoutUser: function () {
//       set((state) => {
//         return { user: null, role: null };
//       });
//     },
//   };
// }

// const useUserStore = create(devtools(persist(userStore, { name: 'auth-storage' })));

// export default useUserStore;
