const PaymentEntry = () => {

    return (
        <section className="payment_entry">
            <div className="table-wrapper">     {/* style={{ border: "1px solid #00a9ff", padding: "0.2em 1.2em 1.2em" }} */}
                <table className='basic_table list-table'>
                    <thead>
                        <tr>
                            <th colSpan={2} className="table-heading">
                                Application No. <span style={{ color: "red" }}>23ECE070</span>. Please
                                keep it safe for further prorcess.
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="info">
                            <td>
                                <p>Application No:</p>
                            </td>
                            <td>
                                <h5>23ECE070</h5>
                            </td>
                        </tr>
                        <tr className="info">
                            <td>
                                <p>Course:</p>
                            </td>
                            <td>
                                <h5>Electronics &amp; Communication Engineering</h5>
                            </td>
                        </tr>
                        <tr className="info">
                            <td>
                                <p>Name</p>
                            </td>
                            <td>
                                <h5>AYUSHMAN SHIKDER</h5>
                            </td>
                        </tr>
                        <tr className="info">
                            <td>
                                <p>Email ID:</p>
                            </td>
                            <td>
                                <h5>ayushmansikder2005@gmail.com</h5>
                            </td>
                        </tr>
                        <tr className="info">
                            <td>
                                <p>Zip/Pin code:</p>
                            </td>
                            <td>
                                <h5>700063</h5>
                            </td>
                        </tr>
                        <tr className="info">
                            <td className="mobileNo">
                                <p>Mobile No:</p>
                            </td>
                            <td className="mobileNo">
                                <h5>7639623633</h5>
                            </td>
                        </tr>
                        {/* <tr>
                            <td colSpan={2}></td>
                        </tr> */}
                        <tr className="fees-row">
                            <td className="fees">
                                <h5>Fees Description</h5>
                            </td>
                            <td className="fees" style={{ textAlign: "end" }}>
                                <h5 className="fw-bold">Fees Amount(INR)</h5>
                            </td>
                        </tr>
                        <tr className="fees-row">
                            <td className="fees">
                                <p>Tuition Fees</p>
                            </td>
                            <td className="fees" style={{ textAlign: "end" }}>
                                <h5 className="fw-bold">47,000.00</h5>
                            </td>
                        </tr>
                        <tr className="fees-row">
                            <td className="fees text-wrap" >Total Admission Fees (Rs.)</td>
                            <td className="fees" style={{ textAlign: "end" }}>
                                <h5 className="fw-bold"> 47,000.00</h5>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="paymentMode">
                                    <div className="d-flex gap-4 align-items-center">
                                        <p>Payment Mode:</p>
                                        <h5>
                                            <select name="">
                                                <option value="PAYMENT GATEWAY">PAYMENT GATEWAY</option>
                                            </select>
                                        </h5>
                                    </div>
                                    <div className="d-flex gap-4 align-items-center">
                                        <p>Payment Gateway:</p>
                                        <h5>
                                            <select name="">
                                                <option value="-select-">-Select-</option>
                                                <option value="PAYMENT GATEWAY">State Bank of India</option>
                                            </select>
                                        </h5>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className="d-flex gap-5 align-items-start declaration">
                                    <input type="checkbox" style={{marginTop: '0.5em'}}/>
                                    <p>
                                        I declare that to the best of my knowledge and belief the
                                        information given above are the correct and complete in all respect.
                                        In the event of being found otherwise, I shall abide by the decison
                                        of the institute to summarily reject my application. I also
                                        undertake to make the payment, which is non-refundable and agree to
                                        abide by the rules and regulations framed by the council applicable
                                        to the student admitted.
                                    </p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="py-3">
                                <button className="btn-1" style={{fontSize: '1.1em'}}>SAVE</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot />
                </table>
            </div>
        </section>
    )
}

export default PaymentEntry;

