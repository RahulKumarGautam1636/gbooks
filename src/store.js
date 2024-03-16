import { configureStore } from '@reduxjs/toolkit';

// import { modalReducer, navReducer } from './reducers';
import { isMobileReducer, modalReducer, navReducer, sideBarReducer, loaderReducer, loginReducer, userReducer, compCodeReducer, compReducer } from './slices';

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  reducer: {
    modals: modalReducer,
    navMenu: navReducer,
    isMobile: isMobileReducer,
    isSidebarOpen: sideBarReducer,
    isLoading: loaderReducer,
    isLoggedIn: loginReducer,
    user: userReducer,
    compCode: compCodeReducer,
    company: compReducer
  }
})