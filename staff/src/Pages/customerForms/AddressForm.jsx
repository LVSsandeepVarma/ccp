/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {  useUpdateProfileAddressMutation } from "../../services/api";
import Loader from "../Loader";
import axios from  "axios"

export default function AddressForm({ userInfo, id }) {
  const [apiErr, setApiErr] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [shippingSameAsBilling, setShippingSameAsBilling] = useState(false)

  console.log(userInfo);
  const {
    // eslint-disable-next-line no-unused-vars
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: customerInfo,
    mode: "all",
  });

  const billingZip = watch("billing_zip");
  const shippingZip = watch("shipping_zip");
  const billing_address = watch("billing_address");
  const billingState = watch("billing_state");
  const billingCity = watch("billing_city")
  const billingCountry = watch("billing_country");
 
  const [updateProfile, { isLoading, error }] = useUpdateProfileAddressMutation();
  console.log(error);


  useEffect(() => {
    setValue("shipping_address", billing_address);
    setValue("shipping_zip", billingZip);
    setValue("shipping_city", billingCity)
    setValue("shipping_state", billingState);
    setValue("shipping_country", billingCountry);
    trigger("shipping_address");
    trigger("shipping_zip");
    trigger("shipping_city");
    trigger("shipping_state");
    trigger("shipping_country");

  },[shippingSameAsBilling])




  useEffect(() => {
    const values = {
      id: userInfo?.id ? userInfo?.id : id,
      billing_city: userInfo?.billing_city ? userInfo?.billing_city : "",
      billing_state: userInfo?.billing_state ? userInfo?.billing_state : "",
      billing_country: userInfo?.billing_country
        ? userInfo?.billing_country
        : "",
      billing_zip: userInfo?.billing_zip ? userInfo?.billing_zip : "",
      billing_address: userInfo?.billing_address
        ? userInfo?.billing_address
        : "",
      shipping_city: userInfo?.shipping_city ? userInfo?.shipping_city : "",
      shipping_state: userInfo?.shipping_state ? userInfo?.shipping_state : "",
      shipping_country: userInfo?.shipping_country
        ? userInfo?.shipping_country
        : "",
      shipping_zip: userInfo?.shipping_zip ? userInfo?.shipping_zip : "",
      shipping_address: userInfo?.shipping_address
        ? userInfo?.shipping_address
        : "",
    };

    setValue("currency", {
      value: 1,
      label: "INR (₹)",
    });
    trigger("currency")
    setValue("id", id)
    trigger("id")
    setCustomerInfo(values);
    reset(values);
  }, [userInfo]);

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

  const onSubmit = async (data) => {
    // Handle form submission here
    // console.log(addEnq.current.click())
    clearErrors();
    try {
      const response = await updateProfile({ data });
      console?.log(response, response?.data?.message);
      if (response?.data?.status) {
        setSuccessMsg(response?.data?.message);
        localStorage.removeItem("editEnq");
        return;
      }
      if (response?.error?.data?.errors != {}) {
        console.log(response, response?.error.data?.errors?.email);

        setError("billing_city", {
          type: "apierr",
          message: response?.error.data?.errors?.billing_city,
        });
        setError("billing_state", {
          type: "apierr",
          message: response?.error.data?.errors?.billing_state,
        });
        setError("billing_country", {
          type: "apierr",
          message: response?.error.data?.errors?.billing_country,
        });
        setError("billing_zip", {
          type: "apierr",
          message: response?.error.data?.errors?.billing_zip,
        });
        setError("billing_address", {
          type: "apierr",
          message: response?.error.data?.errors?.billing_address,
        });
        setError("shipping_city", {
          type: "apierr",
          message: response?.error.data?.errors?.shipping_city,
        });
        setError("shipping_state", {
          type: "apierr",
          message: response?.error.data?.errors?.shipping_state,
        });
        setError("shipping_country", {
          type: "apierr",
          message: response?.error.data?.errors?.shipping_country,
        });
        setError("shipping_zip", {
          type: "apierr",
          message: response?.error.data?.errors?.shipping_zip,
        });
        setError("shipping_address", {
          type: "apierr",
          message: response?.error.data?.errors?.shipping_address,
        });
      } else if (response?.error?.data?.message) {
        setApiErr(response?.error?.data?.message);
      }
    } catch (err) {
      console.log(err, "err");
    }
  };
  console.log(errors);


  const fetchCSC = async (value, fieldName) => {
    try { 
      const response = await axios.post(
        "https://controller.connetz.shop/bdo-api/get-postal-code", { zip: value }, {
          headers: {
          Authorization: `Bearer ${localStorage.getItem('staff_auth_token')}`,
        }}
      );
      console.log(response?.data);
      if (response) {
        
        if (fieldName == "shipping") {
          setValue("shipping_city", response?.data?.data?.postal_data?.taluq)
          setValue("shipping_state", response?.data?.data?.postal_data?.state);
          setValue("shipping_country", response?.data?.data?.postal_data?.country);
          trigger("shipping_city");
          trigger("shipping_state");
          trigger("shipping_country");
        } else {
          setValue("billing_city", response?.data?.data?.postal_data?.taluq);
          setValue("billing_state", response?.data?.data?.postal_data?.state);
          setValue(
            "billing_country",
            response?.data?.data?.postal_data?.country
          );
          trigger("billing_city");
          trigger("billing_state");
          trigger("billing_country");
        }
        
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  // const handleBillingBlur =  () => {
  //   // Check if there are no validation errors
    
  // };
  // useEffect(() => {
  //   console.log(billingZip, errors.billing_zip, "billingZip");
  //   if (billingZip?.length == 6) {
  //   console.log(billingZip, "billingzip");
  //   fetchCSC(billingZip, "billing");
  //   }
  // }, [billingZip])
  
  //   useEffect(() => {
  //     if (shippingZip?.length == 6) {
  //       console.log(shippingZip, "shippingzip");
  //       fetchCSC(shippingZip, "shipping");
  //     }
  //   }, [shippingZip]);


  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
              <h4 className="mb-0 text-2xl font-bold">Billing Address</h4>
              {/* <span className="text-muted cursor-pointer">
                Same as Customer Info
              </span> */}
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                Street
              </label>
              <textarea
                name="billing_address"
                rows="2"
                className="form-control"
                placeholder="Billing Address"
                {...register("billing_address", {
                  required: true,
                  message: "Billing Address is required",
                })}
              ></textarea>
              {
                <span className="error text-red-600">
                  {errors?.billing_address?.type == "required" &&
                    "Billing address is required"}
                  {errors?.billing_address?.type == "apierr" &&
                    errors?.billing_address?.message}
                </span>
              }
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                Zip Code
              </label>
              <input
                type="number"
                className="form-control"
                id="pinInput"
                placeholder="Enter Postal Code"
                {...register("billing_zip", {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                  onBlur: () => {
                    fetchCSC(billingZip, "billing");
                  },
                  message: "Billing Zip code is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.billing_zip?.type == "required" &&
                    "Zip code is required"}
                  {(errors?.billing_zip?.type == "minLength" ||
                    errors?.billing_zip?.type == "maxLength") &&
                    "Zip code is Invalid"}
                  {errors?.billing_zip?.type == "apierr" &&
                    errors?.billing_zip?.message}
                </span>
              }
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="cityInput"
                placeholder="Enter City"
                {...register("billing_city", {
                  required: true,
                  message: "Billing City is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.billing_city?.type == "required" &&
                    "City is required"}
                  {errors?.billing_city?.type == "apierr" &&
                    errors?.billing_city?.message}
                </span>
              }
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="stateInput"
                placeholder="Enter State"
                {...register("billing_state", {
                  required: true,
                  message: "Billing state is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.billing_state?.type == "required" &&
                    "State is required"}
                  {errors?.billing_state?.type == "apierr" &&
                    errors?.billing_state?.message}
                </span>
              }
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="countryInput"
                placeholder="Enter Country"
                {...register("billing_country", {
                  required: true,
                  message: "Billing Country is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.billing_country?.type == "required" &&
                    "Country is required"}
                  {errors?.billing_country?.type == "apierr" &&
                    errors?.billing_country?.message}
                </span>
              }
            </div>
          </div>
          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
              <h4 className="mb-0 text-2xl font-bold">Shipping Address</h4>
              <span className="text-muted cursor-pointer">
                <input
                  className="form-check-input mx-2"
                  type="checkbox"
                  name="checkAll"
                  value="option1"
                  onClick={()=>setShippingSameAsBilling(!shippingSameAsBilling)}
                  checked={shippingSameAsBilling}
                />
                Copy Billing Address
              </span>
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                Street
              </label>
              <textarea
                name="shipping_address"
                rows="2"
                className="form-control"
                placeholder="Shipping Address"
                {...register("shipping_address", {
                  required: true,
                  message: "Shipping Address is required",
                })}
              ></textarea>
              {
                <span className="error text-red-600">
                  {errors?.shipping_address?.type == "required" &&
                    "Shipping address is required"}
                  {errors?.shipping_address?.type == "apierr" &&
                    errors?.shipping_address?.message}
                </span>
              }
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                Zip Code
              </label>
              <input
                type="number"
                className="form-control"
                id="pinInput"
                placeholder="Enter Postal Code"
                {...register("shipping_zip", {
                  required: true,
                  message: "Shipping Zip code is required",
                  onBlur: () => {
                    fetchCSC(shippingZip, "shipping");
                  },
                  minLength: 6,
                  maxLength: 6,
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.shipping_zip?.type == "required" &&
                    "Zip code is required"}
                  {(errors?.shipping_zip?.type == "minLength" ||
                    errors?.shipping_zip?.type == "maxLength") &&
                    "Zip code is Invalid"}
                  {errors?.shipping_zip?.type == "apierr" &&
                    errors?.shipping_zip?.message}
                </span>
              }
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="cityInput"
                placeholder="Enter City"
                {...register("shipping_city", {
                  required: true,
                  message: "Shipping City is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.shipping_city?.type == "required" &&
                    "City is required"}
                  {errors?.shipping_city?.type == "apierr" &&
                    errors?.shipping_city?.message}
                </span>
              }
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                id="stateInput"
                placeholder="Enter State"
                {...register("shipping_state", {
                  required: true,
                  message: "Shipping State tate is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.shipping_state?.type == "required" &&
                    "State is required"}
                  {errors?.shipping_state?.type == "apierr" &&
                    errors?.shipping_state?.message}
                </span>
              }
            </div>
            <div className="mt-3">
              <label htmlFor="placeholderInput" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                id="countryInput"
                placeholder="Enter Country"
                {...register("shipping_country", {
                  required: true,
                  message: "Shipping Country is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.shipping_country?.type == "required" &&
                    "Country is required"}
                  {errors?.shipping_country?.type == "apierr" &&
                    errors?.shipping_country?.message}
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

          <div className="hstack gap-2 justify-content-end mt-3">
            <div className="text-end">
              {!isLoading && (
                <button
                  type="submit"
                  className="btn btn-primary bg-primary"
                  id="sa-success"
                  // onClick={() => handleSubmit(onSubmit())}
                >
                  Save
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
                      <span className="visually-hidden">Please Wait...</span>
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
