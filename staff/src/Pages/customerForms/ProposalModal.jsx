/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import {
  useCreatePaymentMutation,
  useLazyPaymentModesQuery,
  useViewProposalQuery,
} from "../../services/api";
import Loader from "../Loader";
import { useEffect, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import axios from "axios";
import Flatpickr from "react-flatpickr";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize,
  FilePondPluginFileEncode
);

// eslint-disable-next-line no-unused-vars
export default function ProposalModal({ show, hide, invId }) {
  const [paymentFormToggle, setPaymentFormToggle] = useState(false);
  const [files, setFiles] = useState([]);
  const [encodedFile, setEncodedFile] = useState("");
  const [apiErr, setApiErr] = useState("");
  const [fileErr, setFileErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    setValue,
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
    if (
      files != "" &&
      files != null &&
      files == undefined &&
      fileErr?.length > 0
    ) {
      setFileErr("");
    }
  }, [files]);

  const onUpdateFiles = async (updatedFiles) => {
    console.log(updatedFiles, updatedFiles[0]);
    const base64String = await updatedFiles[0].getFileEncodeDataURL();
    setEncodedFile(base64String);
    setFiles(updatedFiles);
  };
  console.log(invId);

  // const [invDownload] = useDownloadInvoiceMutation()

  const handleDownlaodProposal = async () => {
    const response = await axios.get(
      `https://controller.callcentreproject.com/bdo-api/customers/proposals/download?id=${invId}`,
      {
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/pdf",
          Authorization: "Bearer " + localStorage.getItem("staff_auth_token"),
        },
      }
    );
    if (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(url, new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "inv.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();
    }
  };

  const { data, isLoading, error } = useViewProposalQuery(invId);
  if (error) {
    console.log(error);
  }

  const [
    createPayment,
    { data: paymentRes, isLoading: paymentLaoding, error: paymentErr },
  ] = useCreatePaymentMutation();

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

    try {
      const response = await createPayment({
        ...data,
        payment_mode: data?.payment_mode?.value,
        transaction_proof: encodedFile,
        invoice_id: invId,
        date: convertToISODate(data?.date),
      });
      console?.log(response, response?.data?.message);
      if (response?.data?.status) {
        setSuccessMsg(response?.data?.message);
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

  return (
    <>
      {isLoading && <Loader />}
      <Modal
        className=""
        show={show}
        onHide={hide}
        centered
        scrollable={true}
        size="lg"
      >
        <div className="modal-content">
          <Modal.Header c>
            <h5 className="modal-title" id="viewInvoiceLabel">
              {data?.data?.proposal?.prefix}-{data?.data?.id}
              
            </h5>

            <button
              type="button"
              className="btn-close text-black text-2xl"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              X
            </button>
          </Modal.Header>
          <SimpleBar className="max-h-[700px]">
            <Modal.Body className="">
              <div className="row justify-content-center">
                <div className="col-xxl-12">
                  <div className="card shadow-none mb-0" id="demo">
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
                                Proposal No
                              </p>
                              <h5 className="fs-14 mb-0">
                                #{data?.data?.proposal?.prefix}-
                                <span id="invoice-no">{data?.data?.id}</span>
                              </h5>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Date
                              </p>
                              <h5 className="fs-14 mb-0">
                                <span id="invoice-date">
                                  {data?.data?.proposal?.date}
                                </span>{" "}
                              </h5>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Payment Status
                              </p>
                              <span
                                className="badge badge-soft-success fs-11"
                                id="payment-status"
                              >
                                Paid
                              </span>
                            </div>
                            {/* <!--end col--> */}
                            <div className="col-lg-3 col-6">
                              <p className="text-muted mb-2 text-uppercase fw-semibold">
                                Total Amount
                              </p>
                              <h5 className="fs-14 mb-0">
                                ₹
                                <span id="total-amount">
                                  {data?.data?.proposal?.total}
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
                                  {data?.data?.proposal?.billing_street}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.billing_city},
                                  {data?.data?.proposal?.billing_state}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.billing_country} -{" "}
                                  {data?.data?.proposal?.billing_zip}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  GST -{" "}
                                  {data?.data?.proposal?.billing_tax_number}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.phone}
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
                                  {data?.data?.proposal?.shipping_street}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.shipping_city},
                                  {data?.data?.proposal?.shipping_state}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.shipping_country} -{" "}
                                  {data?.data?.proposal?.shipping_zip}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  GST -{" "}
                                  {data?.data?.proposal?.shipping_tax_number}
                                </p>
                                <p className="mb-0 test-dark fs-14">
                                  {data?.data?.proposal?.phone}
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
                                {data?.data?.proposal?.proposal_items?.map(
                                  (item, ind) => (
                                    <tr key={ind}>
                                      <th scope="row">{item?.id}</th>
                                      <td className="text-start">
                                        <span className="fw-medium font-bold">
                                          {item?.description}
                                        </span>
                                        <p className="text-muted mb-0">
                                          {item?.long_description}
                                        </p>
                                      </td>
                                      <td>₹{item?.rate}</td>
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
                            <table className="table table-borderless table-nowrap align-middle mb-0 ms-auto w-[280px]">
                              <tbody>
                                <tr className="border-top border-top-dashed mt-2">
                                  <td colSpan="1"></td>
                                  <td colSpan="3" className="p-0">
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
                                              value={`₹ ${data?.data?.proposal?.subtotal}`}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">
                                            Estimated Tax (12.5%)
                                          </th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0"
                                              id="cart-tax"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${data?.data?.proposal?.total_tax}`}
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
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0"
                                              id="cart-discount"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`${data?.data?.proposal?.discount_percent} %`}
                                            />
                                          </td>
                                        </tr>
                                        <tr>
                                          <th scope="row">Shipping Charge</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0"
                                              id="cart-shipping"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${
                                                data?.data?.proposal
                                                  ?.shipping_charge
                                                  ? data?.data?.proposal
                                                      ?.shipping_charge
                                                  : 0
                                              }`}
                                            />
                                          </td>
                                        </tr>
                                        <tr className="border-top border-top-dashed">
                                          <th scope="row">Total Amount</th>
                                          <td>
                                            <input
                                              type="text"
                                              className="form-control bg-light border-0"
                                              id="cart-total"
                                              placeholder="₹0.00"
                                              readOnly=""
                                              value={`₹ ${data?.data?.proposal?.total}`}
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
            <div className="hstack gap-2 justify-content-end d-print-none">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  window.print(data?.data?.proposal?.pdf_link);
                }}
              >
                <i className="ri-printer-line align-bottom me-1"></i> Print
              </button>
              <button
                className="btn btn-primary bg-primary "
                onClick={() => handleDownlaodProposal()}
              >
                <i className="ri-download-2-line align-bottom me-1"></i>{" "}
                Download
              </button>
            </div>
          </Modal.Footer>
        </div>
        {/* <!-- /.modal-content --> */}
      </Modal>
    </>
  );
}
