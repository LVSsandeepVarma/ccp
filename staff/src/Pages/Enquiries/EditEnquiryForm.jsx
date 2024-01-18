/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useEditEnquiryMutation } from "../../services/api";
import Select from "react-select"
import Flatpickr from "react-flatpickr";
import axios from "axios";


export default function EditEnquiry({ info, handleClose }) {
  const [apiErr, setApiErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [dValues, setDvalues] = useState({})
  const userInfo = JSON.parse(localStorage.getItem("editEnq"));
  console.log(userInfo);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: userInfo?.id ? userInfo?.id : "",
      name: userInfo?.name ? userInfo?.name : "",
      email: userInfo?.email ? userInfo?.email : "",
      city: userInfo?.city ? userInfo?.city : "",
      phone: userInfo?.phone ? userInfo?.phone : "",
      state: userInfo?.state ? userInfo?.state : "",
      address: userInfo?.address ? userInfo?.address : "",
      zip: userInfo?.zip ? userInfo?.zip : "",
      destination: "RINGING",
      date: new Date()
        .toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(/,/g, ""),
    },
    mode: "all",
  });

      const zipcode = watch("zip");

  useEffect(() => {
    if (apiErr) {
      setTimeout(() => {
        setApiErr("");
      }, 2000);
    }
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg("");
        handleClose()
        // addEnq.current.click();
      }, 2000);
    }
  }, [apiErr, successMsg]);

  // eslint-disable-next-line no-unused-vars
  const [editEnquiry, { isLoading, error }] = useEditEnquiryMutation();

  const onSubmit = async (data) => {
    // Handle form submission here
    // console.log(addEnq.current.click())
    try {
      const response = await editEnquiry({ data });
      console?.log(response, response?.data?.message);
      if (response?.data?.status) {
        setSuccessMsg(response?.data?.message);
        localStorage.removeItem("editEnq");
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
        setError("address", {
          type: "apierr",
          message: response?.error.data?.errors?.address,
        });
        setError("title", {
          type: "apierr",
          message: response?.error.data?.errors?.title,
        });
        setError("comment", {
          type: "apierr",
          message: response?.error.data?.errors?.comment,
        });
        setError("destination", {
          type: "apierr",
          message: response?.error.data?.errors?.destination,
        });
        setError("date", {
          type: "apierr",
          message: response?.error.data?.errors?.date,
        });
      } else if (response?.error?.data?.message) {
        setApiErr(response?.error?.data?.message);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };
  console.log(errors);

  
    const fetchCSC = async (value) => {
      try {
        const response = await axios.post(
          "https://controller.callcentreproject.com/bdo-api/get-postal-code",
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
      <form
        className="tablelist-form"
        autoComplete="true"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input className="hidden" defaultValue={info?.id} {...register("id")} />
        <input className="hidden" value={"NEW"} {...register("source")} />
        <div className="modal-body">
          <div className="row">
            <div className="col-lg-7 border-end">
              <div className="row">
                <div className="col-12 col-lg-6 mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Full Name <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="form-icon right">
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter name"
                      {...register("name", {
                        required: true,
                        message: "Name is required",
                      })}
                    />
                    <i className="ri-shield-user-line"></i>
                    {
                      <span className="error text-red-600">
                        {errors?.name?.type == "required" && "Name is required"}
                        {errors?.name?.type == "apierr" &&
                          errors?.name?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <label htmlFor="emailInput" className="form-label">
                    Email <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="form-icon right">
                    <input
                      type="email"
                      className="form-control form-control-icon"
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
                    {
                      <span className="error text-red-600">
                        {errors?.email?.type == "required" &&
                          "Email is required"}
                        {errors?.email?.type == "pattern" && "Invalid email"}
                        {errors?.email?.type == "apierr" &&
                          errors?.email?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <label htmlFor="mobileInput" className="form-label">
                    Mobile Number <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="form-icon right">
                    <input
                      type="mobile"
                      className="form-control"
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
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <label htmlFor="addressInput" className="form-label">
                    Address <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="form-icon right">
                    <input
                      type="address"
                      className="form-control"
                      id="addressInput"
                      placeholder="Enter Address"
                      {...register("address", {
                        required: true,
                        message: "Address is required",
                        maxLength: 250,
                        minLength: 25,
                      })}
                    />
                    <i className="ri-map-pin-line"></i>
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
                </div>
                <div className="col-12 col-lg-4 mb-3">
                  <label htmlFor="pinInput" className="form-label">
                    Pin Code <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="form-icon right">
                    <input
                      type="number"
                      className="form-control"
                      id="pinInput"
                      placeholder="Enter Postal Code"
                      {...register("zip", {
                        required: true,
                        message: "Zip code is required",
                      })}
                    />
                    <i className="ri-map-pin-fill"></i>
                    {
                      <span className="error text-red-600">
                        {errors?.zip?.type == "required" &&
                          "Zip code is required"}
                        {errors?.zip?.type == "apierr" && errors?.zip?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-12 col-lg-4 mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    State <span className="text-danger">*</span>
                  </label>
                  <div className="form-icon right">
                    <input
                      type="text"
                      className="form-control"
                      id="stateInput"
                      placeholder="Enter State"
                      {...register("state", {
                        required: true,
                        message: "State is required",
                      })}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.state?.type == "required" &&
                          "State is required"}
                        {errors?.state?.type == "apierr" &&
                          errors?.state?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-12 col-lg-4 mb-3">
                  <label htmlFor="cityInput" className="form-label">
                    City <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="form-icon left">
                    <input
                      type="text"
                      className="form-control"
                      id="cityInput"
                      placeholder="Enter State"
                      {...register("city", {
                        required: true,
                        message: "City is required",
                      })}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.city?.type == "required" && "City is required"}
                        {errors?.city?.type == "apierr" &&
                          errors?.city?.message}
                      </span>
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <input type="hidden" id="taskid-input" className="form-control" />
              <div className="mb-3">
                <label htmlFor="task-title-input" className="form-label">
                  Comment Title
                </label>
                <input
                  type="text"
                  id="task-title-input"
                  className="form-control"
                  placeholder="Enter task title"
                  {...register("title", {
                    required: true,
                    message: "Comment title is required",
                  })}
                />
                {
                  <span className="error text-red-600">
                    {errors?.title?.type == "required" &&
                      "Comment title is required"}
                    {errors?.title?.type == "apierr" && errors?.title?.message}
                  </span>
                }
              </div>
              <div className="mb-3">
                <label htmlFor="task-title-input" className="form-label">
                  Comment
                </label>
                <textarea
                  name="name"
                  className="form-control"
                  rows=""
                  cols=""
                  {...register("comment", {
                    required: true,
                    message: "Comment is required",
                  })}
                ></textarea>
                {
                  <span className="error text-red-600">
                    {errors?.comment?.type == "required" &&
                      "Comment is required"}
                    {errors?.comment?.type == "apierr" &&
                      errors?.comment?.message}
                  </span>
                }
                {/* <!-- <input type="text" id="task-title-input" class="form-control" placeholder="Enter task title"> --> */}
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="task-assign-input" className="form-label">
                  Assigned To : <span className="text-muted">Staff Name</span>{" "}
                </label>
                <div
                  className="avatar-group justify-content-center"
                  id="assignee-member"
                >
                  <a
                    className="avatar-group-item mb-2"
                    data-img="/assets/images/users/avatar-3.jpg"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="John Robles"
                  >
                    <img
                      src="/assets/images/users/avatar-3.jpg"
                      alt=""
                      className="rounded-circle avatar-xs"
                    />
                  </a>
                </div>
              </div>
              <div className="row g-4 mb-3">
                <div className="col-lg-12">
                  <label htmlFor="task-status" className="form-label">
                    Status
                  </label>
                  <div>
                    <Select
                      className=" "
                      {...register("destination", {
                        required: true,

                        message: "status is required",
                      })}
                      value={{ value: "RINGING", label: "RINGING" }}
                      options={[
                        { value: "RINGING", label: "RINGING" },
                        { value: "POSTPONED", label: "POSTPONED" },
                        {
                          value: "NOTINTERESTED",
                          label: "NOTINTERESTED",
                        },
                      ]}
                      onChange={(e) => console.log(e?.value)}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.destination?.type == "required" &&
                          "Status is required"}
                        {errors?.destination?.type == "apierr" &&
                          errors?.destination?.message}
                      </span>
                    }
                  </div>
                </div>
                {/* <!--end col--> */}
                {/* <div className="col-lg-6">
                      <label htmlFor="priority-field" className="form-label">
                        Post Time
                      </label>
                      <input
                        type="text"
                        className="form-control flatpickr-input active"
                        data-provider="timepickr"
                        data-time-hrs="true"
                        id="timepicker-24hrs"
                        readOnly="readonly"
                      />
                    </div> */}
                {/* <!--end col--> */}
              </div>
              <div className="mb-4">
                <label htmlFor="task-duedate-input" className="form-label">
                  Post Date
                </label>
                <Flatpickr
                  options={{
                    // mode: "range",
                    enableTime: true,
                    dateFormat: "d-M-Y H:i",
                    defaultDate: new Date(),
                  }}
                  className="form-control bg-light border-light"
                  {...register("date", {
                    required: true,
                    message: "Post date is required",
                  })}
                />
                {
                  <span className="error text-red-600">
                    {errors?.date?.type == "required" &&
                      "Post Date is required"}
                    {errors?.date?.type == "apierr" && errors?.date?.message}
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="flex items-center justify-between">
            <div className="">
              <p className="text-danger text-center">{apiErr}</p>
              <p className="text-success text-center">{successMsg}</p>
            </div>

            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-light"
                id="close-modal"
                data-bs-dismiss="modal"
              >
                Close
              </button>
                <div className="text-end">
                  {!isLoading && (
                    <button
                      type="submit"
                      className="btn btn-primary bg-primary"
                      id="sa-success"
                      // onClick={() => handleSubmit(onSubmit())}
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
                        <span className="flex-grow-1 me-2">Please Wait...</span>
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
      </form>
    </>
  );
}
