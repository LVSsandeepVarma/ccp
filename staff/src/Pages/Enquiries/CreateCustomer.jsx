/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCustomerMutation } from "../../services/api";
import axios from "axios";

export default function CreateCustomer({ id,type, onHide }) {
  const [apiErr, setApiErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [customerId, setCustomerId] = useState("")
  console.log(type)

  useEffect(() => {
    if (successMsg != "") {
      setTimeout(() => {
        setSuccessMsg("");
        onHide();
      }, 1500);
    }
    
  },[successMsg])



      const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: { errors },
      } = useForm({
        defaultValues: {
          id: id,
        },
        mode: "all",
      });
  
  const zipcode = watch("zip");
  
    useEffect(() => {
      setCustomerId(id);
      setValue("id", id)
      setValue("source", type?.toUpperCase())
    }, [id, type]);
  
  
  const [addEnquiry, { isLoading, error }] = useCreateCustomerMutation();

    const onSubmit = async (data) => {
      // Handle form submission here
      // console.log(addEnq.current.click())
      try {
        const response = await addEnquiry({ data });
        console?.log(response, response?.data?.message);
        if (response?.data?.status) {
          setSuccessMsg(response?.data?.message);
          return;
        }
        if (response?.error?.data?.errors != {}) {
          console.log(response, response?.error.data?.errors?.email);

          setError("first_name", {
            type: "apierr",
            message: response?.error.data?.errors?.first_name,
          });
          setError("last_name", {
            type: "apierr",
            message: response?.error.data?.errors?.last_name,
          });
          setError("position", {
            type: "apierr",
            message: response?.error.data?.errors?.position,
          });
          setError("phone", {
            type: "apierr",
            message: response?.error.data?.errors?.phone,
          });
          setError("email", {
            type: "apierr",
            message: response?.error.data?.errors?.email,
          });
          setError("comapany", {
            type: "apierr",
            message: response?.error.data?.errors?.company,
          });
          setError("website", {
            type: "apierr",
            message: response?.error.data?.errors?.website,
          });
          setError("gst_no", {
            type: "apierr",
            message: response?.error.data?.errors?.get_no,
          });
          setError("address", {
            type: "apierr",
            message: response?.error.data?.errors?.address,
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
          setError("country", {
            type: "apierr",
            message: response?.error.data?.errors?.country,
          });
        } else if (response?.error?.data?.message) {
          setApiErr(response?.error?.data?.message);
        }
      } catch (err) {
        console.log(err, "err");
      }
    };
    console.log(errors);
    if (error) {
      console.log(error);
      console.log(error?.data?.errors?.email);
  }

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
            setValue("country", response?.data?.data?.postal_data?.country);
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
      
            <div id="task-error-msg" className="alert alert-danger py-2"></div>
            <form
              autoComplete="on"
              action=""
              id=""
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* <!-- <div class="text-danger">
                                 * marked are mandatory fields
                               </div> --> */}
              <div className="row">
                <div className="col-lg-3">
                  <input
                    type="hidden"
                    id="taskid-input"
                    className="form-control"
                    {...register("id")}
                  />
                  <input
                    type="hidden"
                    id="taskid-input"
                    className="form-control"
                    {...register("source")}
                  />
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      First Name
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      id=""
                      className="form-control"
                      placeholder="Enter First Name"
                      {...register("first_name", {
                        required: true,
                        message: "First name title is required",
                      })}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.first_name?.type == "required" &&
                          "First name title is required"}
                        {errors?.first_name?.type == "apierr" &&
                          errors?.first_name?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Last Name
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id=""
                      className="form-control"
                      placeholder="Enter Last Name"
                      {...register("last_name", {
                        required: true,
                        message: "Last name title is required",
                      })}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.last_name?.type == "required" &&
                          "Last name title is required"}
                        {errors?.last_name?.type == "apierr" &&
                          errors?.last_name?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Position
                    </label>
                    <input
                      type="text"
                      id=""
                      className="form-control"
                      placeholder="Enter Position"
                      {...register("position", {
                        required: false,
                        message: "Position title is required",
                      })}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.position?.type == "required" &&
                          "Position title is required"}
                        {errors?.position?.type == "apierr" &&
                          errors?.position?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Phone Number
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id=""
                      className="form-control"
                      placeholder="Enter Phone Number"
                      {...register("phone", {
                        required: true,
                        message: "Number is required",
                        maxLength: 10,
                        minLength: 8,
                        pattern: /^\d{10}$/,
                      })}
                    />
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
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Email<span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      id=""
                      className="form-control"
                      placeholder="Enter Email"
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9_%+-.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,3}$/,
                        message: "Invalid email format",
                      })}
                    />
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
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Company
                    </label>
                    <input
                      type="text"
                      id=""
                      className="form-control"
                      placeholder="Enter Company"
                      {...register("company", {
                        required: false,
                        message: "Company is required",
                      })}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.company?.type == "required" &&
                          "Company is required"}
                        {errors?.company?.type == "apierr" &&
                          errors?.company?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Website
                    </label>
                    <input
                      type="text"
                      id=""
                      className="form-control"
                      placeholder="Enter Website"
                      {...register("website", {
                        required: false,
                        message: "Website is required",
                      })}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.website?.type == "required" &&
                          "Website is required"}
                        {errors?.website?.type == "apierr" &&
                          errors?.website?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      GST no
                    </label>
                    <input
                      type="text"
                      id=""
                      className="form-control"
                      placeholder="Enter Website"
                      {...register("gst_no", {
                        required: false,
                        message: "GST no is required",
                      })}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.gst_no?.type == "required" &&
                          "GST no is required"}
                        {errors?.gst_no?.type == "apierr" &&
                          errors?.gst_no?.message}
                      </span>
                    }
                  </div>
                </div>
                <div className="col-12-lg">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Address
                    </label>
                    <textarea
                      name="name"
                      className="form-control"
                      rows=""
                      cols=""
                      {...register("address", {
                        required: false,
                        message: "Address is required",
                        maxLength: 250,
                        minLength: 25,
                      })}
                    ></textarea>
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
                <div className="col-12 col-lg-3 mb-3">
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
                <div className="col-12 col-lg-3 mb-3">
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
                <div className="col-12 col-lg-3 mb-3">
                  <label htmlFor="cityInput" className="form-label">
                    City <span className="text-danger">*</span>{" "}
                  </label>
                  <div className="form-icon left">
                    <input
                      type="text"
                      className="form-control"
                      id="cityInput"
                      placeholder="Enter City"
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
                <div className="col-12 col-lg-3 mb-3">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Country
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="countryInput"
                      placeholder="Enter City"
                      {...register("country", {
                        required: false,
                        message: "City is required",
                      })}
                    />
                    {
                      <span className="error text-red-600">
                        {errors?.country?.type == "required" &&
                          "Country is required"}
                        {errors?.country?.type == "apierr" &&
                          errors?.country?.message}
                      </span>
                    }
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="">
                  <p className="text-danger text-center">{apiErr}</p>
                  <p className="text-success text-center">{successMsg}</p>
                </div>
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-ghost-danger"
              data-bs-dismiss="modal"
              onClick={onHide}
                  >
                    <i className="ri-close-fill align-bottom"></i> Cancel
                  </button>
                  {!isLoading && (
                    <button
                      type="submit"
                      className="btn btn-primary bg-primary"
                    >
                      <i className="mdi mdi-account-edit-outline align-middle fs-15 me-1"></i>
                      Convert to Customer
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
            </form>
          
    </>
  );
}