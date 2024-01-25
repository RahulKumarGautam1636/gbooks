// import { HashLink } from "react-router-hash-link";
import { connect } from "react-redux";
import { handleNumberInputs } from "./utils/utilities";
import { useEffect, useState } from "react";

const loginAction = () => {}
const userAction = () => {}

const Home = ({ handleClose, isLoggedIn, loginAction, userAction, user }) => {

    const [tabActive, setTabActive] = useState('login');
    const [otp, setOTP] = useState({isOpen: false, recievedOTP: null, enteredOTP: '', sent: false, verified: false });
    const [loginData, setLoginData] = useState({ phone: '', password: ''});
    // const [regData, setRegData] = useState({ phone: '', password: ''});

    useEffect(() => {                                                             // mount/unmount working. page resets automatically on re-mount. notes (4).
        if (isLoggedIn) {
            setLoginData({ phone: user.phone, password: user.password });
            // setRegData({ phone: user.phone, password: user.password });
            // setOTP({ ...otp, verified: true });
        } else {
            setLoginData({ phone: '', password: '' });
            // setRegData({ phone: '', password: '' });
            // setOTP({ isOpen: false, recievedOTP: null, enteredOTP: '', sent: false, verified: false });
        }
    },[isLoggedIn, user]);


    // Login form functions.
    const handleLoginForm = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
        // if (isLoggedIn) return;
        // if (loginData.phone.length < 10 || loginData.password.length < 4) return alert('Enter valid phone number and a password of at least 4 characters.');
        // alert('form submitted successfully');
        // userAction('ADD_USER_INFO', {phone: loginData.phone, password: loginData.password});
        // loginAction(true);
    }

    // Registration From functions
    // const handleRegForm = (e) => {
    //     const { name, value } = e.target;
    //     setRegData({ ...regData, [name]: value });
    // }

    // const handleRegFormSubmit = (e) => {
    //     e.preventDefault();
    //     if (isLoggedIn) return;
    //     if (regData.phone.length < 10 || regData.password.length < 4) return alert('Enter valid phone number and a password of at least 4 characters.');
    //     if (!otp.isOpen) {
    //         alert('sending otp 0000');
    //         setOTP({...otp, isOpen: true, sent: true, recievedOTP: '0000'});
    //     } 
    //     if (otp.sent) {
    //         if (otp.recievedOTP !== otp.enteredOTP) return alert('Incorrect OTP.');
    //         alert('form submitted successfully');
    //         setOTP({ ...otp, verified: true });
    //         loginAction(true);
    //         handleClose('LOGIN_MODAL', false); 
    //         userAction('ADD_USER_INFO', {phone: regData.phone, password: regData.password});        
    //     } 
    // }

    return (
        <section className="login-modal h-100">
            <div className="container h-100">
                <div className="login-modal__page">
                    {/* <i className='bx bx-chevrons-left modal-close-btn' onClick={() => handleClose('LOGIN_MODAL', false)}></i> */}
                    <div className="login-modal__page__left">
                        <h2 className="heading-secondary align-center">Welcome Back!</h2>
                    </div>
                    <div className="login-modal__page__right">
                        <h1 className="heading-secondary">Please Login to Continue!</h1>
                        <p>We're glad having you on VIT Educare</p>
                        <div className="form-wrapper">
                            <div className="tab-content">
                                <div className={`tab-pane fade ${tabActive === 'login' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-1">
                                    <form onSubmit={handleLoginSubmit}>
                                        <div className="input__group">
                                            <input onChange={(e) => handleNumberInputs(e, setLoginData)} value={loginData.phone} readOnly={otp.verified} autoComplete="true" type="text" maxLength={10} placeholder="Phone number" name='phone' required/>
                                        </div>
                                        <div className="input__group">
                                            <input onChange={handleLoginForm} value={loginData.password} readOnly={otp.verified} autoComplete="true" type="password" placeholder="Password" name='password' required/>
                                        </div>
                                        <p><i className="bx bxs-help-circle"></i> Forgot your password ?</p>
                                        <button type="submit" className="btn-1">Login</button>
                                    </form>
                                    {/* <div className="login-bottom">
                                        <p>Not a member ?</p>
                                        <button className="btn-1" onClick={() => setTabActive('register')}>Register Now</button>
                                    </div> */}
                                </div>
                                {/* <div className={`tab-pane fade ${tabActive === 'register' && 'show active'}`} role="tabpanel" aria-labelledby="tabFade-2">
                                    <form onSubmit={handleRegFormSubmit}>
                                        <div className="input__group">
                                            <input onChange={(e) => handleNumberInputs(e, setRegData)} value={regData.phone} readOnly={otp.verified} autoComplete="true" type="text" placeholder="Phone number" name="phone" required/>
                                        </div>
                                        <div className="input__group">
                                            <input onChange={handleRegForm} value={regData.password} readOnly={otp.verified} autoComplete="true" type="password" placeholder="Password" name="password" required/>
                                        </div>
                                        {otp.isOpen && <div className="input__group">
                                            <input onChange={(e) => setOTP({...otp, enteredOTP: e.target.value})} autoComplete="false" value={otp.enteredOTP} type="text" placeholder="Enter OTP"/>
                                        </div>}
                                        {!otp.isOpen && <p>You'll receive an OTP</p>}
                                        <button className="btn-1">Submit</button>
                                    </form>
                                    <div className="login-bottom">
                                        <p>Already a member ?</p>
                                        <button className="btn-1" onClick={() => setTabActive('login')}>Login</button>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// export default Home;

const mapStateToHome = (state) => {
    return { isLoggedIn: state.isLoggedIn, user: state.user };
}

export default connect(mapStateToHome, {loginAction, userAction})(Home);