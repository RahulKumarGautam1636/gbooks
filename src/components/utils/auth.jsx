// import { connect } from "react-redux";
import { decrypt } from "./utilities";
import { useEffect } from "react";
// import { loaderAction, loginAction, userAction } from "../../actions";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loaderToggled, loginToggled, userToggled } from "../../slices";

const Auth = () => {

    const compCode = useSelector(state => state.compCode);
    const dispatch = useDispatch();

    useEffect(() => {
        function autoLogin() {
            const savedLoginData = decrypt(sessionStorage.getItem('siteData'));
            if (savedLoginData && savedLoginData.RegMob1) {
                console.log('Logging you in! Please wait.');        
                makeLoginRequest({ RegMob1: savedLoginData.RegMob1, UserPassword: savedLoginData.UserPassword });
            } 
        }
        autoLogin();
    },[])

    const makeLoginRequest = async (params) => {
        dispatch(loaderToggled(true));
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/UserAuth?UN=${params.RegMob1}&UP=${params.UserPassword}&CID=${compCode}`);
        dispatch(loaderToggled(false));
        if (res.data.UserId === 0) {
            alert('Failed to Log you in. Please log in manually');
        } else {
            dispatch(userToggled(res.data));
            dispatch(loginToggled(true));
            // let userLoginData = { RegMob1: params.RegMob1, password: res.data.UserPassword };
            // localStorage.setItem("vitLoginData", encrypt(userLoginData));    
        }
    }
}

export default Auth;

// const mapStateToAuth = (state) => { 
//     return { };
// }

// export default connect(mapStateToAuth, {loaderAction, loginAction, userAction})(Auth);