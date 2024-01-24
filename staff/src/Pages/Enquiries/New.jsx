/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Header from "../Header";
import DataTable from "./NewTable";
import "../../assets/tables.css"
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddEnquiryMutation, useEnquiriesQuery } from "../../services/api";
import Loader from "../Loader";
import { Modal } from "react-bootstrap"
import axios from "axios";
import Swal from "sweetalert2";


// import EditEnquiry from "./EditEnquiryForm";


export default function NewEnquiries() {
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loader?.value);
  const [apiErr, setApiErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addEnq = useRef()
  
    const {
      register,
      handleSubmit,
      setError,
      clearErrors,
      setValue,
      trigger,
      watch,
      formState: { errors },
    } = useForm({
      mode: "all",
    });
  
      const zipcode = watch("zip");

  
  useEffect(() => {
    if (apiErr) {
      setTimeout(() => {
        setApiErr("")
      },2000)
      
    }
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg("")
        // addEnq.current.click();
        localStorage.removeItem("editEnq");
      },2000)
    }
  },[
    apiErr,
    successMsg
  ])
  
  const [addEnquiry, { isLoading, error }] = useAddEnquiryMutation();
  
    const { data: enquiriesData, isLoading: loading, error: err } = useEnquiriesQuery("NEW");
    console.log(
      enquiriesData,
      enquiriesData?.data?.enquiries?.per_page,
      isLoading,
      err
    );
  
  
  const onSubmit = async (data) => {
    // Handle form submission here
    // console.log(addEnq.current.click())
    try {
      const response = await addEnquiry({ data })
      console?.log(response, response?.data?.message);
      if (response?.data?.status) {
        setSuccessMsg(response?.data?.message);
        Swal.fire({
          title: "Success!",
          text: "Enquiry added successfully!",
          icon: "success",
          showCancelButton: !1,
          confirmButtonText: "Ok",
          confirmButtonColor: "btn btn-info  w-xs me-2 mt-2",
          buttonsStyling: 1,
          showCloseButton: !0,
        });
          handleClose()
        return;
      }
      if (response?.error?.data?.errors != {}) {
              console.log(response, response?.error.data?.errors?.email);

        setError("name", {
          type: "apierr",
          message: response?.error.data?.errors?.name,
        });
        setError("email", {
          type: "apierr",
          message: response?.error.data?.errors?.email,
        });
        setError("phone", {
          type: "apierr",
          message: response?.error.data?.errors?.phone,
        });
        setError("city", {
          type: "apierr",
          message: response?.error.data?.errors?.city,
        });
        setError("state", {
          type: "apierr",
          message: response?.error.data?.errors?.state,
        });
        setError("zip", {
          type: "apierr",
          message: response?.error.data?.errors?.zip,
        });
        setError("message", {
          type: "apierr",
          message: response?.error.data?.errors?.message,
        });
      } else if (response?.error?.data?.message) {
        setApiErr(response?.error?.data?.message);
      }  
    } catch (err) {
      console.log(err,"err")
    }
  };
  console.log(errors)
  if (error) {
    console.log(error)
    console.log(error?.data?.errors?.email)


  }

      const fetchCSC = async (value) => {
        try {
          const response = await axios.post(
            "https://controller.connetz.shop/bdo-api/get-postal-code",
            { zip: value },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "staff_auth_token"
                )}`,
              },
            }
          );
          console.log(response?.data);
          if (response) {
            setValue("city", response?.data?.data?.postal_data?.taluq);
            setValue("state", response?.data?.data?.postal_data?.state);
            trigger("state")
            trigger("city")
            // setValue("country", response?.data?.data?.postal_data?.country);
          }
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        if (zipcode?.length == 6) {
          console.log(zipcode, "billingzip");
          fetchCSC(zipcode, "billing");
        }
      }, [zipcode]);
  

    return (
      <>
        {isLoading || (loading && <Loader />)}
        <Header />
        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              {/* <!-- start page title --> */}
              <div className="row">
                <div className="col-12">
                  <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18">New Enquiries</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <a href="javascript: void(0);">Enquiries</a>
                        </li>
                        <li className="breadcrumb-item active">
                          New Enquiries
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- end page title --> */}
              <div className="row g-4 mb-4">
                <div className="col-sm">
                  <div className="d-md-flex justify-content-sm-start align-items-center gap-2">
                    <span className="text-muted">
                      {new Date().toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>{" "}
                    | <span className="text-muted">Total Assigned</span> :{" "}
                    <span className="badge bg-secondary fs-13">
                      {enquiriesData?.data?.enquiries?.total}
                    </span>
                  </div>
                </div>
                <div className="col-sm-auto">
                  <div>
                    <a
                      id="addEnquiry"
                      ref={addEnq}
                      className="btn btn-primary bg-primary"
                      onClick={handleShow}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Add
                      Enquiry{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="row gy-2 mb-2" id="candidate-list">
                <div className="col-md-12 col-lg-12">
                  <DataTable enquiriesData={enquiriesData} type={"new"} />
                </div>
              </div>
              {/* <!-- end row --> */}
              <Modal
                id="signupModals"
                className="modal fade hidden"
                tabIndex="-1"
                aria-hidden="true"
                centered
                onHide={handleClose}
                size="lg"
                show={show}
              >
                <div className="modal-dialog modal-dialog-centered modal-lg !m-0">
                  <div className="modal-content border-0 overflow-hidden">
                    <Modal.Header className="modal-header p-3">
                      <h4 className="card-title mb-0 font-bold">
                        Add New Enquiry
                      </h4>
                      <button
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                      ></button>
                    </Modal.Header>
                    <Modal.Body className="modal-body">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                          <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="fullName" className="form-label">
                              Full Name <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="text"
                                className="form-control !pr-4"
                                id="fullName"
                                placeholder="Enter name"
                                {...register("name", {
                                  required: true,
                                  message: "Name is required",
                                })}
                              />
                              <i className="ri-shield-user-line"></i>
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.name?.type == "required" &&
                                  "Name is required"}
                                {errors?.name?.type == "apierr" &&
                                  errors?.name?.message}
                              </span>
                            }
                          </div>
                          <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="emailInput" className="form-label">
                              Email <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="email"
                                className="form-control !pr-4 form-control-icon"
                                id="emailInput"
                                placeholder="Enter email"
                                {...register("email", {
                                  required: true,
                                  pattern:
                                    /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
                                  message: "Invalid email format",
                                })}
                              />

                              <i className="ri-mail-unread-line"></i>
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.email?.type == "required" &&
                                  "Email is required"}
                                {errors?.email?.type == "pattern" &&
                                  "Invalid email"}
                                {errors?.email?.type == "apierr" &&
                                  errors?.email?.message}
                              </span>
                            }
                          </div>
                          <div className="col-12 col-lg-6 mb-3">
                            <label htmlFor="mobileInput" className="form-label">
                              Mobile Number{" "}
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="number"
                                className="form-control !pr-4"
                                id="mobileInput"
                                placeholder="Enter Mobile Number"
                                {...register("phone", {
                                  required: true,
                                  message: "Number is required",
                                  maxLength: 10,
                                  minLength: 8,
                                  pattern: /^\d{10}$/,
                                })}
                              />
                              <i className=" ri-smartphone-line"></i>
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.phone?.type == "required" &&
                                  "Mobile number is required"}
                                {errors?.phone?.type == "pattern" &&
                                  "Invalid Mobile number"}
                                {errors?.phone?.type == "maxLength" &&
                                  "Invalid Mobile number"}
                                {errors?.phone?.type == "minLength" &&
                                  "Invalid Mobile number"}
                                {errors?.phone?.type == "apierr" &&
                                  errors?.phone?.message}
                              </span>
                            }
                          </div>
                          <div className="col-12 col-lg-6 mb-3">
                            <label
                              htmlFor="addressInput"
                              className="form-label"
                            >
                              Address{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="address"
                                className="form-control !pr-4"
                                id="addressInput"
                                placeholder="Enter Address"
                                {...register("address", {
                                  message: "Address is required",
                                  maxLength: 250,
                                  minLength: 15,
                                })}
                              />
                              <i className="ri-map-pin-line"></i>
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.address?.type == "required" &&
                                  "Address is required"}
                                {errors?.address?.type == "maxLength" &&
                                  "Max 250 characters are allowed"}
                                {errors?.address?.type == "minLength" &&
                                  "Min 25 characters are required"}
                                {errors?.address?.type == "apierr" &&
                                  errors?.address?.message}
                              </span>
                            }
                          </div>
                          <div className="col-12 col-lg-4 mb-3">
                            <label htmlFor="pinInput" className="form-label">
                              Pin Code <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon right">
                              <input
                                type="number"
                                className="form-control !pr-4"
                                id="pinInput"
                                placeholder="Enter Postal Code"
                                {...register("zip", {
                                  required: true,
                                  message: "Zip code is required",
                                })}
                              />
                              <i className="ri-map-pin-fill"></i>
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.zip?.type == "required" &&
                                  "Zip code is required"}
                                {errors?.zip?.type == "apierr" &&
                                  errors?.zip?.message}
                              </span>
                            }
                          </div>
                          <div className="col-12 col-lg-4 mb-3">
                            <label
                              htmlFor="exampleInputPassword1"
                              className="form-label"
                            >
                              State <span className="text-danger">*</span>
                            </label>
                            <div className="form-icon right">
                              <input
                                type="text"
                                className="form-control !pr-4"
                                id="stateInput"
                                placeholder="Enter State"
                                {...register("state", {
                                  required: true,
                                  message: "State is required",
                                })}
                              />
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.state?.type == "required" &&
                                  "State is required"}
                                {errors?.state?.type == "apierr" &&
                                  errors?.state?.message}
                              </span>
                            }
                          </div>
                          <div className="col-12 col-lg-4 mb-3">
                            <label htmlFor="cityInput" className="form-label">
                              City <span className="text-danger">*</span>{" "}
                            </label>
                            <div className="form-icon left">
                              <input
                                type="text"
                                className="form-control !pr-4"
                                id="cityInput"
                                placeholder="Enter City"
                                {...register("city", {
                                  required: true,
                                  message: "City is required",
                                })}
                              />
                            </div>
                            {
                              <span className="error text-red-600">
                                {errors?.city?.type == "required" &&
                                  "City is required"}
                                {errors?.city?.type == "apierr" &&
                                  errors?.city?.message}
                              </span>
                            }
                          </div>

                          <div className="col-12 col-lg-12 mb-3">
                            <label
                              htmlFor="messageInput"
                              className="form-label"
                            >
                              Message
                            </label>
                            {/* <!-- <input type="text" class="form-control" id="messageInput" placeholder="Enter Postal Code"> --> */}
                            <textarea
                              name="name"
                              className="form-control"
                              id="messageInput"
                              placeholder="Enter Message"
                              {...register("message", {
                                message: "Message is required",
                              })}
                            ></textarea>
                          </div>
                          {
                            <span className="error text-red-600">
                              {errors?.message?.type == "required" &&
                                "Message is required"}
                              {errors?.message?.type == "apierr" &&
                                errors?.message?.message}
                            </span>
                          }

                          {/* <!-- <div class="col-12 col-lg-6 mb-3 form-check">
                                       <input type="checkbox" class="form-check-input" id="checkTerms">
                                       <label class="form-check-label" for="checkTerms">I agree to the <span class="fw-semibold">Terms of Service</span> and Privacy Policy</label>
                                       </div> --> */}
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-success text-start">
                                {successMsg}
                              </p>
                              <p className="text-danger text-start">{apiErr}</p>
                            </div>
                            <div className="text-end">
                              {!isLoading && (
                                <button
                                  type="submit"
                                  className="btn btn-primary bg-primary"
                                  id="sa-success"
                                  onClick={() => clearErrors()}
                                >
                                  Submit
                                </button>
                              )}
                              {isLoading && (
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
                      </form>
                    </Modal.Body>
                  </div>
                  {/* <!-- /.modal-content --> */}
                </div>
                {/* <!-- /.modal-dialog --> */}
              </Modal>
              {/* <!-- /.modal --> */}

              {/* <!--end modal--> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>
          {/* <!-- End Page-content --> */}
          <footer className="footer w-100">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6">
                  {new Date().getFullYear()} © All Rights Reserved.
                </div>
                <div className="col-sm-6">
                  <div className="text-sm-end d-none d-sm-block">
                    Designed and Developed by Call Center Projects
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </>
    );
}