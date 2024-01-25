const PaymentDetails = () => {
    return (
        <section className="payment-details">
            <div className="row h-100">
                <div className="col-12">
                    <h2 className="heading-primary"><i className="bx bxs-notepad icon-badge" style={{'--icon-bg': '#43f1ff', '--icon-border': '#00a1ed', fontSize: '0.9em', padding: '0.25em', color: '#5548ff'}}></i> Fees Payment Details</h2>
                    <div className="table-wrapper overflow-auto">
                        <table className="table basic_table list-table parent-table">
                            <thead>
                                <tr>
                                    <th scope="col"># &nbsp;</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Enrollment/Roll No</th>
                                    <th scope="col">Course</th>
                                    <th scope="col">Course Fees</th>
                                    <th scope="col">Caution</th>
                                    <th scope="col">Add/Less</th>
                                    <th scope="col">Granted</th>
                                    <th scope="col">Received</th>
                                    <th scope="col">Current Due</th>
                                    <th scope="col">Total Course Due</th>
                                    <th scope="col">Refund</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Ayushman Sikder</td>
                                    <td>23ECE070/23ECE070</td>
                                    <td>Electronics & Communication Engineering</td>
                                    <td>394,700.00</td>
                                    <td>12,000.00</td>
                                    <td>0.00</td>
                                    <td>406,700.00</td>
                                    <td>114,700.00</td>
                                    <td>0.00</td>
                                    <td>292,000.00</td>
                                    <td>0.00</td>
                                </tr>
                                <tr>
                                    <td colSpan={12} style={{padding: '1em 0.7em'}}>
                                        <div className="table-wrapper">
                                            <table className="table basic_table list-table mb-0">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Semester</th>
                                                        <th scope="col">Fee</th>
                                                        <th scope="col">Due Date</th>
                                                        <th scope="col">Voucher No.</th>
                                                        <th scope="col">Challan No.</th>
                                                        <th scope="col">Instrmt. No.</th>
                                                        <th scope="col">Challan Date</th>
                                                        <th scope="col">Payment Mode</th>
                                                        <th scope="col">Amount (Rs)</th>
                                                        <th scope="col">Print</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>SEMESTER FEES</td>
                                                        <td>15/06/2023</td>
                                                        <td>FIEM/05/23-24/0913</td>
                                                        <td></td>
                                                        <td>315049992392/</td>
                                                        <td>30/05/2023</td>
                                                        <td>NET BANKING</td>
                                                        <td>40,000.00</td>
                                                        <td><i className='bx bx-file'></i> Print</td>
                                                    </tr>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>SEMESTER FEES</td>
                                                        <td>15/06/2023</td>
                                                        <td>FIEM/05/23-24/0913</td>
                                                        <td></td>
                                                        <td>315049992392/</td>
                                                        <td>30/05/2023</td>
                                                        <td>NET BANKING</td>
                                                        <td>40,000.00</td>
                                                        <td><i className='bx bx-file'></i> Print</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                {/* <tr>
                                    <th scope="row">1</th>
                                    <td>Semester Fees</td>
                                    <td>15/06/2023</td>
                                    <td>FIEM/05/23-24/0913</td>
                                    <td></td>
                                    <td>315049992392/</td>
                                    <td>30/05/2023</td>
                                    <td>NET BANKING</td>
                                    <td></td>
                                    <td>Amount (Rs)</td>
                                    <td>Print</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>2023 - 2027</td>
                                    <td>2023 - 2027</td>
                                    <td>2023 - 2027</td>
                                    <td>2023 - 2027</td>
                                    <td>2023 - 2027</td>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PaymentDetails;