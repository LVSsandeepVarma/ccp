/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import SimpleBar from "simplebar-react"
import {  useCreatePaymentMutation, useLazyPaymentModesQuery, useSendInvoiceMutation, useViewInvoiceQuery } from "../../services/api";
import Loader from "../Loader";
import {  useEffect, useState } from "react";
import Select from "react-select"
import { useForm } from "react-hook-form";
import axios from "axios"
import Flatpickr from "react-flatpickr";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import TableLoader from "../TableLoader";
import Swal from "sweetalert2";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginFileEncode
  
);




// eslint-disable-next-line no-unused-vars
export default function InvoiceModal({ show, hide, invId }) {
  const [paymentFormToggle, setPaymentFormToggle] = useState(false);
  const [files, setFiles] = useState([]);
  const [encodedFile, setEncodedFile] = useState("")
  const [apiErr, setApiErr] = useState("");
  const [fileErr, setFileErr] = useState("")
  const [successMsg, setSuccessMsg] = useState("");
    const {
      register,
      handleSubmit,
      setError,
      trigger,
      setValue,
      clearErrors,
      formState: { errors },
    } = useForm({
      mode: "all",
    });
  
    const [
      getPaymentModes,
      { data: paymentModesData, isLoading: paymentModLoading },
    ] = useLazyPaymentModesQuery();

    useEffect(() => {
      getPaymentModes();
    }, []);
  
  useEffect(() => {
    if (files != "" && files != null && files == undefined && fileErr?.length > 0) {
      setFileErr("")
    }
  }, [files])
  

  const onUpdateFiles = async(updatedFiles) => {
    console.log(updatedFiles, updatedFiles[0])
    const base64String = await updatedFiles[0].getFileEncodeDataURL();
    setEncodedFile(base64String);
    setFiles(updatedFiles)

  };
  console.log(invId);

    const handleSuccessPayment = () => {
      Swal.fire({
        title: "Payment Recorded",
        text: "Successfully recorded payment details for this invoice, it will be in pending payments until gets approval from finance team.",
        icon: "success",
        showCancelButton: !1,
        confirmButtonText: "Ok",
        confirmButtonColor: "btn btn-success  w-xs me-2 mt-2",
        buttonsStyling: 1,
        showCloseButton: !0,
      });
    };


  // const [invDownload] = useDownloadInvoiceMutation()

  const handleDownlaodInvoice = async () => {
    
    const response = await axios.get(
      `https://controller.connetz.shop/bdo-api/customers/invoices/download?id=${invId}`,
      {
        responseType: "arraybuffer",
        headers: {
          'Content-Type': 'application/json',
                'Accept': 'application/pdf',
          Authorization: "Bearer " + localStorage.getItem("staff_auth_token"),
        },
      }
    );
    if(response){
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url, new Blob([response.data]));
       const link = document.createElement("a");
       link.href = url;
       link.setAttribute("download", "inv.pdf"); //or any other extension
       document.body.appendChild(link);
       link.click();
      }
        
      
    
  }

  const { data, isLoading, error } = useViewInvoiceQuery(invId);
  if (error) {
    console.log(error)
  }

  const [createPayment, { data: paymentRes, isLoading: paymentLaoding, error: paymentErr }] = useCreatePaymentMutation();

    useEffect(() => {
      if (apiErr) {
        setTimeout(() => {
          setApiErr("");
        }, 2000);
      }
      if (successMsg) {
        setTimeout(() => {
          setSuccessMsg("");
          // handleClose();
          // addEnq.current.click();
        }, 2000);
      }
    }, [apiErr, successMsg]);
  
    function convertToISODate(dateString) {
    const dateRegex = /^\d{2}-[a-zA-Z]{3}-\d{4}$/;

    if (!dateRegex.test(dateString)) {
      console.log(
        "Invalid date format. Please provide date in DD-MON-YYYY format."
      );
      return null; // or throw an error, depending on your use case
    }

    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const [day, month, year] = dateString.split("-");
    const monthInISOFormat = months[month];
    const isoDate = `${year}-${monthInISOFormat}-${day}`;

      
      return isoDate;
  }

    const onSubmit = async (data) => {
      // Handle form submission here
      // console.log(addEnq.current.click())
      clearErrors();
        try {
        const response = await createPayment({ ...data,payment_mode:data?.payment_mode?.value,  transaction_proof: encodedFile, invoice_id:invId, date:convertToISODate(data?.date) });
        console?.log(response, response?.data?.message);
        if (response?.data?.status) {
          setSuccessMsg(response?.data?.message);
          handleSuccessPayment();
          setPaymentFormToggle(!paymentFormToggle);
          localStorage.removeItem("editEnq");
          return;
        }
        if (response?.error?.data?.errors != {}) {
          console.log(response, response?.error.data?.errors?.email);
          setFileErr(response?.error.data?.errors?.transaction_proof);

          setError("amount", {
            type: "apierr",
            message: response?.error.data?.errors?.amount,
          });
          setError("transaction_id", {
            type: "apierr",
            message: response?.error.data?.errors?.transaction_id,
          });
          setError("date", {
            type: "apierr",
            message: response?.error.data?.errors?.date,
          });
          setError("payment_mode", {
            type: "apierr",
            message: response?.error.data?.errors?.payment_mode,
          });
         
        } else if (response?.error?.data?.message) {
          setApiErr(response?.error?.data?.message);
        }
      } catch (err) {
        console.log(err, "err");
      }
  };
  
        const [sendInvoice, { data: invoiceRes, isLoading: invLoading }] =
          useSendInvoiceMutation();

        const handleSendInvoice = async () => {
          const response = await sendInvoice({id:invId});
          console.log(response, "response");
          if (response?.data?.status) {
            setSuccessMsg(response?.data?.message);
            return;
          }
        };
  
  
  return (
    <>
      {isLoading || (invLoading && <TableLoader />)}
      <Modal
        className=""
        show={show}
        onHide={hide}
        centered
        scrollable={true}
        size="lg"
      >
        <div className="modal-content">
          <Modal.Header>
            <div className="flex justify-between items-center w-full gap-3">
              <div className="flex justify-between items-center w-full">
                <div>
                  <h5 className="modal-title" id="viewInvoiceLabel">
                    {data?.data?.invoice?.prefix}-
                    {data?.data?.id?.toString().padStart(5, "0") +
                      "/" +
                      (new Date(data?.data?.invoice?.date).getMonth() + 1)
                        ?.toString()
                        ?.padStart(2, "0") +
                      "/" +
                      new Date(data?.data?.invoice?.date).getFullYear()}
                    {data?.data?.invoice?.status == 1 && (
                      <>
                        <button
                          type="button"
                          className="btn btn-secondary bg-secondary mx-4"
                          onClick={() =>
                            setPaymentFormToggle(!paymentFormToggle)
                          }
                          disabled={
                            parseInt(data?.data?.invoice?.payments_limit) ==
                            parseInt(data?.data?.invoice?.payments_count)
                          }
                        >
                          Make Payment
                        </button>
                      </>
                    )}
                  </h5>
                  {parseInt(data?.data?.invoice?.payments_limit) ==
                    parseInt(data?.data?.invoice?.payments_count) && (
                    <small className="badge badge-soft-danger pulse text-sm mt-2 flex items-center gap-2 w-fit">
                      <i className="ri-alert-line"></i>Payment limit reached
                    </small>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">
                    Payments limit :{" "}
                    <b>{data?.data?.invoice?.payments_limit}</b>
                  </p>
                  <p className="text-gray-600 font-semibold">
                    Payments count :{" "}
                    <b>{data?.data?.invoice?.payments_count}</b>
                  </p>
                </div>
              </div>

              <p className="cursor-pointer  text-2xl " onClick={hide}>
                X
              </p>
            </div>
          </Modal.Header>
          <SimpleBar className="max-h-[700px]">
            <Modal.Body className="">
              <div className="row justify-content-center">
                <div className="col-xxl-12">
                  {paymentFormToggle && (
                    <>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row payment-details-row">
                          {/* <div className="col-lg-12 border-0 border-bottom border-dashed">
                            <h5>
                              Record Payment for <b>INV-856965/01/2024</b>
                            </h5>
                          </div> */}

                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="placeholderInput"
                              className="form-label"
                            >
                              Amount Received
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter Amount"
                              {...register("amount", {
                                required: true,
                                message: "Amount is required",
                              })}
                            />
                            {
                              <span className="error text-red-600">
                                {errors?.amount?.type == "required" &&
                                  "Amount is required"}
                                {errors?.amount?.type == "apierr" &&
                                  errors?.amount?.message}
                              </span>
                            }
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="placeholderInput"
                              className="form-label"
                            >
                              Payment Date
                            </label>
                            <Flatpickr
                              options={{
                                // mode: "range",
                                dateFormat: "d-M-Y",
                                placeholder: "Select payment date",
                                // defaultDate: new Date().toLocaleDateString(),
                                onClose: (selectedDates, dateStr, instance) => {
                                  setValue("date", dateStr);
                                  trigger("date");
                                },
                              }}
                              placeholder="Select payment date"
                              className="form-control bg-light border-light"
                              {...register("date", {
                                required: true,
                                message: "Select Payment Date",
                              })}
                            />
                            {
                              <span className="error text-red-600">
                                {errors?.date?.type == "required" &&
                                  "Payment Date is required"}
                                {errors?.date?.type == "apierr" &&
                                  errors?.date?.message}
                              </span>
                            }
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="placeholderInput"
                              className="form-label"
                            >
                              Transaction ID
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Transaction ID"
                              {...register("transaction_id", {
                                required: true,
                                message: "Transaction id is required",
                              })}
                            />
                            {
                              <span className="error text-red-600">
                                {errors?.transaction_id?.type == "required" &&
                                  "Transaction id is required"}
                                {errors?.transaction_id?.type == "apierr" &&
                                  errors?.transaction_id?.message}
                              </span>
                            }
                          </div>
                          <div className="col-lg-6 mt-3">
                            <label
                              htmlFor="placeholderInput"
                              className="form-label"
                            >
                              Payment Mode
                            </label>
                            <Select
                              className="js-example-basic-single select2-hidden-accessible"
                              name="PaymentMode"
                              data-select2-id="select2-data-39-vmv4"
                              tabIndex="-1"
                              aria-hidden="true"
                              options={paymentModesData?.data?.payment_modes?.map(
                                (prod) => ({
                                  value: prod?.id,
                                  label: prod?.name,
                                })
                              )}
                              {...register("payment_mode", {
                                required: true,
                                message: "Payment mode is required",
                              })}
                              onChange={(value) => {
                                setValue("payment_mode", value);
                                trigger("payment_mode");
                              }}
                            />
                            {
                              <span className="error text-red-600">
                                {errors?.payment_mode?.type == "required" &&
                                  "Payment mode is required"}
                                {errors?.payment_mode?.type == "apierr" &&
                                  errors?.payment_mode?.message}
                              </span>
                            }
                          </div>
                          <div className="col-12 mt-3">
                            <FilePond
                              files={files}
                              onupdatefiles={onUpdateFiles}
                              allowMultiple={false}
                              allowFileSizeValidation={true}
                              maxFileSize={2 * 1024 * 1024}
                              allowFileEncode={true}
                              acceptedFileTypes={["image/*"]}
                              labelMaxFileSize="Maximum file size is 2mb"
                              labelIdle={`
                              <span class="font-semibold text-gray-400 !text-xl !cursor-pointer flex items-center justify-evenly gap-3"><i class="ri-file-upload-line !text-xl"></i> Upload Payment Proofs</span>
                            `}
                              className={""}
                              labelMaxFileSizeExceeded="Maximum total size exceeded"
                            />
                            <p className="text-red-600 text-start">{fileErr}</p>
                          </div>
                          <div className="col-lg-12 mt-3">
                            <label
                              htmlFor="placeholderInput"
                              className="form-label"
                            >
                              Leave a note
                            </label>
                            <textarea
                              name="name"
                              rows="3"
                              className="form-control"
                              placeholder="Admin Note"
                              {...register("note", {
                                required: false,
                                message: "Note is required",
                              })}
                            ></textarea>
                          </div>
                          <div className="text-end my-3">
                            <div className="flex items-center justify-between">
                              <div className="">
                                <p className="text-danger text-center">
                                  {apiErr}
                                </p>
                                <p className="text-success text-center">
                                  {successMsg}
                                </p>
                              </div>

                              <div className="hstack gap-2 justify-content-end">
                                <div className="text-end">
                                  {!paymentLaoding && (
                                    <button
                                      type="submit"
                                      className="btn btn-success bg-success"
                                      id="sa-success"
                                      // onClick={() => handleSubmit(onSubmit())}
                                    >
                                      Save
                                    </button>
                                  )}
                                  {paymentLaoding && (
                                    <button
                                      disabled
                                      type="button"
                                      className="btn btn-outline-primary btn-load"
                                    >
                                      <span className="d-flex align-items-center">
                                        <span className="flex-grow-1 me-2">
                                          Please Wait...
                                        </span>
                                        <span
                                          className="spinner-border flex-shrink-0"
                                          role="status"
                                        >
                                          <span className="visually-hidden">
                                            Please Wait...
                                          </span>
                                        </span>
                                      </span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                  <div className="card mb-0" id="demo">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card-header border-bottom-dashed p-4">
                          <div className="row flex items-center ">
                            <div className="col-lg-6 ">
                              <img
                                src="/assets/images/ccp_logo.webp"
                                className="card-logo mx-0 card-logo-dark user-profile-image img-fluid m-auto"
                                alt="logo dark"
                              />
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-6">
                              <div className="text-end">
                                <p className="mb-0 test-dark fw-bold fs-16">
                                  Client/Company Name
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  Second Floor, No-5M-323, 5th Main Road,
                                  <br /> 3rd F Cross, East of NGEF Layout,
                                  Kasthuri,
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  Bengaluru, Karnataka
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  India - 560016
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  GST - GSTIN5415560016
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  +91 90361 56001
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <!--end card-header--> */}
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-lg-12">
                        <div className="card-body p-4">
                          <div className="row g-3">
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Invoice No
                              </p>
                              <h5 className="fs-14 mb-0">
                                #{data?.data?.invoice?.prefix}-
                                <span id="invoice-no">
                                  {data?.data?.id?.toString().padStart(5, "0") +
                                    "/" +
                                    (
                                      new Date(
                                        data?.data?.invoice?.date
                                      ).getMonth() + 1
                                    )
                                      ?.toString()
                                      ?.padStart(2, "0") +
                                    "/" +
                                    new Date(
                                      data?.data?.invoice?.date
                                    ).getFullYear()}
                                </span>
                              </h5>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Date
                              </p>
                              <h5 className="fs-14 mb-0">
                                <span id="invoice-date">
                                  {data?.data?.invoice?.date}
                                </span>{" "}
                              </h5>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Payment Status
                              </p>
                              <span
                                className={`badge badge-soft-${
                                  data?.data?.invocie?.status == 1
                                    ? "primary"
                                    : data?.data?.invoice?.status == 2
                                    ? "success"
                                    : data?.data?.invoice?.status == 3
                                    ? "secondary"
                                    : data?.data?.invoice?.status == 4
                                    ? "warning"
                                    : "danger"
                                } fs-11`}
                                id="payment-status"
                              >
                                {data?.data?.invoice?.status == 1
                                  ? "Unpaid"
                                  : data?.data?.invocie?.status == 2
                                  ? "Paid"
                                  : data?.data?.invoice?.status == 3
                                  ? "Partially Paid"
                                  : data?.data?.invoice?.status == 4
                                  ? "Overdue"
                                  : "Cancelled"}
                              </span>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Total Amount
                              </p>
                              <h5 className="fs-14 mb-0">
                                {
                                  JSON.parse(sessionStorage.getItem("currency"))
                                    ?.data?.currencies[0]?.symbol
                                }
                                <span id="total-amount">
                                  {data?.data?.invoice?.total}
                                </span>
                              </h5>
                            </div>
                            {/* <!--end col--> */}
                          </div>
                          {/* <!--end row--> */}
                        </div>
                        {/* <!--end card-body--> */}
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-lg-12">
                        <div className="card-body p-4 border-top border-top-dashed">
                          <div className="row g-3">
                            <div className="col-lg-6">
                              <div>
                                <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                  Billing Address
                                </h6>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.billing_street}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.billing_city},
                                  {data?.data?.invoice?.billing_state}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.billing_country} -{" "}
                                  {data?.data?.invoice?.billing_zip}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  GST -{" "}
                                  {data?.data?.invoice?.billing_tax_number}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.phone}
                                </p>
                              </div>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-6">
                              <div className="text-end">
                                <h6 className="text-muted text-uppercase fw-semibold mb-3">
                                  Shipping Address
                                </h6>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.shipping_street}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.shipping_city},
                                  {data?.data?.invoice?.shipping_state}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.shipping_country} -{" "}
                                  {data?.data?.invoice?.shipping_zip}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  GST -{" "}
                                  {data?.data?.invoice?.shipping_tax_number}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.invoice?.phone}
                                </p>
                              </div>
                            </div>
                            {/* <!--end col--> */}
                          </div>
                          {/* <!--end row--> */}
                        </div>
                        {/* <!--end card-body--> */}
                      </div>
                      {/* <!--end col--> */}
                      <div className="col-lg-12">
                        <div className="card-body p-0">
                          <div className="table-responsive">
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
                                {data?.data?.invoice?.invoice_items?.map(
                                  (item, ind) => (
                                    <tr key={ind}>
                                      <th scope="row">{item?.id}</th>
                                      <td className="text-start">
                                        <span className="fw-medium font-bold">
                                          {item?.description}
                                        </span>
                                        <p
                                          className="form-control bg-light border-0 whitespace-break-spaces line-clamp-5 motion-reduce:!transition-all hover:line-clamp-none py-1"
                                          id="productDetails-1"
                                          // rows="auto"
                                          placeholder="Product Description "
                                        >
                                          {item?.description}
                                        </p>
                                      </td>
                                      <td>
                                        {
                                          JSON.parse(
                                            sessionStorage.getItem("currency")
                                          )?.data?.currencies[0]?.symbol
                                        }
                                        {item?.rate}
                                      </td>
                                      <td>{item?.qty}</td>
                                      <td className="text-end">
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
                          <div className="border-top border-top-dashed mt-2">
                            <table className="table table-borderless table-nowrap align-middle mb-0 ms-auto w-[310px]">
                              <tbody>
                                <tr className="border-top border-top-dashed mt-2">
                                  <td colSpan="1"></td>
                                  <td colSpan="2" className="p-0">
                                    <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                                      <tbody>
                                        <tr className="!mr-2">
                                          <th scope="row">Sub Total</th>
                                          <td className="w-[150px]">
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0 "
                                              id="cart-subtotal"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`${JSON.parse(sessionStorage.getItem("currency"))?.data?.currencies[0]?.symbol} ${data?.data?.invoice?.subtotal}`}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">
                                            Estimated Tax (12.5%)
                                          </th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0"
                                              id="cart-tax"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`${JSON.parse(sessionStorage.getItem("currency"))?.data?.currencies[0]?.symbol} ${data?.data?.invoice?.total_tax}`}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">
                                            Discount{" "}
                                            <small className="text-muted">
                                              (VELZON15)
                                            </small>
                                          </th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0"
                                              id="cart-discount"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`${data?.data?.invoice?.discount_percent} %`}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">Shipping Charge</th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0"
                                              id="cart-shipping"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`${JSON.parse(sessionStorage.getItem("currency"))?.data?.currencies[0]?.symbol} ${
                                                data?.data?.invoice
                                                  ?.shipping_charge
                                                  ? data?.data?.invoice
                                                      ?.shipping_charge
                                                  : 0
                                              }`}
                                            />
                                          </td>
                                        </tr>
                                        <tr className="border-top border-top-dashed">
                                          <th scope="row">Total Amount</th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0"
                                              id="cart-total"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`${JSON.parse(sessionStorage.getItem("currency"))?.data?.currencies[0]?.symbol} ${data?.data?.invoice?.total}`}
                                            />
                                          </td>
                                        </tr>
                                        <tr className="border-top border-top-dashed">
                                          <th scope="row">Pending Amount</th>
                                          <td colSpan={2}>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0"
                                              id="cart-total"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`${JSON.parse(sessionStorage.getItem("currency"))?.data?.currencies[0]?.symbol} ${parseFloat(
                                                data?.data?.invoice
                                                  ?.pending_amount
                                              ).toFixed(2)}`}
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
                          <div className="mt-4">
                            <div className="alert alert-info mb-0">
                              <p className="mb-0">
                                <span className="fw-semibold">NOTES:</span>
                                <span id="note">
                                  All accounts are to be paid within 7 days from
                                  receipt of invoice. To be paid by cheque or
                                  credit card or direct payment online. If
                                  account is not paid within 7 days the credits
                                  details supplied as confirmation of work
                                  undertaken will be charged the agreed quoted
                                  fee noted above.
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* <!--end card-body--> */}
                      </div>
                      {/* <!--end col--> */}
                    </div>
                    {/* <!--end row--> */}
                  </div>
                </div>
              </div>
            </Modal.Body>
          </SimpleBar>
          <Modal.Footer className="modal-footer">
            <div className="flex justify-between items-center w-full">
              <div className="hstack gap-2 justify-content-end d-print-none ">
                <p className="text-success text-start">{successMsg}</p>
              </div>
              <div className="hstack gap-2 justify-content-end d-print-none">
                <button
                  className="btn btn-info bg-info"
                  onClick={() => handleSendInvoice()}
                >
                  <i className="ri-send-plane-fill align-bottom me-1"></i> Send
                  Invoice
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    window.location.href = data?.data?.invoice?.pdf_link;
                    // window.print(data?.data?.invoice?.pdf_link);
                  }}
                >
                  <i className="ri-printer-line align-bottom me-1"></i> Print
                </button>
                <button
                  className="btn btn-primary bg-primary "
                  onClick={() => handleDownlaodInvoice()}
                >
                  <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                  Download
                </button>
              </div>
            </div>
          </Modal.Footer>
        </div>
        {/* <!-- /.modal-content --> */}
      </Modal>
    </>
  );
}