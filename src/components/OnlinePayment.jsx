const OnlinePayment = () => {
    return (
        <section className="online_payment">
            <div className="row h-100">
                <div className="col-12">
                    <h2 className="heading-primary"><i className="bx bx-wifi icon-badge" style={{'--icon-bg': '#70f8ff', '--icon-border': '#dd51ff', fontSize: '0.9em', padding: '0.25em', color: 'rgb(255 12 135)'}}></i> Online Fees Payment</h2>
                    <div className="table-wrapper overflow-auto">
                        <table className="table basic_table list-table parent-table">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan={2}>Enrollment No: 23ECE070</th>
                                    <th scope="col">Roll / Index: 23ECE070</th>
                                    <th scope="col" colSpan={2}>Student Name: AYUSHMAN SIKDER</th>
                                    <th scope="col" colSpan={2}>Mobile No: 7439623633</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SL No.</td>
                                    <td>Session</td>
                                    <td>Course Name</td>
                                    <td>Schedule No</td>
                                    <td>Due Date</td>
                                    <td>Schedule Amount</td>
                                    <td>Action</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>2023-2027</td>
                                    <td>Electronics & Communication Engineering</td>
                                    <td>Semester-3</td>
                                    <td>15/06/2024</td>
                                    <td>47,000.00</td>
                                    <td><button style={{fontSize: '0.9em'}} className="btn-1">PAY</button></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2023-2027</td>
                                    <td>Electronics & Communication Engineering</td>
                                    <td>Semester-3</td>
                                    <td>15/06/2024</td>
                                    <td>47,000.00</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OnlinePayment;