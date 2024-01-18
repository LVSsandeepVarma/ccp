/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import Flatpickr from "react-flatpickr";
import {Modal} from "react-bootstrap"
import {
  useCommentEnquiryMutation,
  useCommentLogsQuery,
} from "../../services/api";
import axios from "axios"

// eslint-disable-next-line no-unused-vars
export default function Comments({type, logData, onHide}) {
  const [apiErr, setApiErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("cmtEnq"));
  console.log(userInfo, type, logData);

    const {
      register,
      handleSubmit,
      setError,
      watch,
      setValue,
      formState: { errors },
    } = useForm({
      defaultValues: {
        id: userInfo?.id ? userInfo?.id : "",
        destination: "POSTPONED",
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

  
    const { data: commentsLogs, isLoading: loading, error: logError } = useCommentLogsQuery({id:logData?.id, position: type?.toUpperCase()});

    useEffect(() => {
      if (apiErr) {
        setTimeout(() => {
          setApiErr("");
        }, 2000);
      }
      if (successMsg) {
        setTimeout(() => {
          setSuccessMsg("");
          onHide()
          // addEnq.current.click();
        }, 2000);
      }
    }, [apiErr, successMsg]);

    // eslint-disable-next-line no-unused-vars
  const [commentEnquiry, { isLoading, error }] = useCommentEnquiryMutation();
  


  console.log(commentsLogs, loading,logError)

    const onSubmit = async (data) => {
      // Handle form submission here
      // console.log(addEnq.current.click())
      try {
        const response = await commentEnquiry({ data });
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
            setValue("country", response?.data?.data?.postal_data?.country);
          }
        } catch (err) {
          console.log(err);
        }
      };

      // const handleBillingBlur =  () => {
      //   // Check if there are no validation errors

      // };
      useEffect(() => {
        if (zipcode?.length == 6) {
          console.log(zipcode, "billingzip");
          fetchCSC(zipcode, "billing");
        }
      }, [zipcode]);

  return (
    <>
          <div className="row ">
            <div className="col-lg-6 border-end">
              <div className="modal-header p-3 bg-soft-success">
                <h5 className="modal-title h5" id="createTaskLabel">
                  Create Comment
                </h5>
              </div>
              <Modal.Body className="modal-body">
                <div
                  id="task-error-msg"
                  className="alert alert-danger py-2"
                ></div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="off"
                  action=""
                  id="creattask-form"
                >
                  <input
                    type="hidden"
                    id="taskid-input"
                    className="form-control"
                    {...register("id")}
                  />
                  <input
                    className="hidden"
                    value={type?.toUpperCase()}
                    {...register("source")}
                  />
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
                        {errors?.title?.type == "apierr" &&
                          errors?.title?.message}
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
                      Assigned To :{" "}
                      <span className="text-muted">Staff Name</span>{" "}
                    </label>
                    <div
                      className="avatar-group justify-content-center"
                      id="assignee-member"
                    >
                      <a
                        href="javascript: void(0);"
                        className="avatar-group-item mb-2"
                        data-img="assets/images/users/avatar-3.jpg"
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
                          value={{ value: "POSTPONED", label: "POSTPONED" }}
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
                        {errors?.date?.type == "apierr" &&
                          errors?.date?.message}
                      </span>
                    }
                  </div>
                  <div className="modal-footer">
                    <div className="flex items-center justify-between">
                      <div className="">
                        <p className="text-danger text-start">{apiErr}</p>
                        <p className="text-success text-start">{successMsg}</p>
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
                </form>
              </Modal.Body>
            </div>
            <div className="col-lg-6">
              <Modal.Header className="modal-header p-3 bg-soft-success">
                <h5 className="modal-title h5" id="createTaskLabel">
                  Comments Logs
                </h5>
                <button
                  className="btn btn-close font-bold flex items-center text-xl"
                  data-bs-dismiss="modal"
                  id="createTaskBtn-close"
                  aria-label="Close"
                >
                  X
                </button>
              </Modal.Header>
              <SimpleBar className="modal-body max-h-[550px]" data-simplebar>
                <div>
                  <div className="timeline-2">
                    <div className="timeline-continue">
                      {commentsLogs?.data?.comments?.map((comment, ind) => (
                        <div className="row timeline-right" key={ind}>
                          <div className="col-12">
                            <p className="timeline-date">
                              {new Date(comment?.comment_date).toLocaleString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </p>
                          </div>
                          <div className="col-12">
                            <div className="timeline-box">
                              <div className="timeline-text">
                                <h5 className="mb-0 fs-15 h5">
                                  {comment?.candidate}
                                </h5>
                                <p className="text-muted mb-0 fs-12">
                                  {comment?.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SimpleBar>
            </div>
          </div>
    </>
  );
}
