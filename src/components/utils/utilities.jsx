import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isMobileToggled } from "../../slices";

export const handleNumberInputs = (e, setStateName) => {
    console.log(e);
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