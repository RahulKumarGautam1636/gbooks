import { createSlice } from '@reduxjs/toolkit'

// modal Reducer ---------------------------------------------------------------------------------------------------------

const modals = {                                                  // state of all modals.
    PARTNER_FORM: {status: false, data: ''},
    QUOTE_FORM: {status: false, data: ''},
    FAQ: {status: false, data: ''},
    RETURN_POLICY: {status: false, data: ''},
};

const modalSlice = createSlice({
  name: 'MODAL', initialState: modals,
  reducers: {
    modalToggled: (state, action) => { 
      console.log(action); 
      return {...state, [action.payload.name]: {status: action.payload.status, data: action.payload.data}};
    },
  }
})
const { modalToggled } = modalSlice.actions;
const modalReducer = modalSlice.reducer;

// NAV Reducer ---------------------------------------------------------------------------------------------------------

const navSlice = createSlice({
  name: 'NAV_MENU', initialState: '#/',
  reducers: {
    navToggled: (state, action) => { 
      return action.payload;  
    }
  }
})
const { navToggled } = navSlice.actions;
const navReducer = navSlice.reducer;

// IsMobile Reducer ---------------------------------------------------------------------------------------------------------

const isMobileSlice = createSlice({
  name: 'IS_MOBILE', initialState: false,
  reducers: {
    isMobileToggled: (state, action) => { 
      return action.payload;  
    }
  }
})
const { isMobileToggled } = isMobileSlice.actions;
const isMobileReducer = isMobileSlice.reducer;


// Sidebar Reducer ---------------------------------------------------------------------------------------------------------

const sideBarSlice = createSlice({
  name: 'SIDEBAR_MENU', initialState: false,
  reducers: {
    sideBarToggled: (state, action) => { 
      return action.payload;  
    }
  }
})
const { sideBarToggled } = sideBarSlice.actions;
const sideBarReducer = sideBarSlice.reducer;



export { 
  modalToggled, modalReducer, 
  navToggled, navReducer, 
  isMobileToggled, isMobileReducer,
  sideBarToggled, sideBarReducer
};   