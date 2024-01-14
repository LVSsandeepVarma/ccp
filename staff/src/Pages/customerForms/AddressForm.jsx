/* eslint-disable react/prop-types */
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {  useUpdateProfileMutation } from "../../services/api";
import Loader from "../Loader";

export default function AddressForm({ userInfo }) {
  const [apiErr, setApiErr] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  console.log(userInfo);
  const {
    // eslint-disable-next-line no-unused-vars
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: customerInfo,
    mode: "all",
  });

  const [updateProfile, { isLoading, error }] = useUpdateProfileMutation();
  console.log(error);



  useEffect(() => {
    const values = {
      id: userInfo?.id ? userInfo?.id : "",
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

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-lg-6">
          <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
            <h4 className="mb-0 text-2xl font-bold">Billing Address</h4>
            <span className="text-muted cursor-pointer">
              Same as Customer Info
            </span>
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              Street
            </label>
            <textarea
              name="b_address"
              rows="2"
              className="form-control"
              placeholder="Billing Address"
              {...register("b_address", {
                required: true,
                message: "Billing Address is required",
              })}
            ></textarea>
            {
              <span className="error text-red-600">
                {errors?.b_address?.type == "required" && "Billing address is required"}
                {errors?.b_address?.type == "apierr" && errors?.b_address?.message}
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
                {...register("b_zip", {
                  required: true,
                  message: "Billing Zip code is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.b_zip?.type == "required" && "Zip code is required"}
                  {errors?.b_zip?.type == "apierr" && errors?.b_zip?.message}
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
                {...register("b_city", {
                  required: true,
                  message: "Billing City is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.b_city?.type == "required" && "City is required"}
                  {errors?.b_city?.type == "apierr" && errors?.b_city?.message}
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
                {...register("b_state", {
                  required: true,
                  message: "Billing state is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.b_state?.type == "required" && "State is required"}
                  {errors?.b_state?.type == "apierr" && errors?.b_state?.message}
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
                {...register("b_country", {
                  required: true,
                  message: "Billing Country is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.b_country?.type == "required" && "Country is required"}
                  {errors?.b_country?.type == "apierr" &&
                    errors?.b_country?.message}
                </span>
              }
          </div>
          
        </div>
        <div className="col-lg-6">
          <div className="d-flex align-items-center justify-content-between border-bottom pb-2">
            <h4 className="mb-0 text-2xl font-bold">Shipping Address</h4>
            <span className="text-muted cursor-pointer">
              Copy Billing Address
            </span>
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              Street
            </label>
            <textarea
              name="s_address"
              rows="2"
              className="form-control"
              placeholder="Shipping Address"
              {...register("s_address", {
                required: true,
                message: "Shipping Address is required",
              })}
            ></textarea>
            {
              <span className="error text-red-600">
                {errors?.s_address?.type == "required" && "Shipping address is required"}
                {errors?.s_address?.type == "apierr" && errors?.s_address?.message}
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
                {...register("s_zip", {
                  required: true,
                  message: "Shipping Zip code is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.s_zip?.type == "required" && "Zip code is required"}
                  {errors?.s_zip?.type == "apierr" && errors?.s_zip?.message}
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
                {...register("s_city", {
                  required: true,
                  message: "Shipping City is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.s_city?.type == "required" && "City is required"}
                  {errors?.s_city?.type == "apierr" && errors?.s_city?.message}
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
                {...register("s_state", {
                  required: true,
                  message: "Shipping State tate is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.s_state?.type == "required" && "State is required"}
                  {errors?.s_state?.type == "apierr" && errors?.s_state?.message}
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
                {...register("s_country", {
                  required: true,
                  message: "Shipping Country is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.s_country?.type == "required" && "Country is required"}
                  {errors?.s_country?.type == "apierr" &&
                    errors?.s_country?.message}
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
