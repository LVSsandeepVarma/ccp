/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import EditEnquiry from "./EditEnquiryForm";
import { useLazyEnquiriesPaginationQuery } from "../../services/api";


    


const DataTable = ({ enquiriesData, type }) => {
const [tableData, setTableData] = useState([])
  const [editEnqId, setEditEnqId] = useState({})
  useEffect(() => {
    setTableData(enquiriesData)
  },[enquiriesData])
  
  const [nextPage ,{
    data: pageData,
    isLoading: loading,
    error,
  }] = useLazyEnquiriesPaginationQuery(`NEW,`);
  
  console.log(pageData,loading,error)
  
  const handleNext = () => {
    nextPage()
  };

  const handlePrevious = () => {
    return;
  };
  
  const handleEditEnquiry = (row) => {
    console.log(row)
    localStorage.setItem("editEnq", JSON.stringify(row))
    setEditEnqId(row)
  }

console.log(enquiriesData?.data?.enquiries)

  
  





  // Render the table
  return (
    <>
      <div className="row gy-2 mb-2" id="candidate-list">
        <div className="col-md-12 col-lg-12">
          <table
            id="example"
            className="table dt-responsive nowrap table-striped align-middle w-full"
          >
            <thead>
              <tr className="bg-white">
                <th scope="col">
                  <span className="pl-3"></span>
                </th>
                <th scope="col">Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Message</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">PIN Code</th>
                <th scope="col" className="w-15">
                  Address
                </th>
                <th scope="col">Created Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {enquiriesData?.data?.enquiries?.data?.length > 0 &&
                enquiriesData?.data?.enquiries?.data?.map((row, ind) => (
                  <tr className="shadow bg-white" key={ind}>
                    <td className="text-start">
                      <span className="bg-soft-success custom-avatar rounded-circle">
                        {row?.name[0]}
                      </span>
                    </td>
                    <td className="text-start">
                      <div className="ms-lg-0 my-0 my-lg-0">
                        <a href="pages-profile">
                          <h5 className="fs-16 mb-0">{row?.name}</h5>
                        </a>
                        <p className="text-muted mb-0">{row?.email}</p>
                      </div>
                    </td>
                    <td className="text-start">{row?.phone}</td>
                    <td className="text-start">
                      {row?.message ? row?.message : "null"}
                    </td>
                    <td className="text-start">{row?.city}</td>
                    <td className="text-start">{row?.state}</td>
                    <td className="text-start">{row?.zip}</td>
                    <td className="text-start">{row?.address}</td>
                    <td className="text-start">
                      <span className="badge bg-soft-info text-info">
                        {new Date(row?.created_at).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="text-start">
                      <div>
                        <a
                          onClick={()=>handleEditEnquiry(row)}
                          data-bs-toggle="modal"
                          data-bs-target="#edit-enq"
                          className="btn btn-soft-warning py-1"
                        >
                          <i className="mdi mdi-square-edit-outline"></i> Edit
                        </a>
                        {/* <a
                          href="#!"
                          className="btn btn-ghost-success btn-icon"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Tooltip on top"
                        >
                          <span className="icon-on">
                            <i className="ri-bookmark-line align-bottom"></i>
                          </span>
                        </a> */}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

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
                        enquiriesData?.data?.enquiries?.previous_page_url !=
                        null
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
        </div>
      </div>
      <div
        className="modal fade zoomIn"
        id="edit-enq"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
      >
        {editEnqId && <EditEnquiry info={editEnqId} />}
      </div>
    </>
  );
};

export default DataTable;
