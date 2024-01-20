/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDeletePaymentMutation, useLazyViewPaymentsQuery } from "../../services/api";
import TableLoader from "../TableLoader";
import InvoiceModal from "./InvoiceModal";
import UpdateInvoiceModal from "./updateInvoiceModal";
import {Table} from "react-bootstrap"

/* eslint-disable react/prop-types */
export default function PaymentsTable({ customerData, currentTab, handleShowInvoice }) {
  const [activePaymentTab, setActivePaymentTab] = useState(0);
  const [showPaymentDetails, setShowPaymentDetails] = useState("");
  const [showPaymentView, setShowPaymentView] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [paymentFormToggle, setPaymentFormToggle] = useState(false);
  const [invId, setInvId] = useState();
  const [paymentId, setPaymentId] = useState("");
  const [
    deletePayment,
    { data: paymentDeleteResponse, isLoading: deleteLoading, error: deleteErr },
  ] = useDeletePaymentMutation();

  const handleDelete = async (paymentID) => {
    const response = await deletePayment({ id: paymentID });
    if (response) {
      console.log(response);
      window.onload();
    }
  };

  const [
    viewPayment,
    {
      data: paymentInfo,
      isLoading: paymentViewLoading,
      error: paymentviewError,
    },
  ] = useLazyViewPaymentsQuery();

  useEffect(() => {
    viewPayment(showPaymentDetails);
    setTimeout(() => {
      if (showPaymentDetails) {
        setShowPaymentView(true);
      }
    }, 1000);
  }, [showPaymentDetails]);

  const hideinv = () => {
    setShowInvoice(false);
  };

  const togglePaymentForm = () => {
    setPaymentFormToggle(!paymentFormToggle);
  };

  return (
    <>
      <div
        className={`tab-pane ${
          currentTab == "PAYMENTS" ? "active show" : ""
        } fade`}
        id="custom-v-pills-payments"
        role="tabpanel"
        aria-labelledby="custom-v-pills-payments-tab"
      >
        <div className="card">
          <div className="card-header">
            <h4 className="card-title mb-0">Payments</h4>
          </div>
          <div className="card-body">
            <div className="flex flex-wrap justify-start gap-4 my-2 items-center">
              <button
                type="button"
                className={`btn ${
                  activePaymentTab === 1
                    ? " bg-success text-white"
                    : "btn-outline-success"
                }`}
                onClick={() => setActivePaymentTab(1)}
              >
                Payment Success
              </button>
              <button
                type="button"
                className={`btn ${
                  activePaymentTab === 0
                    ? " bg-secondary text-white"
                    : "btn-outline-secondary"
                }`}
                onClick={() => setActivePaymentTab(0)}
              >
                Payment Pending
              </button>
              <button
                type="button"
                className={`btn ${
                  activePaymentTab === 2
                    ? " bg-danger text-white"
                    : "btn-outline-danger"
                }`}
                onClick={() => setActivePaymentTab(2)}
              >
                Payment Failed
              </button>
            </div>
            <div className="row">
              <div
                className={`${
                  paymentInfo ? "col-md-8" : "col-md-12"
                } slideAnim`}
              >
                <Table
                  responsive
                  id="tbl_payments"
                  className="table table-borderedless responsive  table-striped align-middle w-full"
                >
                  <thead>
                    <tr className="bg-light">
                      <th>Sno No.</th>
                      <th>Payment No</th>
                      <th>Invoice No.</th>
                      <th>Payment Mode</th>
                      <th>Transaction ID</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerData?.data?.res_data?.payments?.length > 0 &&
                      customerData?.data?.res_data?.payments?.map(
                        (payment, ind) => {
                          if (payment?.status == activePaymentTab) {
                            return (
                              <tr key={ind}>
                                <td className=" text-start">{payment?.id}</td>
                                <td
                                  className="text-start text-secondary cursor-pointer"
                                  onClick={() =>
                                    setShowPaymentDetails(payment?.id)
                                  }
                                >
                                  {payment?.payment_id}
                                </td>
                                <td
                                  className="text-info text-start cursor-pointer"
                                  onClick={() =>
                                    handleShowInvoice(payment?.invoice_id)
                                  }
                                >
                                  INV-
                                  {payment?.invoice_id
                                    ?.toString()
                                    .padStart(5, "0") +
                                    "/" +
                                    (new Date(payment?.date).getMonth() + 1)
                                      ?.toString()
                                      ?.padStart(2, "0") +
                                    "/" +
                                    new Date(payment?.date).getFullYear()}
                                </td>
                                <td className="text-start">Bank Account</td>
                                <td className="text-start">
                                  {payment?.transaction_id}
                                </td>
                                <td className="text-start">
                                  <span className="badge badge-soft-success fs-12">
                                    ₹{payment?.amount}
                                  </span>
                                </td>
                                <td className="text-start">
                                  <span className="badge badge-soft-primary fs-12">
                                    {payment?.date}
                                  </span>
                                </td>
                                <td className="text-start">
                                  <div className="dropdown">
                                    <button
                                      className="btn btn-soft-secondary bg-[#fff2ee] btn-sm dropdown"
                                      type="button"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <i className="ri-more-fill align-middle"></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                      <li>
                                        <a
                                          className="dropdown-item edit-item-btn"
                                          onClick={() => {
                                            setInvId(payment?.invoice_id);
                                            setShowInvoice(true);
                                            setPaymentFormToggle(true);
                                            setPaymentId(payment?.id);
                                          }}
                                          data-bs-toggle="modal"
                                        >
                                          <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                          update
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          className="dropdown-item remove-item-btn"
                                          data-bs-toggle="modal"
                                          onClick={() => {
                                            handleDelete(payment?.id);
                                          }}
                                        >
                                          <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                          Delete
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            );
                          } else {
                            return (
                              customerData?.data?.res_data?.payments?.filter(
                                (payment) => payment?.status == activePaymentTab
                              )?.length == 0 &&
                              ind == 0 && (
                                <tr key={ind}>
                                  <td colSpan={8}>
                                    <p className="text-center w-full text-lg">
                                      No data found
                                    </p>
                                  </td>
                                </tr>
                              )
                            );
                          }
                        }
                      )}
                    {customerData?.data?.res_data?.payments?.length == 0 && (
                      <tr>
                        <td colSpan={8}>
                          <p className="text-center w-full text-lg">
                            No data found
                          </p>
                        </td>
                      </tr>
                    )}
                    {deleteLoading && <TableLoader />}
                  </tbody>
                </Table>
              </div>
              {showPaymentView && (
                <div className="col-md-4 pulse">
                  <div className="card" id="contact-view-detail">
                    <div className="card-body text-center">
                      <div className="position-relative d-inline-block">
                        <img
                          src={paymentInfo?.data?.payment?.transaction_proof}
                          alt="transaction_proof"
                          className=""
                        />
                        <span className="contact-active position-absolute rounded-circle bg-success">
                          <span className="visually-hidden"></span>
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      {/* <!-- <h6 class="text-muted text-uppercase fw-semibold mb-3">Personal Information</h6> --> */}
                      {/* <!-- <p class="text-muted mb-4">Hello, I'm Tonya Noble, The most effective objective is one that is tailored to the job you are applying for. It states what kind of career you are seeking, and what skills and experiences.</p> --> */}
                      <div className="table-responsive table-card">
                        <table className="table table-borderless mb-0">
                          <tbody>
                            <tr>
                              <td
                                className="fw-bold py-1 text-start"
                                width="200"
                                scope="row"
                              >
                                Transaction id
                              </td>
                              <td className="py-1 text-start">
                                {paymentInfo?.data?.payment?.transaction_id}
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="fw-bold py-1 text-start"
                                scope="row"
                              >
                                Date
                              </td>
                              <td className="py-1 text-start">
                                {paymentInfo?.data?.payment?.date}
                              </td>
                            </tr>
                            <tr>
                              <td
                                valign="top"
                                className="fw-bold text-start"
                                scope="row"
                              >
                                Payment mode
                              </td>
                              <td className="py-1 text-start">
                                {paymentInfo?.data?.payment?.payment_mode}
                              </td>
                            </tr>
                            <tr>
                              <td
                                valign="top"
                                className="fw-bold text-start"
                                scope="row"
                              >
                                Note
                              </td>
                              <td className="py-1 text-start">
                                {paymentInfo?.data?.payment?.note}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showInvoice && invId && (
        <UpdateInvoiceModal
          show={showInvoice}
          hide={hideinv}
          invId={invId}
          paymentFormToggle={paymentFormToggle}
          togglePaymentForm={togglePaymentForm}
          paymentId={paymentId}
        />
      )}
    </>
  );
}