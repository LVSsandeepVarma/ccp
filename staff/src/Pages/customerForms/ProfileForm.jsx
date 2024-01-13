/* eslint-disable react/prop-types */
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useCurrencyQuery, useUpdateProfileMutation } from "../../services/api";
import Loader from "../Loader";


export default function ProfileForm({userInfo}) {
  const [apiErr, setApiErr] = useState("");
  const [customerInfo, setCustomerInfo] = useState({});
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [successMsg, setSuccessMsg] = useState("");
  console.log(userInfo);
  const {
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

  const {
    data: currency,
    isLoading: loading,
    error: currencyErr,
  } = useCurrencyQuery();
  console.log(currency, loading, currencyErr);

  useEffect(() => {
    const res = currency?.data?.currencies?.map(option => ({
      value: option?.id,
      label: `${option?.name} (${option?.symbol})`
    }))
    console.log(res,"currency", currency)
    setCurrencyOptions(res)

  }, [currency])
    useEffect(() => {
      const values = {
        id: userInfo?.id ? userInfo?.id : "",
        company: userInfo?.company ? userInfo?.company : "",
        phone: userInfo?.phone ? userInfo?.phone : "",
        gst_no: userInfo?.gst_no ? userInfo?.gst_no : "",
        website: userInfo?.website ? userInfo?.website : "",
        address: userInfo?.address ? userInfo?.address : "",
        city: userInfo?.city ? userInfo?.city : "",
        state: userInfo?.state ? userInfo?.state : "",
        country: userInfo?.country ? userInfo?.country : "",
        zip: userInfo?.zip ? userInfo?.zip : "",
        currency:1,
      };

      setValue("currency", {
        value: 1,
        label: "INR (₹)",
      });
      setCustomerInfo(values);
      reset(values);
    }, [userInfo, currency]);

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

        setError("company", {
          type: "apierr",
          message: response?.error.data?.errors?.company,
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
        setError("gst_no", {
          type: "apierr",
          message: response?.error.data?.errors?.gst_no,
        });
        setError("address", {
          type: "apierr",
          message: response?.error.data?.errors?.address,
        });
        setError("currency", {
          type: "apierr",
          message: response?.error.data?.errors?.currency,
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
        <input className="hidden" {...register("id")} />
        <div className="row">
          <div className="col-xxl-3 col-md-6">
            <label htmlFor="placeholderInput" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Company Name"
              {...register("company", {
                required: true,
                message: "Company is required",
              })}
            />
            {
              <span className="error text-red-600">
                {errors?.company?.type == "required" && "Company is required"}
                {errors?.company?.type == "apierr" && errors?.company?.message}
              </span>
            }
          </div>
          <div className="col-xxl-3 col-md-6">
            <label htmlFor="placeholderInput" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Phone Number"
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
                {errors?.phone?.type == "pattern" && "Invalid Mobile number"}
                {errors?.phone?.type == "maxLength" && "Invalid Mobile number"}
                {errors?.phone?.type == "minLength" && "Invalid Mobile number"}
                {errors?.phone?.type == "apierr" && errors?.phone?.message}
              </span>
            }
          </div>
          <div className="col-xxl-3 col-md-6">
            <label htmlFor="placeholderInput" className="form-label">
              VAT/GST Number
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="VAT/GST Number"
              {...register("gst_no", {
                required: true,
                message: "GST is required",
              })}
            />
            {
              <span className="error text-red-600">
                {errors?.gst_no?.type == "required" && "GST no is required"}
                {errors?.gst_no?.type == "apierr" && errors?.gst_no?.message}
              </span>
            }
          </div>
          <div className="col-xxl-3 col-md-6">
            <label htmlFor="placeholderInput" className="form-label">
              Website
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Company Website"
              {...register("website", {
                required: true,
                message: "Website is required",
              })}
            />
            {
              <span className="error text-red-600">
                {errors?.website?.type == "required" && "Website is required"}
                {errors?.website?.type == "apierr" && errors?.website?.message}
              </span>
            }
          </div>
          <div className="col-xxl-12 col-md-12 mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              Company Address
            </label>
            <textarea
              name="name"
              rows="2"
              className="form-control"
              placeholder="Address"
              {...register("address", {
                required: true,
                message: "Address is required",
              })}
            ></textarea>
            {
              <span className="error text-red-600">
                {errors?.address?.type == "required" && "Address is required"}
                {errors?.address?.type == "apierr" && errors?.address?.message}
              </span>
            }
          </div>
          <div className="col-12 col-lg-4 mt-3">
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
              {
                <span className="error text-red-600">
                  {errors?.zip?.type == "required" && "Zip code is required"}
                  {errors?.zip?.type == "apierr" && errors?.zip?.message}
                </span>
              }
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3">
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
                  {errors?.state?.type == "required" && "State is required"}
                  {errors?.state?.type == "apierr" && errors?.state?.message}
                </span>
              }
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3">
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
                  {errors?.city?.type == "apierr" && errors?.city?.message}
                </span>
              }
            </div>
          </div>
          <div className="col-xxl-3 col-md-6 mt-3">
            <label htmlFor="countryInput" className="form-label">
              Country <span className="text-danger">*</span>{" "}
            </label>
            <div className="form-icon left">
              <input
                type="text"
                className="form-control"
                id="countryInput"
                placeholder="Enter Country"
                {...register("country", {
                  required: true,
                  message: "Country is required",
                })}
              />
              {
                <span className="error text-red-600">
                  {errors?.country?.type == "required" && "Country is required"}
                  {errors?.country?.type == "apierr" &&
                    errors?.country?.message}
                </span>
              }
            </div>
          </div>

          <div className="col-xxl-3 col-md-6 my-3">
            <label htmlFor="placeholderInput" className="form-label">
              Currency
            </label>
            <Select
              className="js-example-basic-single"
              name="currency"
              placeholder="Select Currency"
              options={currencyOptions}
              defaultValue={{ label: "INR (₹)", value: 1 }}
              {...register("currency", {
                required: true,
                message: "Currency is required",
              })}
            />
            {
              <span className="error text-red-600">
                {errors?.currency?.type == "required" && "Currency is required"}
                {errors?.currency?.type == "apierr" &&
                  errors?.currency?.message}
              </span>
            }
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="">
            <p className="text-danger text-center">{apiErr}</p>
            <p className="text-success text-center">{successMsg}</p>
          </div>

          <div className="hstack gap-2 justify-content-end">
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
