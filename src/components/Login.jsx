// import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import { JQPicker, MyModal, encrypt, getOtp, getStates, getUrl, handleNumberInputs } from "./utils/utilities";
import { useEffect, useState } from "react";
import { loaderToggled, loginToggled, userToggled } from "../slices";
import axios from 'axios';
// import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const reg = {
    // Salutation: 'Mr',
    // Name: 'Ajeet Bharati',
    // EncCompanyId: '',
    // RegMob1: '7000000000',
    // UserEmail: 'mail@mail.com',
    // Gender: '104',
    // Address: 'address',
    // UserPassword: '1234',
    // CnfPassword: '1234',
    // Address2: 'Address2',
    // State: '',
    // City: 'City',
    // Pin: '123456',    
    // DOB: new Date().toLocaleDateString('fr-CA'),
    // Aadhaar: '123456789456',
    // IsDOBCalculated: 'N',
    // UserType: 'STUDENT',
    // LocationId: '',
    // DeptId: '',

    Salutation: '',
    Name: '',
    EncCompanyId: '',
    RegMob1: '',
    UserEmail: '',
    Gender: '104',
    Address: '',
    UserPassword: '',
    CnfPassword: '',
    Address2: '',
    State: '',
    City: '',
    Pin: '',
    DOB: '',
    Aadhaar: '',
    IsDOBCalculated: 'N',
    UserType: 'STUDENT',
    LocationId: '',
    DeptId: '',
}

const Home = () => {

    const compCode = useSelector(state => state.compCode);
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    // const user = useSelector(state => state.user);
    const [tabActive, setTabActive] = useState('login');
    const [otp, setOTP] = useState({isOpen: false, recievedOTP: null, enteredOTP: '', sent: false, verified: false, phone: ''});
    const [error, setError] = useState({ status: true, message: ''});
    const [loginData, setLoginData] = useState({ RegMob1: '', UserPassword: ''});
    const [regData, setRegData] = useState({...reg, EncCompanyId: compCode});
    const [statesList, setStatesList] = useState([{Description: 'West Bengal', CodeId: 3}]);                       // {Description: 'West Bengal', CodeId: 3}
    const [courseList, setCourseList] = useState([{Description: '', SubCode: ''}]);                                // {Description: 'D. OPT', SubCode: 22491}
    const [locationList, setLocationList] = useState([{LocationName: '', LocationId: ''}]);                        // {LocationName: 'AMRI HOSPITALS LIMITED, DHAKURIA, KOLKATA', LocationId: 1106}
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [forgotPasswordError, setForgotPasswordError] = useState({ status: false, message: "We'll send your password !"});
    const [active, setActive] = useState(true);

    // const state = useSelector(state => state.compCode);

    // useEffect(() => {                                                             // mount/unmount working. page resets automatically on re-mount. notes (4).
    //     if (isLoggedIn) {
    //         setLoginData({ RegMob1: user.RegMob1, UserPassword: user.UserPassword });
    //         // setRegData({ phone: user.phone, password: user.password });
    //         setOTP(pre => ({ ...pre, verified: true }));
    //     } else {
    //         setLoginData({ phone: '', password: '' });
    //         setRegData(reg);
    //         setOTP({ isOpen: false, recievedOTP: null, enteredOTP: '', sent: false, verified: false });
    //     }
    // },[isLoggedIn, user]);

    useEffect(() => {
        const getData = async () => {
            let states = await getUrl('/api/Values/1');
            let locations = await getUrl(`/api/UserReg/GetLocation?CompId=${compCode}&LocationId=0`);
            let courses = await getUrl(`/api/UserReg/GetBusinessUnit?CompId=${compCode}&Type=Procedure`);
            if (!states || !courses || !locations) return;
            states = states.map(i => ({Description: i.Description, CodeId: i.CodeId}));
            locations = locations.map(i => ({LocationName: i.LocationName, LocationId: i.LocationId}));
            courses = courses.map(i => ({Description: i.Description, SubCode: i.SubCode}));
            console.log(states);
            console.log(locations);
            console.log(courses);
            setStatesList(states);
            setLocationList(locations);
            setCourseList(courses);
        }
        getData();
    },[dispatch, compCode])

    const handleLoginForm = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
        if (isLoggedIn) return;
        if (loginData.RegMob1.length < 10 || loginData.UserPassword.length < 4) return alert('Enter valid phone number and a password of at least 4 characters.');
        makeLoginRequest(loginData)
        // userAction('ADD_USER_INFO', {phone: loginData.phone, password: loginData.password});
        // loginAction(true);
    }

    const makeLoginRequest = async (params) => {
        dispatch(loaderToggled(true));
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/UserAuth?UN=${params.RegMob1}&UP=${params.UserPassword}&CID=${compCode}`);
        dispatch(loaderToggled(false));
        if (res.data.UserId === 0) {
            setError({ status: true, message: 'The username or password is incorrect.' });
        } else {
            dispatch(loginToggled(true));
            dispatch(userToggled(res.data));
            let userLoginData = { RegMob1: params.RegMob1, UserPassword: res.data.UserPassword };
            sessionStorage.setItem("siteData", encrypt(userLoginData)); 
            navigate('/dashboard');  
        }
    }

    const handleRegInputs = (e) => {
        const { name, value } = e.target;
        setRegData(pre => ({ ...pre, [name]: value }));
    }

    const handleRegFormSubmit = async (e) => {
        e.preventDefault();
        if (regData.UserPassword !== regData.CnfPassword) return alert('Confirm password did not match the actual password.');
        console.log(regData);
        if (otp.verified) {
            const status = await makeRegisterationRequest(regData);
            if (status) {
                dispatch(loginToggled(true));
                navigate('/dashboard');
            } else {
                alert('An Error Occured, Please try again later.');
            }
        }
    }

    const makeRegisterationRequest = async (params) => {
        if (!params.UserType) return alert('Error, no user type found.');
        try {
            dispatch(loaderToggled(true));
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/UserReg`, params);
            dispatch(loaderToggled(false));
            if (res.data[0] === 'Y') {
                sessionStorage.setItem("siteData", encrypt({ RegMob1: params.RegMob1, UserPassword: params.UserPassword }));
                dispatch(userToggled({ ...params, UserFullName: params.Name, UserId: parseInt(res.data[1]) }));      // received UserId is string type hence converting it to integer because everywhere (received login data) else it's used as integer
                return true;                                                                                         // 'UserId' !== UserId which can cuase wrong output in filtering just like done in getMembersList function.
            }      
        } catch (err) {
            dispatch(loaderToggled(false));
            console.log(err);
            return false;
        } 
    }

    const checkExistingUser = async (phoneNumber) => {
        dispatch(loaderToggled(true));
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/UserReg?UN=${phoneNumber}`);
        dispatch(loaderToggled(false));
        if (res.data === 'Y') {
            setError({status: true, message: 'This number is already registered.'});
            setLoginData(pre => ({ ...pre, RegMob1: phoneNumber }));
            setOTP({isOpen: false, recievedOTP: null, enteredOTP: '', sent: false, verified: false, phone: '' });     // reset otp field if user enters a number that is already registered, this will force user to again pass otp verification.
            setTabActive('login');
            return true;
        } else {
            setError({status: false, message: ''});
            return false;
        }
    }

    const otpFormSubmit = async (e) => {
        e.preventDefault();
        if (otp.phone.length < 10) return alert('Enter valid phone number.');
        const doesUserExist = await checkExistingUser(otp.phone);
        if (doesUserExist) return;
        if (!otp.isOpen && !otp.sent) {
            dispatch(loaderToggled(true));
            const getOpt = await getOtp('Student', otp.phone);
            dispatch(loaderToggled(false));
            if (getOpt) setOTP(pre => ({...pre, isOpen: true, sent: true, recievedOTP: getOpt}));
        }  else if (otp.isOpen && otp.sent) {
            if (otp.recievedOTP !== otp.enteredOTP) return alert('Incorrect OTP.');
            setOTP(pre => ({ ...pre, isOpen: false, verified: true }));
            setRegData(pre => ({...pre, RegMob1: otp.phone}));
        }
    }

    // const resetForms = () => {
    //     setLoginData({ RegMob1: '', UserPassword: ''});
    //     setRegData({...reg, EncCompanyId: compCode});
    //     setOTP({isOpen: false, recievedOTP: null, enteredOTP: '', sent: false, verified: false, phone: ''});
    // }

    const [recoveryNumber, setRecoveryNumber] = useState('');

    const handleForgotPasswordForm = async (e) => {
        e.preventDefault();
        console.log(recoveryNumber);
        dispatch(loaderToggled(true));
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/UserAuth/0?UN=${recoveryNumber}&CID=${compCode}&Type=FP`, {});
        dispatch(loaderToggled(false));
        if (res.data === 'Y') {
          setForgotPasswordError({status: true, message: 'We sent your password to your number.'});
        } else {
          setForgotPasswordError({status: true, message: 'This number is not Registered.'});
        }
    }



    return (
        <section className="login-modal h-100">
            <div className="container h-100">
                <div className="login-modal__page">
                    {/* <i className='bx bx-chevrons-left modal-close-btn' onClick={() => handleClose('LOGIN_MODAL', false)}></i> */}
                    <div className="login-modal__page__left">
                        <h2 className="heading-secondary align-center" onClick={() => setActive(true)}>Welcome Back!</h2>
                    </div>
                    <div className="login-modal__page__right">
                        <nav className="w-100">
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <button className={`nav-link ${tabActive === 'login' && 'active'}`} onClick={() => {setTabActive('login')}} tabIndex="-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{stroke: '#e31d98ab'}}>
                                        <path d="M12 2C9.243 2 7 4.243 7 7v2H6c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-9c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v2H9V7zm9.002 13H13v-2.278c.595-.347 1-.985 1-1.722 0-1.103-.897-2-2-2s-2 .897-2 2c0 .736.405 1.375 1 1.722V20H6v-9h12l.002 9z"></path>
                                    </svg> Login
                                </button>
                                <button className={`nav-link ${tabActive === 'register' && 'active'}`} onClick={() => {setTabActive('register')}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{stroke: '#18b0bb'}}><path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z"></path></svg>
                                    &nbsp;Registration
                                </button>
                            </div>
                        </nav>
                        <div className="tab-content">
                            <div className={`tab-pane fade ${tabActive === 'login' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
                                <div className="form-wrapper">
                                    <h1 className="heading-secondary">Please Login to Continue!</h1>
                                    <p>We're glad having you on VIT Educare</p>
                                    <form className="login-form input-style-1" onSubmit={handleLoginSubmit}>
                                        <div className="input__group">
                                            <input onChange={(e) => handleNumberInputs(e, setLoginData)} value={loginData.RegMob1} autoComplete="true" type="text" maxLength={10} placeholder="Phone number" name='RegMob1' required/>
                                        </div>
                                        <div className="input__group">
                                            <input onChange={handleLoginForm} value={loginData.UserPassword} autoComplete="true" type="password" placeholder="Password" name='UserPassword' required/>
                                        </div>
                                        {error.status && <p style={{textAlign: 'left', color: 'orangered', margin: '0'}}>{error.message}</p>}
                                        <p role="button" onClick={() => setTabActive('forgotPassword')}><i className="bx bxs-help-circle"></i> Forgot your password ?</p>
                                        <button type="submit" className="btn-1">Login</button>
                                    </form>
                                </div>
                            </div>
                            <div className={`tab-pane fade ${tabActive === 'forgotPassword' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
                                <div className="form-wrapper">
                                    <h1 className="heading-secondary">Forgot your Password !!!</h1>
                                    <p>Enter Your Phone Number.</p>
                                    <form className="login-form input-style-1" onSubmit={handleForgotPasswordForm}>
                                        <div className="input__group">
                                            <input onChange={(e) => handleNumberInputs(e, setRecoveryNumber, true)} value={recoveryNumber} autoComplete="true" type="text" maxLength={10} placeholder="Phone number" name='recoveryNumber' required/>
                                        </div>
                                        {forgotPasswordError.status && <p style={{textAlign: 'left', color: 'orangered', margin: '0'}}>{forgotPasswordError.message}</p>}
                                        <p><i className='bx bx-info-circle'></i> We'll send your password.</p>
                                        <button type="submit" className="btn-1">GET PASSWORD</button>
                                        <p className="text-center" role="button" onClick={() => setTabActive('login')}><i className='bx bx-arrow-back'></i> Back to Login.</p>
                                    </form>
                                </div>
                            </div>
                            <div className={`tab-pane fade ${tabActive === 'register' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-2">
                                <div className="form-wrapper">
                                    {!otp.verified &&  <><h1 className="heading-secondary">Please Register!</h1>
                                    <p>We're glad having you on VIT Educare</p>
                                    <form className="otp-form input-style-1" onSubmit={otpFormSubmit}>
                                        <div className="input__group">
                                            <input onChange={(e) => handleNumberInputs(e, setOTP)} value={otp.phone} readOnly={otp.sent} autoComplete="true" type="text" placeholder="Phone number" maxLength={10} name="phone" required/>
                                        </div>
                                        {otp.isOpen && <div className="input__group">
                                            <input onChange={(e) => setOTP({...otp, enteredOTP: e.target.value})} autoComplete="false" value={otp.enteredOTP} type="text" placeholder="Enter OTP"/>
                                        </div>}
                                        {!otp.isOpen && <p>You'll receive an OTP</p>}
                                        <button className="btn-1">Submit</button>
                                    </form></>}
                                    
                                    {otp.verified && <form className="reg-form" onSubmit={handleRegFormSubmit}>
                                        <h4 className="card-title fw-bold">Personal Information :-</h4>
                                        <div className="row gx-2 gy-4">
                                            <div className="col-4">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Salutation</label>
                                                    <select name="Salutation" onChange={handleRegInputs} required tabIndex="1" className="form-control ddlSalutation" value={regData.Salutation}>
                                                        <option value="">-Select-</option>
                                                        <option value="Mr">Mr</option>
                                                        <option value="Ms">Ms</option>
                                                        <option value="Mrs">Mrs</option>
                                                        <option value="Miss">Miss</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-8">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Name</label>
                                                    <input name="Name" onChange={handleRegInputs} className="form-control floating txtname" tabIndex="1" type="text" required value={regData.Name}/>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Gender</label>
                                                    <select name="Gender" onChange={handleRegInputs} required tabIndex="1" className="form-control floating" value={regData.Gender}>
                                                        <option value="">-Select-</option>
                                                        <option value="105">Female</option>
                                                        <option value="104">Male</option>
                                                        <option value="106">Trans Gender</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-3">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>DOB</label>
                                                    {/* <div className="react-datepicker-wrapper">
                                                        <div className="react-datepicker__input-container">
                                                            <input type="text" name="DOB" onChange={handleRegInputs} className="form-control hasDatepicker" value={regData.DOB}/>
                                                        </div>
                                                    </div> */}
                                                    {/* <DatePicker 
                                                        selected={new Date(regData.DOB)}
                                                        onChange={(date) => setRegData(pre => ({ ...pre, DOB: date ? date.toLocaleDateString('fr-CA') : new Date().toLocaleDateString('fr-CA')}))}
                                                        showYearDropdown
                                                        dateFormatCalendar="MMMM"
                                                        yearDropdownItemNumber={100}
                                                        scrollableYearDropdown
                                                        className="form-control"
                                                        dateFormat="dd/MM/yyyy"
                                                    /> */}
                                                    <JQPicker id={'datepicker2'} setState={setRegData} name={'DOB'} customClass={'form-control'}/>
                                                </div>
                                            </div>
                                            {/* <div className="col-2">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Years</label>
                                                    <input name="msUserCreation.Age" className="form-control floating" tabIndex="1" type="text" maxLength="2" value=""/>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label">Months</label>
                                                    <input name="msUserCreation.AgeMonth" className="form-control floating" tabIndex="1" type="text" maxLength="2" value=""/>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label">Days</label>
                                                    <input name="msUserCreation.AgeDay" className="form-control floating" tabIndex="1" type="text" maxLength="2" value=""/>
                                                </div>
                                            </div> */}
                                            <div className="col-6">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>E-Mail</label>
                                                    <input name="UserEmail" onChange={handleRegInputs} className="form-control floating txtuserEmail" tabIndex="1" type="text" autoComplete="off" value={regData.UserEmail}/>
                                                </div>
                                            </div>

                                            {/* <div className="col-4">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label">Qualification</label>
                                                    <input name="Qualification" className="form-control floating" tabIndex="1" type="text" autoComplete="off" value=""/>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label">Reg. No</label>
                                                    <input name="RegNo" className="form-control floating" tabIndex="1" type="text" autoComplete="off" value=""/>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label">Specialization</label>
                                                    <select name="SpecialistId" tabIndex="1" className="form-control floating" autoComplete="off">
                                                        <option value="">-Select-</option>
                                                    </select>
                                                </div>
                                            </div> */}

                                            <div className="col-6">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Mobile Number</label>
                                                    <input name="RegMob1" className="form-control floating txtUserMobile" required readOnly maxLength="10" tabIndex="1" type="text" autoComplete="off" value={regData.RegMob1}/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label">Aadhaar Number</label>
                                                    <input name="Aadhaar" onChange={handleRegInputs} className="form-control floating" maxLength="12" tabIndex="1" type="text" autoComplete="off" value={regData.Aadhaar}/>
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label">Apartment / Flat no. (optional)</label>
                                                    <input name="Address2" onChange={handleRegInputs} tabIndex="1" className="form-control floating" autoComplete="off" value={regData.Address2}/>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Address</label>
                                                    <input name="Address" onChange={handleRegInputs} required className="form-control floating" tabIndex="1" type="text" autoComplete="off" value={regData.Address}/>
                                                </div>
                                            </div>

                                            <div className="col-4">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>State</label>
                                                    <select name="State" onChange={handleRegInputs} required tabIndex="1" className="form-control floating" value={regData.State}>
                                                        <option value="">-Select-</option>
                                                        {statesList.map(item => (<option key={item.CodeId} value={parseInt(item.CodeId)}>{item.Description}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>City</label>
                                                    <input name="City" onChange={handleRegInputs} required className="form-control floating" tabIndex="1" type="text" autoComplete="off" value={regData.City}/>
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Pin Code</label>
                                                    <input name="Pin" onChange={handleRegInputs} required className="form-control floating" tabIndex="1" type="text" maxLength="6" autoComplete="off" value={regData.Pin}/>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Password</label>
                                                    <input name="UserPassword" onChange={handleRegInputs} className="form-control floating" type="password" tabIndex="1" required autoComplete="off" value={regData.UserPassword} style={{boxShadow: '8rem 7rem 35rem 0px #d599ffab'}}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Confirmed Password</label>
                                                    <input name="CnfPassword" onChange={handleRegInputs} className="form-control floating" type="password" tabIndex="1" required autoComplete="off" value={regData.CnfPassword} style={{outline: regData.UserPassword !== regData.CnfPassword && '1px solid orangered'}}/>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-danger text-sm my-2" style={{fontSize:'1em'}}>Enter a strong password to complete Registration and keep it for future logins.</p>
                                        
                                        
                                        <h4 className="card-title fw-bold">Course Information:-</h4>
                                        <div className="row gx-2 gy-4">
                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Branch</label>
                                                    {/* <select name="msUserCreation.LocationId" required tabIndex="1" className="form-control floating ddlLocation"><option value="">-Select-</option><option value="1106">AMRI HOSPITALS LIMITED, DHAKURIA, KOLKATA</option><option value="1107">AMRI HOSPITALS LIMITED, MUKUNDAPUR</option><option value="1108">AMRI HOSPITALS LTD., SALT LAKE, KOLKATA</option><option value="1109">ANANDALOKE MEDICAL CENTRE PVT. LTD, SILIGURI</option><option value="1110">APOLLO GLENEAGLES HOSPITALS, KOLKATA</option><option value="1111">ASHADEEP NURSING HOME &amp; DIAGNOSTIC CENTRE , MURSHIDABAD</option><option value="1112">B P PODDAR &amp; PARVATI DEVI FOUNDATION FOR EDUCATION, NEW ALIPORE, KOLKATA</option><option value="1113">B.C.ROY,PGIPS</option><option value="1114">B.M.BIRLA HEART RESEARCH CENTRE, KOLKATA</option><option value="1115">BANKURA PARAMEDICAL COLLEGE</option><option value="1116">BANKURA SAMMILANI MEDICAL COLLEGE &amp; HOSPITAL, BANKURA</option><option value="1117">BHARAT SEVASHRAM SANGHA HOSPITAL, JOKA, KOLKATA</option><option value="1118">BISHNUPUR PUBLIC INSTITUTE OF MEDICAL SCIENCE(A UNIT OF BISHNUPUR PUBLIC EDUCATION INSTITUTE )</option><option value="1119">BMRC HOSPITALS LTD</option><option value="1120">BURDWAN MEDICAL COLLEGE &amp; HOSPITAL, PURBA BARDHAMAN</option><option value="1121">BURDWAN SCAN CENTRE PVT. LTD, BURDWAN</option><option value="1122">CALCUTTA HEART CLINIC &amp; HOSPITAL, BIDHAN NAGAR, KOLKATA</option><option value="1123">CALCUTTA NATIONAL MEDICAL COLLEGE &amp; HOSPITAL, KOLKATA</option><option value="1124">CENTRAL HOSPITAL, SOUTH EASTERN RAILWAY, GARDEN REACH ROAD, KOLKATA</option><option value="1125">CHARNOCK HOSPITAL, TEGHORIA , KOLKATA</option><option value="1126">CHITTARANJAN NATIONAL CANCER INSTITUTE, KOLKATA</option><option value="1127">CHITTARANJAN NATIONAL CANCER INSTITUTE, RAJARHAT, KOLKATA</option><option value="1128">COLLEGE OF MEDICINE &amp; JNM HOSPITAL, KALYANI, NADIA</option><option value="1129">COLLEGE OF MEDICINE &amp; SAGORE DUTTA HOSPITAL, KOLKATA</option><option value="1130">COOCHBEHAR GOVERNMENT MEDICAL COLLEGE &amp; HOSPITAL</option><option value="1131">DESUN HOSPITAL &amp; HEART INSTITUTE (A UNIT PN MEMORIAL NEUROCENTRE AND RESEARCH INSTITUTE), GOLPARK, KOLKATA</option><option value="1132">DESUN HOSPITAL, SILIGURI</option><option value="1133">DIAMOND HARBOUR GOVT. MEDICAL COLLEGE &amp; HOSPITAL</option><option value="1134">DISHA PARAMEDICAL INSTITUTE, BISHNUPUR</option><option value="1135">DISHARI HEALTH CARE, RAGHUNATHGANJ, MURSHIDABAD</option><option value="1136">DISHARI HEALTH POINT PVT. LTD, MALDA</option><option value="1137">EAST WEST EDUCATION INSTITUTE OF PARAMEDICAL AND ALLIED HEALTH SCIENCES</option><option value="1138">ESI HOSPITAL, ASANSOL</option><option value="1139">ESI HOSPITAL, KAMARHATI, KOLKATA</option><option value="1140">ESI HOSPITAL, MANICKTALA, KOLKATA</option><option value="1141">ESI HOSPITAL, SEALDAH, KOLKATA</option><option value="1142">EYE CARE &amp; RESEARCH CENTRE , KOLKATA</option><option value="1143">FORTIS HOSPITAL &amp; KIDNEY INSTITUTE, RASH BEHARI AVENUE, KOLKATA</option><option value="1144">FORTIS HOSPITALS LTD., ANANDAPUR, KOLKATA</option><option value="1145">GD HOSPITAL &amp; DIABETES INSTITUTE , KOLKATA</option><option value="1146">GENESIS HOSPITAL-EAST INDIA HEALTHCARE PVT. LTD., KOLKATA</option><option value="1147">GENEX HEALTHCARE INSTITUTE</option><option value="1148">GOURI DEVI INSTITUTE OF MEDICAL SCIENCES &amp; HOSPITAL</option><option value="1149">HALDIA INSTITUTE OF HEALTH SCIENCES, HALDIA</option><option value="1150">HEALTHWORLD HOSPITALS (A UNIT OF PARASHMANI MEDICAL CENTRE PVT. LTD.)</option><option value="1151">HLG MEMORIAL HOSPITAL, ASANSOL</option><option value="1105">HO</option><option value="1152">ILS HOSPITALS, DUM DUM, KOLKATA</option><option value="1153">INSTITUTE OF CHILD HEALTH, KOLKATA</option><option value="1154">INSTITUTE OF NEUROSCIENCES, KOLKATA</option><option value="1155">INSTITUTE OF POST GRADUATE MEDICAL EDUCATION &amp; RESEARCH, KOLKATA</option><option value="1156">IQ CITY MEDICAL COLLEGE , DURGAPUR</option><option value="1157">ISLAMIA HOSPITAL, INSTITUTE OF PARA MEDICAL STUDIES, KOLKATA</option><option value="1158">JAGANNATH GUPTA INSTITUTE OF MEDICAL SCIENCES &amp; HOSPITAL, BUDGE BUDGE, KOLKATA</option><option value="1159">JR MEDICAL EDUCATION FOUNDATION, RAIGANJ, UTTAR DINAJPUR</option><option value="1160">KALYANI INSTITUTE OF MEDICAL SCIENCES, ALISHA, PURBA BURDWAN</option><option value="1161">KASTURI DAS MEMORIAL SUPERSPECIALITY HOSPITAL, MAHESHTALA, KOLKATA</option><option value="1162">KASTURI MEDICAL CENTRE PVT. LTD., THAKURPUKUR, KOLKATA</option><option value="1163">KOLKATA PORT TRUST CENTENARY HOSPITAL, KOLKATA</option><option value="1164">KOTHARI MEDICAL CENTRE, KOLKATA</option><option value="1165">KPC MEDICAL COLLEGE &amp; HOSPITAL, JADAVPUR, KOLKATA</option><option value="1166">LIONS CLUB OF JAMALPUR WELFARE TRUST</option><option value="1167">M.R.BANGUR HOSPITAL, TOLLYGUNGE, KOLKATA</option><option value="1168">MA SARADA SWANIRVAR KENDRA(A UNIT OF RAMAKRISHNA MATH, BAGHBAZAR)</option><option value="1169">MALDA MEDICAL COLLEGE &amp; HOSPITAL, MALDA</option><option value="1170">MEDICA SUPERSPECIALTY HOSPITAL, KOLKATA</option><option value="1171">MEDICAL COLLEGE &amp; HOSPITAL, KOLKATA</option><option value="1172">MEDINOVA DIAGNOSTIC SERVICES LIMITED</option><option value="1173">MEDITECH HOSPITAL, NAWABHAT, PURBA BARDHAMAN</option><option value="1174">MIDNAPORE MEDICAL COLLEGE &amp; HOSPITAL, PASCHIM MEDINIPUR</option><option value="1175">MURSHIDABAD MEDICAL COLLEGE &amp; HOSPITAL, MURSHIDABAD</option><option value="1176">NARAYANA SUPERSPECIALITY HOSPITAL, HOWRAH</option><option value="1177">NATIONAL COUNCIL OF MEDICAL AND PARAMEDICAL SCIENCES</option><option value="1178">NEHRU MEMORIAL TECHNO GLOBAL HOSPITAL</option><option value="1179">NEOTIA GETWEL HEALTHCARE CENTRE, SILIGURI</option><option value="1180">NETAJI EYE HOSPITAL, UNIT OF SRI SRI BIJOYKRISHNA ASHRAM RELIEF SOCIETY</option><option value="1181">NETAJI SUBHAS CHANDRA BOSE CANCER HOSPITAL</option><option value="1182">NETRAJYOTI EYE HOSPITAL, RANAGHAT</option><option value="1183">NIBEDITA HEALTH CARE (A UNIT OF GANGAPADA SUPER SPECIALITY HOSPITAL PVT. LTD.), BERHAMPORE, MURSHIDABAD</option><option value="1184">NIBEDITA HEALTH CARE, BAGMARA, JALANGI, MURSHIDABAD</option><option value="1185">NIL RATAN SIRCAR MEDICAL COLLEGE &amp; HOSPITAL, KOLKATA</option><option value="1186">NORBE MEDICARE PRIVATE LIMITED, SAHAPUR, MALDA</option><option value="1187">NORTH BENGAL MEDICAL COLLEGE &amp; HOSPITAL, DARJEELING</option><option value="1188">PEERLESS HOSPITEX HOSPITAL AND RESEARCH CENTER, KOLKATA</option><option value="1189">PURULIA GOVERNMENT MEDICAL COLLEGE &amp; HOSPITAL</option><option value="1190">R.G.KAR MEDICAL COLLEGE &amp; HOSPITAL, KOLKATA</option><option value="1191">RABINDRANATH TAGORE INTERNATIONAL INSTITUTE OF CARDIAC SCIENCES, KOLKATA</option><option value="1192">RAIGANJ GOVERNMENT MEDICAL COLLEGE &amp; HOSPITAL</option><option value="1193">RAMAKRISHNA MISSION ASHRAMA, SARGACHI, MURSHIDABAD</option><option value="1194">RAMAKRISHNA MISSION SEVA PRATISHTHAN : VIVEKANANDA INSTITUTE OF MEDICAL SCIENCES, KOLKATA</option><option value="1195">RAMAKRISHNA SARADA MISSION ASRAM NETRALAYA , HALDIA, PURBA MEDINIPUR</option><option value="1196">RAMPURHAT GOVERNMENT MEDICAL COLLEGE</option><option value="1197">RED PLUS SOCIETY, KOLKATA</option><option value="1198">REDDY HEALTH CARE PVT LTD., SILIGURI</option><option value="1199">REGIONAL INSTITUTE OF OPHTHALMOLOGY: MEDICAL COLLEGE, KOLKATA</option><option value="1200">RENUKA EYE INSTITUTE, BARASAT, KOLKATA</option><option value="1201">RUBY GENERAL HOSPITAL LTD., KASBA GOLPARK, KOLKATA</option><option value="1202">SAHID KHUDIRAM BOSE HOSPITAL, RATHTALA, BELGHARIA, KOLKATA</option><option value="1203">SAMAJKALYAN PARAMEDICAL COLLEGE, EGRA, PURBA MEDINIPUR</option><option value="1204">SANJIBAN HOSPITAL, FULESWAR, HOWRAH</option><option value="1205">SANTINIKETAN INSTITUTE OF ALLIED HEALTH SCIENCE</option><option value="1206">SAROJ GUPTA CANCER CENTRE &amp; RESEARCH INSTITUTE, THAKURPUKUR, KOLKATA</option><option value="1207">SEVAYATAN SCHOOL OF MEDICAL TECHNOLOGY, SINGUR, HOOGHLY</option><option value="1208">SHARANYA MULTISPECIALTY HOSPITAL, PURBA BARDHAMAN</option><option value="1209">SILIGURI GREATER LIONS EYE HOSPITAL, SILIGURI</option><option value="1210">SONOSCAN EDUCATIONAL INSTITUTE, MALDA</option><option value="1211">SRI RAMKRISHNA INSTITUTE OF MEDICAL SCIENCES &amp; SANAKA HOSPITAL, DURGAPUR</option><option value="1212">SRI SARADA NETRALAYA EYE UNIT OF SARADA SEVA SANGHA</option><option value="1213">SUNAYAN ADVANCED EYE INSTITUTE, TAMLUK, PURBA MEDINIPUR</option><option value="1214">SUNETRA FAMILY EYE CARE CENTRE</option><option value="1215">SURAKSHA DIAGNOSTIC PVT LTD, NEWTOWN, KOLKATA</option><option value="1216">SURAKSHA DIAGNOSTIC PVT. LTD., KHARDAH, 24 PARGANAS (NORTH)</option><option value="1217">SUSRUT EYE FOUNDATION &amp; RESEARCH CENTRE, BERHAMPORE</option><option value="1218">SUSRUT EYE FOUNDATION &amp; RESEARCH CENTRE, KOLKATA</option><option value="1219">TATA MEDICAL CENTER, RAJARHAT, KOLKATA</option><option value="1220">THE CALCUTTA MEDICAL RESEARCH INSTITUTE, KOLKATA</option><option value="1221">THE INFECTIOUS DISEASES AND BELIAGHATA GENERAL HOSPITAL</option><option value="1222">U.S INSTITUTE OF MEDICAL TECHNOLOGY, EDUCATION &amp; RESEARCH, NAGER BAZAR, KOLKATA</option><option value="1223">VIVEKANANDA MISSION ASRAM, NETRA NIRAMAY NIKETAN [EXTN], CHANDI, 24 PARGANAS (SOUTH)</option><option value="1224">VIVEKANANDA MISSION ASRAM: INSTITUTE OF OPHTHALMIC TRAINING, HALDIA</option><option value="1225">WOODLANDS MULTISPECIALITY HOSPITAL LTD.</option><option value="1226">ZENITH SUPER SPECIALIST HOSPITAL (A UNIT OF JYOTISHMAN MULTI DISCIPLINARY HOSPITAL PVT. LTD.), RATHTALA, BELGHORIA</option></select> */}

                                                    <select name="LocationId" onChange={handleRegInputs} required tabIndex="1" className="form-control floating" value={regData.LocationId}>
                                                        <option value="">-Select-</option>
                                                        {locationList.map(item => (<option key={item.LocationId} value={parseInt(item.LocationId)}>{item.LocationName}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group form-focus focused">
                                                    <label className="focus-label"><b className="text-danger">* </b>Course</label>
                                                    {/* <select name="msUserCreation.DepartmentId" required tabIndex="1" className="form-control floating ddlCourse"><option value="">-Select-</option><option value="22491">D. OPT</option><option value="22492">DCCT</option><option value="22493">DCLT</option><option value="22494">DDCT</option><option value="22495">DIALYSIS TECHNICIAN</option><option value="22496">DMLT (TECH)</option><option value="22497">DNEP</option><option value="22498">DOTT</option><option value="22499">DPFT</option><option value="22500">DPT</option><option value="22501">DRD (TECH)</option><option value="22502">DRT (TECH)</option><option value="22503">ECG TECHNICIAN</option><option value="22504">DPharm</option></select> */}

                                                    <select name="DeptId" onChange={handleRegInputs} required tabIndex="1" className="form-control floating" value={regData.DeptId}>
                                                        <option value="">-Select-</option>
                                                        {courseList.map(item => (<option key={item.SubCode} value={parseInt(item.SubCode)}>{item.Description}</option>))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn-1" type="submit" tabIndex="1">Register</button>
                                    </form>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* {active && <MyModal handleClose={setActive}/>} */}
        </section>
    )
}

export default Home;

// const mapStateToHome = (state) => {
//     return { isLoggedIn: state.isLoggedIn, user: state.user };
// }

// export default connect(mapStateToHome, {loginAction, userAction})(Home);