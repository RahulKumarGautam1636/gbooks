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
  name: 'IS_LOGGED_IN', initialState: true,
  reducers: {
    loginToggled: (state, action) => { 
      return action.payload;  
    }
  }
})
const { loginToggled } = loginSlice.actions;
const loginReducer = loginSlice.reducer;

// User Info Reducer ---------------------------------------------------------------------------------------------------------


export const dummyUser = {
  PartyId: 637288,
  PartyCode: 682977,
  MPartyCode: "500003",
  MPartyCode2: "",
  Name: "Rajib Kar",
  Name2: "",
  LicenceNo: null,
  Address1: "Sealdah",
  Address2: "",
  Address3: "",
  Address4: "",
  City: "",
  Pin: "",
  Email: "",
  PS: "",
  District: "",
  Mobile: "",
  PartyType: 0,
  CreationDate: "2024-02-20T00:00:00",
  Country: 1,
  State: 3,
  RegMob1: "9812345678",
  RegMob2: "",
  StateDesc: "West Bengal",
  PartyTypeDesc: "Customer",
  Parent: 0,
  weight: "",
  height: "",
  Age: 0,
  Gender: 104,
  DoctId: 0,
  RefDoctId: 0,
  RefDoctName: "",
  MarketById: 0,
  MarketByName: "",
  DoctName: "",
  GenderDesc: "Male",
  Salutation: "",
  AppointDate: "0001-01-01T00:00:00",
  AppointStatus: "",
  AppType: "Old",
  AppnNo: "",
  NextAppDate: "0001-01-01T00:00:00",
  NextAppTime: "",
  LastAppDate: "0001-01-01T00:00:00",
  LastAppTime: "",
  Remarks1: "",
  Remarks2: "",
  ServiceStatus: "",
  IsAppConfirmed: "",
  UnderDoctId: 0,
  DeptId: 22491,
  DOB: "0001-01-01T00:00:00",
  Anniversary: "0001-01-01T00:00:00",
  Qualification: "",
  AttachedWith: "",
  EnqId: 0,
  SpecialistId: 0,
  SpecialistDesc: "",
  AdmissionId: 0,
  AdmissionDate: "0001-01-01T00:00:00",
  AdmissionTime: "",
  TranNo: "",
  TokenNo: "",
  TokenNo2: "",
  BedGroupId: 0,
  BedId: 0,
  BedGroupDesc: "",
  BedDesc: "",
  BedInfo: "",
  DischargeDate: "0001-01-01T00:00:00",
  DischargeTime: "",
  IsDischarged: "",
  NextOfKin: "",
  NextOfKinRelation: "",
  NextOfKinPhNo: "",
  DepositAmount: 0,
  Symptoms: "",
  PurposeId: 0,
  PurposeDesc: "",
  ExpectedDays: 0,
  TPA: 0,
  TPADesc: "",
  PackageId: 0,
  PackageDesc: "",
  NextUnderDocId: 0,
  NextUnderDoctName: "",
  NextDeptId: 0,
  AgeMonth: 0,
  LastAutoId: 0,
  NextAutoId: 0,
  CancelReason: "",
  CancelDate: "0001-01-01T00:00:00",
  RefId: "0",
  AgeDay: 0,
  PTYPE: "",
  Sigposition: "",
  PhotoUrl: "",
  PartyCategory: "",
  DeptCategory: "",
  BillDocNo: 0,
  MonthlyIncome: 0,
  MonthlyIncomeRange: "",
  PrescriptionId: 0,
  PrescApprovalStatus: "",
  FatherOrHusbandName: "",
  CompUserId: 0,
  ShipStateCode: 0,
  ShipCountryCode: 0,
  AgeDesc: null,
  Address: "Sealdah    700023",
  StateCode: "19",
  DesignationId: 0,
  Designation: null,
  AgentName: "",
  Type: null,
  MemberId: 0,
  PrescriptionFooter: null,
  Aadhaar: null,
  DeptRemarks: "",
  FinRemarks: "",
  DCRefId: "0",
  InvBillid: 0,
  DepartmentName: "",
  AccSubgroupId: 0,
  AccSubgroupType: null,
  AccSubgroupCollection: null,
  TType: null,
  MemId: 0,
  MemIds: null,
  SubCode: 0,
  DupSubCode: 0,
  Description: null,
  GstInDate: "0001-01-01T00:00:00",
  ParentDesc: null,
  Root: null,
  Curr_Balance: -1300,
  AccCode: null,
  Ledger: null,
  Op_Balance: 0,
  SheetName: null,
  CellPosition: null,
  SheduleName: null,
  CashBank: null,
  EntryMode: null,
  UsubCode: null,
  ParentPkId: null,
  Note: 0,
  LedgerCategory: 0,
  NoteNo: null,
  SlNo: null,
  IsBalSheetShow: null,
  AccCreate: null,
  AccPartyMaster: null,
  Deduction1Ac: 0,
  Deduction2Ac: 0,
  Deduction3Ac: 0,
  Deduction1Percent: 0,
  Deduction2Percent: 0,
  Deduction3Percent: 0,
  BranchId: 0,
  IsDefault: null,
  ParentGroup: null,
  IsPopUp: null,
  GroupCode: null,
  AccruedAcNo: null,
  InterestAcNo: null,
  OpeningAmt: 0,
  TranAmt: 0,
  ClosingAmt: 0,
  AcrudGPcode: null,
  acrudAcDesc: null,
  IntGPcode: null,
  intAcDesc: null,
  TmpAutoId: 0,
  IFSC: null,
  BankBranchName: null,
  RegNo: null,
  SWIFTCODE: null,
  LType: null,
  GroupId: 0,
  MemCnt: 0,
  CostGroupId: 0,
  InsDate: "0001-01-01T00:00:00",
  InsBy: 0,
  ModiDate: "0001-01-01T00:00:00",
  ModiBy: 0,
  Modistatus: null,
  DelDate: "0001-01-01T00:00:00",
  DelBy: 0,
  Delstatus: null,
  CompanyId: 0,
  EncCompanyId: null,
  CompanyName: null,
  CompUserPartyCode: 0,
  CompUserMPartyCode: null,
  LocationId: 0,
  FinYear: 0,
  Remarks: "",
  RegMode: null,
  LocationName: null,
  ExchangeRate: 0,
  INREquivalent: 0,
  ForexSign: null,
  ROUNDOFFHEAD: 0,
  ROUNDOFF: 0,
  RoundOffType: null,
  TermsAndConditions: null,
  BankDetails: null,
  CGSTTAXTYPE: 0,
  SGSTTAXTYPE: 0,
  IGSTTAXTYPE: 0,
  CESSTAXTYPE: 0,
  UTGSTTAXTYPE: 0,
  IsGST: null,
  SGSTPACHEAD: 0,
  CGSTPACHEAD: 0,
  IGSTPACHEAD: 0,
  UTGSTPACHEAD: 0,
  SGSTSUSPACHEAD: 0,
  CGSTSUSPACHEAD: 0,
  IGSTSUSPACHEAD: 0,
  UTGSTSUSPACHEAD: 0,
  SGSTADVACHEAD: 0,
  CGSTADVACHEAD: 0,
  IGSTADVACHEAD: 0,
  UTGSTADVACHEAD: 0,
  CESSADVACHEAD: 0,
  CESSRACHEAD: 0,
  CESSPACHEAD: 0,
  CESSRSUSACHEAD: 0,
  CGST: 0,
  SGST: 0,
  IGST: 0,
  UTGST: 0,
  CESS: 0,
  CCESS: 0,
  ICESS: 0,
  RateCondition: null,
  ConditionalAmt: 0,
  CGSTRATE: 0,
  SGSTRATE: 0,
  IGSTRATE: 0,
  OLDCGSTRATE: 0,
  OLDSGSTRATE: 0,
  OLDIGSTRATE: 0,
  ConditionalCGSTRATE: 0,
  ConditionalSGSTRATE: 0,
  ConditionalIGSTRATE: 0,
  UTGSTRATE: 0,
  CESSRATE: 0,
  SGSTRACHEAD: 0,
  CGSTRACHEAD: 0,
  IGSTRACHEAD: 0,
  UTGSTRACHEAD: 0,
  StockInOutQty: 0,
  VisitNo: null,
  IsProvisionalInv: null,
  EC_GSTIN: null,
  IsReverseCharge: null,
  CurrencySign: null,
  ExportUnder: null,
  VchNoSeries: null,
  TrackingNo2: null,
  TrackingNo3: null,
  TrackingNo4: null,
  TrackingNo5: null,
  TrackingNo6: null,
  NetRateS: 0,
  ServiceStartTime: null,
  ServiceEndTime: null,
  IsCanceled: null,
  CFACTOR_MRP: 0,
  PackSizeId: 0,
  PackSizeDesc: null,
  UHID: null,
  ApprovalStatus: "",
  BillStatus: "N",
  ManufacturingDate: "0001-01-01T00:00:00",
  ExpiryDate: "0001-01-01T00:00:00",
  ERRORCODE: null,
  MODCOUNTER: 0,
  VisitId: 0,
  VisitRefType: null
}



const userSlice = createSlice({
  name: 'ADD', initialState: dummyUser,
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
  compCodeToggled, compCodeReducer
};   

