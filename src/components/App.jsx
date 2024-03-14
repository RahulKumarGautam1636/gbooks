import Dashboard from "./Dashboard";
import Login from "./Login";
import { HashRouter, Route, Routes } from 'react-router-dom';
import PaymentEntry from "./paymentEntry";
import Header from "./Header";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { GlobalLoader, IsMobile } from "./utils/utilities";
import { useSelector } from "react-redux";
import Auth from "./utils/auth";
import PaymentHistory from "./PaymentHistory";
import ManageServices from "./ManageServices";

const App = () => {

  const [offset, setOffset] = useState({ top: 68, left: 0 });

  const isLoading = useSelector(state => state.isLoading);

    return (
      <div>
        {isLoading && <GlobalLoader/>}
        <HashRouter>
          <Auth/>
          <Header setOffset={setOffset}/>
          <Sidebar setOffset={setOffset} offset={offset}/>
          <main className="app-container" style={{paddingTop: `${offset.top}px`, paddingLeft: `${offset.left}px`}}>
            <Routes>
              <Route path='/' exact element={<Login/>}/>
                {/* <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/> */}
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/paymentHistory' element={<PaymentHistory />}/>
                <Route path='/manageServices' element={<ManageServices />}/>
                <Route path='/paymentEntry/:orderId/:billType' element={<PaymentEntry />}/>
            </Routes>
          </main>
          <IsMobile/>
        </HashRouter>
      </div>
    )
}

export default App;
