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
              name="name"
              rows="2"
              className="form-control"
              placeholder="Address"
            ></textarea>
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              City
            </label>
            <Select
              className="js-example-basic-single"
              name="city"
              placeholder="Select City"
              options={[
                {
                  value: "Alabama",
                  label: "Alabama",
                },
                {
                  value: "Madrid",
                  label: "Madrid",
                },
                {
                  value: "Toronto",
                  label: "Toronto",
                },
                {
                  value: "Londan",
                  label: "Londan",
                },
                {
                  value: "Wyoming",
                  label: "Wyoming",
                },
              ]}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              State
            </label>
            <Select
              className="js-example-basic-single"
              name="state"
              placeholder="Select State"
              options={[
                {
                  value: "Alabama",
                  label: "Alabama",
                },
                {
                  value: "Madrid",
                  label: "Madrid",
                },
                {
                  value: "Toronto",
                  label: "Toronto",
                },
                {
                  value: "Londan",
                  label: "Londan",
                },
                {
                  value: "Wyoming",
                  label: "Wyoming",
                },
              ]}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              Country
            </label>
            <Select
              className="js-example-basic-single"
              name="country"
              placeholder="Select Country"
              options={[
                {
                  value: "Alabama",
                  label: "Alabama",
                },
                {
                  value: "Madrid",
                  label: "Madrid",
                },
                {
                  value: "Toronto",
                  label: "Toronto",
                },
                {
                  value: "Londan",
                  label: "Londan",
                },
                {
                  value: "Wyoming",
                  label: "Wyoming",
                },
              ]}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              Zip Code
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Zip Code"
            />
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
              name="name"
              rows="2"
              className="form-control"
              placeholder="Address"
            ></textarea>
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              City
            </label>
            <Select
              className="js-example-basic-single"
              name="city"
              placeholder="Select City"
              options={[
                {
                  value: "Alabama",
                  label: "Alabama",
                },
                {
                  value: "Madrid",
                  label: "Madrid",
                },
                {
                  value: "Toronto",
                  label: "Toronto",
                },
                {
                  value: "Londan",
                  label: "Londan",
                },
                {
                  value: "Wyoming",
                  label: "Wyoming",
                },
              ]}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              State
            </label>
            <Select
              className="js-example-basic-single"
              name="state"
              placeholder="Select State"
              options={[
                {
                  value: "Alabama",
                  label: "Alabama",
                },
                {
                  value: "Madrid",
                  label: "Madrid",
                },
                {
                  value: "Toronto",
                  label: "Toronto",
                },
                {
                  value: "Londan",
                  label: "Londan",
                },
                {
                  value: "Wyoming",
                  label: "Wyoming",
                },
              ]}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              Country
            </label>
            <Select
              className="js-example-basic-single"
              name="country"
              placeholder="Select Country"
              options={[
                {
                  value: "Alabama",
                  label: "Alabama",
                },
                {
                  value: "Madrid",
                  label: "Madrid",
                },
                {
                  value: "Toronto",
                  label: "Toronto",
                },
                {
                  value: "Londan",
                  label: "Londan",
                },
                {
                  value: "Wyoming",
                  label: "Wyoming",
                },
              ]}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="placeholderInput" className="form-label">
              Zip Code
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Zip Code"
            />
          </div>
        </div>
        </div>
        </form>
    </>
  );
}
