import { configureStore } from '@reduxjs/toolkit';

// import { modalReducer, navReducer } from './reducers';
import { isMobileReducer, modalReducer, navReducer, sideBarReducer } from './slices';

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  reducer: {
    modals: modalReducer,
    navMenu: navReducer,
    isMobile: isMobileReducer,
    isSidebarOpen: sideBarReducer
  }
})