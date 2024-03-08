// import { decrypt } from "./utils/utilities";
// import { useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { loaderToggled, loginToggled, userToggled } from "../slices";
// import { Navigate, useNavigate } from "react-router-dom";

// const Auth2 = ({ children }) => {
    
//     const compCode = useSelector(state => state.compCode);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
    
//     useEffect(() => {
//         function autoLogin() {
//             const savedLoginData = decrypt(sessionStorage.getItem('siteData'));
//             if (savedLoginData && savedLoginData.RegMob1) {
//                 console.log('Logging you in! Please wait.');        
//                 makeLoginRequest({ RegMob1: savedLoginData.RegMob1, UserPassword: savedLoginData.UserPassword });
//             } else {
//                 console.log('run');
//                 navigate('/');
//             }
//         }
//         autoLogin();
//     },[])

//     const makeLoginRequest = async (params) => {
//         dispatch(loaderToggled(true));
//         const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/UserAuth?UN=${params.RegMob1}&UP=${params.UserPassword}&CID=${compCode}`);
//         dispatch(loaderToggled(false));
//         if (res.data.UserId === 0) {
//             alert('Failed to Log you in. Please log in manually');
//             return  <Navigate to="/" />;
//         } else {
//             dispatch(userToggled(res.data));
//             dispatch(loginToggled(true));   
//             // return children
//         }
//     }
// }

// export default Auth2;