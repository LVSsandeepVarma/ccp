/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProposalClient() {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [getProposalDetails, setGetProposalDetails] = useState();
  const [signature, setSignature] = useState(null);
  const [userResponse, setUserResponse] = useState("nothing")
  const MySwal = withReactContent(Swal);
  const params = useParams();

  useEffect(() => {
    if (!getProposalDetails) {
     getProposalData(); 
    }
  }, []);

  const getProposalData = async () => {
    try {
      setShowLoader(true);
      const response = await axios.get(
        `https://controller.connetz.shop/bdo-api/proposals/details?id=${params?.id}&hash=${params?.hash}`,
        {
          headers: {
            "X-Api-Secret": "crtadf4h9hnf5n4nd5vbn5g8wq145sfdgrfe",
          },
        }
      );
      if (response?.status) {
        setGetProposalDetails(response?.data?.data?.proposal);
        console.log(response?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setShowLoader(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const signaturePadRef = useRef(null);

  const handleCloseAcceptedModal = () => {
    setShowAcceptModal(false);
  };

  const handleSignatureEnd = () => {
    setSignature(signaturePadRef.current.toDataURL());
  };

  const clearSignature = () => {
    signaturePadRef.current.clear();
    setSignature(null);
  };

  const onSubmit = async(data) => {
    const signatureData = signaturePadRef.current.toDataURL();
    if (signatureData)
      // Send data, including signatureData, to your server
      console.log(data, signatureData);
    
    try {
      setShowLoader(true)
      const response = await axios.post(
        "https://controller.connetz.shop/bdo-api/proposals/accept",
        {
          id: getProposalDetails?.id,
          acceptance_firstname: data?.firstName,
          acceptance_lastname: data?.lastName,
          acceptance_email: data?.Email,
          acceptance_signature: signatureData,
        },
        {
          headers: {
            "X-Api-Secret": "crtadf4h9hnf5n4nd5vbn5g8wq145sfdgrfe",
          },
        }
      );
      if (response?.status) {
        console.log(response?.data)
        handleAccept();
        // window.location.reload()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setShowLoader(false)
    }
  };

  const handleRejectProposal = async() => {
    try {
      setShowLoader(true)
      const response = await axios.post(
        "https://controller.connetz.shop/bdo-api/proposals/reject",
        {
          id: getProposalDetails?.id
        },
        {
          headers: {
            "X-Api-Secret": "crtadf4h9hnf5n4nd5vbn5g8wq145sfdgrfe",
          },
        }
      );
      if (response?.status) {
        console.log(response?.data)
        // window.location.reload()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setShowLoader(false)
    }
  }

  const handleAccept = () => {
    Swal.fire({
      title: "Proposal Accepted",
      // text: "You won't be able to revert this!",
      icon: "success",
      showCancelButton: !1,
      confirmButtonText: "Ok",
      confirmButtonColor: "btn btn-success  w-xs me-2 mt-2",
      buttonsStyling: 1,
      showCloseButton: !0,
    })
  }

  const onReject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: !0,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "No, cancel!",
      confirmButtonColor: "btn btn-primary  w-xs me-2 mt-2",
      cancelButtonClass: "btn btn-danger w-xs mt-2",
      buttonsStyling: 1,
      showCloseButton: !0,
    }).then(function (t) {
      t.value
        ?( Swal.fire({
          title: "Rejected!",
          text: "Your proposal has been rejected.",
          icon: "success",
          confirmButtonClass: "btn btn-primary w-xs mt-2",
          buttonsStyling: 1,
        }),
        handleRejectProposal())
        : t.dismiss === Swal.DismissReason.cancel &&
          Swal.fire({
            title: "Cancelled",
            text: "Your proposal is still open",
            icon: "error",
            confirmButtonClass: "btn btn-primary mt-2",
            buttonsStyling: 1,
          });
    });
  };

  const handleDownload = async () => {
    try {
      setShowLoader(true);
      const response = await axios.get(
        `https://controller.connetz.shop/bdo-api/proposals/download?id=${params?.id}`,
        {
            responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
            "X-Api-Secret": "crtadf4h9hnf5n4nd5vbn5g8wq145sfdgrfe",
          }
        }
      );
      if (response.status) {
        console.log(response.data)
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log(url, new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "proposal.pdf"); //or any other extension
        document.body.appendChild(link);
        link.click();
      }
     } catch (err) {
      console.log(err)
    }finally{setShowLoader(false)}
  }
  return (
    <>
      <div className="layout-wrapper landing">
        {/* <!-- start hero section --> */}
        <section className="section pb-0 hero-section pt-5" id="hero">
          <div className="bg-overlay bg-overlay-pattern"></div>
          <div className="container">
            <div className="row">
              <div className="d-flex justify-content-between align-items-center flex-wrap d-flex-center">
                <img src="/assets/images/ccp_logo.webp" width="" alt="" />
                <div className="">
                  <button
                    type="button"
                    className="btn btn-primary btn-label btn-sm waves-effect waves-light me-2"
                    onClick={() => handleDownload()}
                  >
                    <i className=" ri-download-2-line label-icon align-middle fs-16 me-2"></i>{" "}
                    Download
                  </button>

                  {getProposalDetails?.status == 1 && (
                    <button
                      onClick={() => setShowAcceptModal(true)}
                      type="button"
                      className="btn btn-success btn-label btn-sm waves-effect waves-light me-2"
                    >
                      <i className="ri-check-double-line label-icon align-middle fs-16 me-2"></i>{" "}
                      Accept
                    </button>
                  )}

                  {getProposalDetails?.status == 1 && (
                    <button
                      type="button"
                      className="btn btn-danger btn-label btn-sm waves-effect waves-light me-2"
                      onClick={onReject}
                    >
                      <i className="ri-close-circle-fill label-icon align-middle fs-16 me-2"></i>
                      Reject
                    </button>
                  )}

                  {getProposalDetails?.status == 2 && (
                    <span className="badge badge-soft-success badge-border me-2 fs-13">
                      Accepted
                    </span>
                  )}

                  {getProposalDetails?.status == 3 && (
                    <span className="badge badge-soft-danger badge-border fs-13">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="card my-4">
                <div className="row">
                  <div className="col-lg-8 border-end">
                    <div className="card-body p-4">
                      <div className="row g-3">
                        <div className="col-lg-3 col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-sm-12px">
                            Invoice No
                          </p>
                          <h5 className="fs-14 mb-0">
                            #{getProposalDetails?.prefix}-
                            {getProposalDetails?.number
                              ?.toString()
                              ?.padStart(5, "0") +
                              "/" +
                              (
                                new Date(getProposalDetails?.date).getMonth() +
                                1
                              )
                                ?.toString()
                                ?.padStart(2, "0") +
                              "/" +
                              new Date(getProposalDetails?.date).getFullYear()}
                          </h5>
                        </div>
                        {/* <!--end col--> */}
                        <div className="col-lg-3 col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-sm-12px">
                            Date
                          </p>
                          <h5 className="fs-14 mb-0">
                            <span id="proposals-date">
                              {new Date(
                                getProposalDetails?.datecreated
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>{" "}
                          </h5>
                        </div>
                        {/* <!--end col--> */}
                        <div className="col-lg-3 col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-sm-12px">
                            Status
                          </p>
                          <span
                            className={`badge badge-soft-${
                              getProposalDetails?.status == 1
                                ? "warning"
                                : getProposalDetails?.status == 2
                                ? "success"
                                : "danger"
                            } fs-11`}
                            id="payment-status"
                          >
                            {getProposalDetails?.status == 1
                              ? "Pending"
                              : getProposalDetails?.status == 2
                              ? "Accepted"
                              : "Declined"}
                          </span>
                        </div>
                        {/* <!--end col--> */}
                        <div className="col-lg-3 col-6">
                          <p className="text-muted mb-2 text-uppercase fw-semibold fs-sm-12px">
                            Total Amount
                          </p>
                          <h5 className="fs-14 mb-0">
                            ₹
                            <span id="total-amount">
                              {getProposalDetails?.total}
                            </span>
                          </h5>
                        </div>
                        {/* <!--end col--> */}
                      </div>
                      {/* <!--end row--> */}
                    </div>
                    {/* <!--end card-body--> */}
                    <div className="card-body p-0">
                      <div
                        className="table-responsive"
                        style={{
                          maxHeight: "400px",
                          overflowY: "auto",
                        }}
                      >
                        <table className="table table-borderless text-center table-nowrap align-middle mb-0">
                          <thead>
                            <tr className="table-active">
                              <th scope="col" className="w-[50px]">
                                #
                              </th>
                              <th scope="col">Product Details</th>
                              <th scope="col">Rate</th>
                              <th scope="col">Quantity</th>
                              <th scope="col" className="text-end">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody id="products-list">
                            {getProposalDetails?.proposal_items?.map(
                              (item, ind) => (
                                <tr valign="top" key={ind}>
                                  <th scope="row">{ind + 1}</th>
                                  <td className="text-start">
                                    <p className="fw-medium mb-2">
                                      {item?.description}
                                    </p>
                                    <p
                                      className="form-control bg-light border-0 whitespace-break-spaces line-clamp-5 motion-reduce:!transition-all hover:line-clamp-none py-1"
                                      id="productDetails-1"
                                      // rows="auto"
                                      placeholder="Product Description "
                                    >
                                      {item?.long_description}
                                    </p>
                                  </td>
                                  <td>₹{item?.rate}</td>
                                  <td>{item?.qty}</td>
                                  <td className="text-end">
                                    ₹
                                    {parseFloat(item?.rate) *
                                      parseInt(item?.qty)}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                        {/* <!--end table--> */}
                      </div>
                      <div className="border-top border-top-dashed mt-2 mb-3">
                        <table className="table table-borderless table-nowrap align-middle w-[250px] mb-0 ms-auto tbl-100">
                          <tbody>
                            <tr className="border-top border-top-dashed mt-2">
                              <td colSpan="3"></td>
                              <td colSpan="2" className="p-0">
                                <table className="table table-borderless table-sm table-nowrap align-middle mb-0 tbl-100">
                                  <tbody>
                                    <tr>
                                      <th scope="row" className="fs-14">
                                        Sub Total
                                      </th>
                                      <td className="w-[150px]">
                                        <input
                                          type="text"
                                          className="form-control bg-light border-0 "
                                          id="cart-subtotal"
                                          placeholder="₹0.00"
                                          value={
                                            "₹" + getProposalDetails?.subtotal
                                          }
                                          readOnly
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row" className="fs-14">
                                        Estimated Tax
                                      </th>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control bg-light border-0"
                                          id="cart-tax"
                                          placeholder="₹0.00"
                                          value={
                                            "₹" + getProposalDetails?.total_tax
                                          }
                                          readOnly
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row" className="fs-14">
                                        Discount{" "}
                                        <small className="text-muted">
                                          (VELZON15)
                                        </small>
                                      </th>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control bg-light border-0"
                                          id="cart-discount"
                                          placeholder="₹0.00"
                                          value={
                                            "₹" +
                                              getProposalDetails?.discount_total >
                                            0
                                              ? getProposalDetails?.discount_total
                                              : 0
                                          }
                                          readOnly
                                        />
                                      </td>
                                    </tr>
                                    <tr className="border-top border-top-dashed">
                                      <th scope="row" className="fs-14">
                                        Total Amount
                                      </th>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control bg-light border-0"
                                          id="cart-total"
                                          placeholder="₹0.00"
                                          value={
                                            "₹" + getProposalDetails?.total
                                          }
                                          readOnly
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!--end table--> */}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        {/* <!--end table--> */}
                      </div>
                    </div>
                    {/* <!--end card-body--> */}
                  </div>
                  <div className="col-lg-4">
                    <div className="card-header border-bottom-dashed p-4">
                      <div className="row">
                        <div className="col-lg-12 mb-3">
                          <div>
                            <p className="mb-0 text-muted fw-bold fs-16">
                              Call Center Projects
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              Second Floor, No-5M-323, 5th Main Road,
                              <br /> 3rd F Cross, East of NGEF Layout, Kasthuri,
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              Bengaluru, Karnataka
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              India - 560016
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              GST - GSTIN5415560016
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              +91 90361 56001
                            </p>
                          </div>
                        </div>
                        {/* <!--end col--> */}
                        <div className="col-lg-12 border-top-dashed">
                          <div className="pt-3">
                            <h5 className="text-muted">Proposal Information</h5>
                            <p className="mb-0 text-muted fw-bold fs-16">
                              {getProposalDetails?.customer?.company
                                ? getProposalDetails?.customer?.company
                                : getProposalDetails?.customer?.name}
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              {getProposalDetails?.customer?.street}
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              {getProposalDetails?.customer?.city},{" "}
                              {getProposalDetails?.customer?.state}
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              {getProposalDetails?.customer?.country} -{" "}
                              {getProposalDetails?.customer?.zip}
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              GST - {getProposalDetails?.customer?.gst_no}
                            </p>
                            <p className="mb-0 text-dark fs-12">
                              {getProposalDetails?.customer?.phone}
                            </p>
                          </div>

                          {getProposalDetails?.status == 2 && (
                            <div>
                              <h6 className="text-dark mt-3 mb-0 border-top-dashed pt-3">
                                Total ₹{getProposalDetails?.total}
                              </h6>
                              <div className="">
                                <table className="fs-12 table table-borderless table-sm table-nowrap align-middle mb-0 tbl-100">
                                  <tbody>
                                    <tr>
                                      <th scope="row" className="fs-12">
                                        Status
                                      </th>
                                      <td className="w-[150px]">
                                        <span className="badge badge-soft-success badge-border me-2 fs-12">
                                          Accepted
                                        </span>
                                        <span className="badge badge-soft-danger badge-border me-2 fs-12">
                                          Rejected
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row" className="fs-12">
                                        Date
                                      </th>
                                      <td>
                                        <span className="text-muted">
                                          2 Jan, 2024
                                        </span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <th scope="row" className="fs-12">
                                        Open Till{" "}
                                      </th>
                                      <td>
                                        <span className="text-muted">
                                          30 Jan, 2024
                                        </span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                {/* <!--end table--> */}

                                <h6 className="text-dark mt-3 mb-0 border-top-dashed pt-3">
                                  Signature
                                </h6>
                                <div className="">
                                  <table className="fs-12 table table-borderless table-sm table-nowrap align-middle mb-0 tbl-100">
                                    <tbody>
                                      <tr>
                                        <th scope="row" className="fs-12">
                                          Signer Name
                                        </th>
                                        <td className="w-[150px]">
                                          <span className="text-muted">
                                            {
                                              getProposalDetails?.acceptance_firstname
                                            }{" "}
                                            {
                                              getProposalDetails?.acceptance_lastname
                                            }
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row" className="fs-12">
                                          Signed Date
                                        </th>
                                        <td>
                                          <span className="text-muted">
                                            {new Date(
                                              getProposalDetails?.acceptance_date
                                            ).toLocaleDateString("en-GB", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            })}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row" className="fs-12">
                                          IP Address{" "}
                                        </th>
                                        <td>
                                          <span className="text-muted">
                                            {getProposalDetails?.acceptance_ip}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <th scope="row">Signature</th>
                                        <td>
                                          <img
                                            alt="signature"
                                            src={
                                              getProposalDetails?.acceptance_signature
                                            }
                                            width={100}
                                            height={"auto"}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  {/* <!--end table--> */}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!--end row--> */}
                </div>
                {/* <!-- end row --> */}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- end hero section --> */}

        {/* <!-- Start footer --> */}
        <footer className="custom-footer bg-dark py-3 fixed-bottom">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                {new Date().getFullYear()} © All Rights Reserved.
              </div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Designed and Developed by Call Center Projects.
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/* <!-- end footer --> */}

        <Modal
          show={showAcceptModal}
          onHide={handleCloseAcceptedModal}
          className="modal fade zoomIn"
          centered
        >
          <div className="">
            <div className="">
              <Modal.Header className="modal-header" closeButton>
                <h5 className="modal-title" id="acceptProposalLabel">
                  Signature & Confirmation Of Identity
                </h5>
              </Modal.Header>
              <Modal.Body className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <label htmlFor="nameInput" className="form-label">
                        First Name
                      </label>
                    </div>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        id="firstNameInput"
                        {...register("firstName", { required: true })}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <span className="error-message">
                          First name is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <label htmlFor="nameInput" className="form-label">
                        Last Name
                      </label>
                    </div>
                    <div className="col-lg-9">
                      <input
                        type="text"
                        className="form-control"
                        id="lastNameInput"
                        {...register("lastName", { required: true })}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <span className="error-message">
                          Last name is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-3">
                      <label htmlFor="emails" className="form-label">
                        Email Id
                      </label>
                    </div>
                    <div className="col-lg-9">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="Email"
                        placeholder="Enter email"
                        {...register("Email", {
                          required: true,
                          pattern:
                            /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
                          message: "Invalid email format",
                        })}
                      />
                      {
                        <span className="error text-red-600">
                          {errors?.Email?.type == "required" &&
                            "Email is required"}
                          {errors?.Email?.type == "pattern" && "Invalid email"}
                        </span>
                      }
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <label htmlFor="meassageInput" className="form-label">
                        Signature Pad
                      </label>
                    </div>
                    <div className="col-lg-12">
                      <SignatureCanvas
                        ref={signaturePadRef}
                        canvasProps={{
                          width: 450,
                        }}
                        onEnd={handleSignatureEnd}
                        penColor="black"
                      />
                      {errors.signature && (
                        <span className="error-message">
                          Signature is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <button
                      className="btn btn-light btn-sm me-2"
                      onClick={clearSignature}
                      type="button"
                    >
                      Clear
                    </button>
                  </div>
                  <hr />
                  <p className="text-muted fs-12 mb-0">
                    By clicking on &quot;Sign&quot;, I consent to be legally
                    bound by this electronic representation of my signature.
                  </p>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Sign
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
