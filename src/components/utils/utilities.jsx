import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isMobileToggled } from "../../slices";
import axios from "axios";
import CryptoJS from 'crypto-js';
// import {useSelector} from "react-redux";
// import {Navigate, useLocation} from "react-router-dom";

export const handleNumberInputs = (e, setStateName) => {
    const {name, value} = e.target;
    const re = /^[0-9\b]+$/;
    if (value === '' || re.test(value)) {
      setStateName(preValue => {
          return {...preValue, [name]: value};
      });
    }
}

export const IsMobile = () => {                                             // Determines if device is mobile or desktop.

  const dispatch = useDispatch();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    dispatch(isMobileToggled(mediaQuery.matches));
    const handleMediaQueryChange = (e) => {
      dispatch(isMobileToggled(e.matches));
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  return;
}

export const getOtp = async (name, phone) => {
  try {
      const res = await axios.get(`https://myapps.gsterpsoft.com/api/UserReg/0`, { params: { name: name, mob: phone } });
      if (res.status === 200) {
        return res.data;
      }
  } catch (error) {
      alert('An Error Occured, Try again later.');
      return false;            
  }
  // return '0000';
}

export const GlobalLoader = () => {
  return (
    <div className="preloader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export const encrypt = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();

export const decrypt = (data) => {
  if (!data) return false;
  if (data.length > 200) return false;
  var bytes  = CryptoJS.AES.decrypt(data, process.env.REACT_APP_SECRET_KEY);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

export const logOut = (navigate) => {
  navigate('/');
  sessionStorage.removeItem('siteData');
  window.location.reload();
}

// const ProtectedRoute = ({children}) => {
//   const isLoggedIn = useSelector((state) => state.isLoggedIn);
//   let location = useLocation();
//   if(!isLoggedIn) {
//       return <Navigate to="/" state={{from: location}} replace />       // changes location when rendered.
//   }
//   return children;
// };

// export default ProtectedRoute;

// export const getUrl = async (url) => {
//   try {
//     const res = await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
//     if (res.status === 200) {
//       return res.data;
//     }    
//   } catch (error) {
//     alert(error);
//     return false;
//   }
// }

export async function getUrl(url) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}${url}`);
    if (res.status === 200) {
      return res.data;
    }    
  } catch (error) {
    console.log(error);
    alert('An error occured, Please try again later !');
    return false;
  }
}

