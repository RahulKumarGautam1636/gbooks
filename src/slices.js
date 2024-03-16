import { createSlice } from '@reduxjs/toolkit';
import qs from 'query-string';                             

// COMPCODE Reducer ---------------------------------------------------------------------------------------------------------
const queryString = qs.parse(window.location.search, { ignoreQueryPrefix: true, decode: false });
const compCode = queryString.CID ? queryString.CID : process.env.REACT_APP_DEFAULT_COMPCODE;
const compCodeSlice = createSlice({
  name: 'COMP_CODE', initialState: compCode,
  reducers: {
    compCodeToggled: (state, action) => { 
      return action.payload;  
    }
  }
})
const { compCodeToggled } = compCodeSlice.actions;
const compCodeReducer = compCodeSlice.reducer;

// Company Info Reducer ---------------------------------------------------------------------------------------------------------
const compSlice = createSlice({
  name: 'MODAL', initialState: {},
  reducers: {
    compToggled: (state, action) => {  
      return action.payload;
    },
  }
})
const { compToggled } = compSlice.actions;
const compReducer = compSlice.reducer;

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

// Loader Reducer ---------------------------------------------------------------------------------------------------------

const loaderSlice = createSlice({
  name: 'LOADING', initialState: false,
  reducers: {
    loaderToggled: (state, action) => { 
      return action.payload;  
    }
  }
})
const { loaderToggled } = loaderSlice.actions;
const loaderReducer = loaderSlice.reducer;

// Login Reducer ---------------------------------------------------------------------------------------------------------

const loginSlice = createSlice({
  name: 'IS_LOGGED_IN', initialState: false,
  reducers: {
    loginToggled: (state, action) => { 
      return action.payload;  
    }
  }
})
const { loginToggled } = loginSlice.actions;
const loginReducer = loginSlice.reducer;

// User Info Reducer ---------------------------------------------------------------------------------------------------------

const userSlice = createSlice({
  name: 'ADD', initialState: {},
  reducers: {
    userToggled: (state, action) => { 
      return action.payload;  
    }
  }
})
const { userToggled } = userSlice.actions;
const userReducer = userSlice.reducer;


export { 
  modalToggled, modalReducer, 
  navToggled, navReducer, 
  isMobileToggled, isMobileReducer,
  sideBarToggled, sideBarReducer,
  loaderToggled, loaderReducer,
  loginToggled, loginReducer,
  userToggled, userReducer,
  compCodeToggled, compCodeReducer,
  compToggled, compReducer
};   

