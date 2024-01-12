/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { useState } from "react";
import Comments from "./Comments";


const CommonTable = ({ enquiriesData, type }) => {
    const [editEnq, setEditEnq] = useState({});

  const handleNext = () => {
    return;
  };

   const handleCommentEnquiry = (row) => {
     console.log(row);
     localStorage.setItem("cmtEnq", JSON.stringify(row));
     setEditEnq(row);
   };

  const handlePrevious = () => {
    return;
  };
  // Render the table
  return (
    <>
      <div className="">
        <table className="table responsive w-100" id="example">
          <thead className="table-light text-muted">
            <tr>
              <th scope="col" className="w-[40px]">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkAll"
                    value="option"
                  />
                </div>
              </th>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Ringing Date</th>
              <th>Message</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="list form-check-all">
            {enquiriesData?.data?.enquiries?.data?.length > 0 &&
              enquiriesData?.data?.enquiries?.data?.map((row, ind) => (
                <tr key={ind}>
                  <th scope="row" className="">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="chk_child"
                        value="option1"
                      />
                    </div>
                  </th>
                  <td className="text-start">
                    <a href="" className="fw-medium link-primary">
                      {row?.id}
                    </a>
                  </td>
                  <td className="text-start">
                    <a className="fw-medium link-primary fs-16">{row?.name}</a>
                    <p className="mb-0">{row?.email}</p>
                  </td>
                  <td className="text-start">
                    <span>{row?.phone}</span>
                  </td>
                  <td className="text-start">
                    <span className="badge badge-soft-secondary p-2 fs-12">
                      {new Date(row?.created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="text-start">
                    <span>{row?.message} </span>
                  </td>
                  <td className="text-start">Comment</td>
                  <td className="text-start">
                    <span className="badge bg-warning-subtle text-warning text-uppercase">
                      Lead
                    </span>
                  </td>
                  <td className="text-start">
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Comment"
                      onClick={() => handleCommentEnquiry(row)}
                    >
                      <button
                        className="btn btn-soft-info py-1 btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#createTask"
                        onClick={() => handleCommentEnquiry(row)}
                      >
                        <span className="">
                          <i className="mdi mdi-comment-outline align-middle fs-15"></i>
                        </span>
                      </button>
                    </a>
                    <a
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Convert to Customer"
                    >
                      <button
                        className="btn btn-soft-primary py-1 btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#convertCustomer"
                      >
                        <span className="">
                          <i className="mdi mdi-account-edit-outline align-middle fs-15"></i>
                        </span>
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <div className="">
          <div
            className="dataTables_info"
            id="example_info"
            role="status"
            aria-live="polite"
          >
            Showing 1 to {enquiriesData?.data?.enquiries?.to} of{" "}
            {enquiriesData?.data?.enquiries?.total} entries
          </div>
        </div>
        <div className="">
          <div
            className="dataTables_paginate paging_simple_numbers"
            id="example_paginate"
          >
            <ul className="pagination">
              <li
                className={`paginate_button page-item next ${
                  enquiriesData?.data?.enquiries?.previous_page_url != null
                    ? ""
                    : "disabled "
                } `}
                id="example_previous"
              >
                <a
                  onClick={() => handlePrevious()}
                  aria-controls="example"
                  data-dt-idx="0"
                  tabIndex="0"
                  className={`page-link ${
                    enquiriesData?.data?.enquiries?.previous_page_url != null
                      ? ""
                      : "!bg-gray-200 "
                  }`}
                >
                  Previous
                </a>
              </li>
              <li className="paginate_button page-item active">
                <a
                  href="#"
                  aria-controls="example"
                  data-dt-idx="1"
                  tabIndex="0"
                  className="page-link"
                >
                  {enquiriesData?.data?.enquiries?.current_page}
                </a>
              </li>
              <li
                className={`paginate_button page-item next ${
                  enquiriesData?.data?.enquiries?.next_page_url != null
                    ? ""
                    : "disabled "
                } `}
                id="example_next"
              >
                <a
                  onClick={() => handleNext()}
                  aria-controls="example"
                  data-dt-idx="2"
                  tabIndex="0"
                  className={`page-link ${
                    enquiriesData?.data?.enquiries?.next_page_url != null
                      ? ""
                      : "!bg-gray-200 "
                  }`}
                >
                  Next
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="createTask"
        tabIndex="-1"
        aria-labelledby="createTaskLabel"
        aria-hidden="false"
      >
        {editEnq && <Comments type={type} />}
        {/* {editEnqId && <EditEnquiry info={editEnqId} />} */}
      </div>
    </>
  );
};

export default CommonTable;
