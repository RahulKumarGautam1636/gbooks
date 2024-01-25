import Home from "./Home";
import Login from "./Login";
import { HashRouter, Route, Routes } from 'react-router-dom';
import PaymentDetails from "./PaymentDetails";
import OnlinePayment from "./OnlinePayment";
import PaymentEntry from "./paymentEntry";
import Header from "./Header";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { IsMobile } from "./utils/utilities";

const App = () => {

  const [offset, setOffset] = useState({ top: 68, left: 0 });

    return (
      <div>
        <HashRouter>
          <Header setOffset={setOffset}/>
          <Sidebar setOffset={setOffset} offset={offset}/>
          <main className="app-container" style={{paddingTop: `${offset.top}px`, paddingLeft: `${offset.left}px`}}>
            <Routes>
              <Route path='/' exact element={<Login/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/paymentDetails' element={<PaymentDetails />}/>
              <Route path='/onlinePayment' element={<OnlinePayment />}/>
              <Route path='/paymentEntry' element={<PaymentEntry />}/>
            </Routes>
          </main>
          <IsMobile/>
        </HashRouter>
      </div>
    )
}

export default App;
