/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import EditEnquiry from "./EditEnquiryForm";
import { useLazyEnquiriesPaginationQuery } from "../../services/api";
import {Modal} from "react-bootstrap"


    


const DataTable = ({ enquiriesData, type, showModal, hideModal }) => {
const [tableData, setTableData] = useState([])
  const [editEnqId, setEditEnqId] = useState({})
    const [editModalShow, setEditModalShow] = useState(false);

    const handleClose = () => setEditModalShow(false);
  const handleShow = () => {
    
    setEditModalShow(true)
  };
  useEffect(() => {
    setTableData(enquiriesData)
  },[enquiriesData])
  
  const [nextPage ,{
    data: pageData,
    isLoading: loading,
    error,
  }] = useLazyEnquiriesPaginationQuery();
  
  console.log(pageData,loading,error)
  
  const handleNext = () => {
    nextPage({ type: `NEW`, no: enquiriesData?.data?.enquiries?.current_page + 1 }).then((res) => {
      console.log(res)
      setTableData(res?.data)
    });
  };

  const handlePrevious = () => {
    nextPage({
      type: `NEW`,
      no: tableData?.data?.enquiries?.current_page - 1,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

    const handleCustomPage = (pageNO) => {
      nextPage({
        type: `NEW`,
        no:pageNO,
      }).then((res) => {
        console.log(res);
        setTableData(res?.data);
      });
    };
  
  const handleEditEnquiry = (row) => {
    console.log(row)
    localStorage.setItem("editEnq", JSON.stringify(row))
    setEditEnqId(row)
    setEditModalShow(true)
  }

console.log(enquiriesData?.data?.enquiries)

  
  





  // Render the table
  return (
    <>
      <div className="row gy-2 mb-2" id="candidate-list">
        <div className="col-md-12 col-lg-12">
          <table
            id="example"
            className="table responsive nowrap table-striped align-middle w-full"
          >
            <thead>
              <tr className="bg-white">
                <th scope="col" className="w-3">
                  <span className=""></span>
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
              {tableData?.data?.enquiries?.data?.length > 0 &&
                tableData?.data?.enquiries?.data?.map((row, ind) => (
                  <tr className="shadow bg-white" key={ind}>
                    <td className="text-start">
                      <span className="bg-soft-success custom-avatar rounded-circle">
                        {row?.name[0]?.toUpperCase()}
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
                          onClick={() => 
                            handleEditEnquiry(row)
                          }
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
                Showing {tableData?.data?.enquiries?.from} to{" "}
                {tableData?.data?.enquiries?.to} of{" "}
                {tableData?.data?.enquiries?.total} entries
              </div>
            </div>
            <div className="">
              <div
                className="dataTables_paginate paging_simple_numbers"
                id="example_paginate"
              >
                <ul className="pagination">
                  {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.prev_page_url == null
                        ? "disabled"
                        : " "
                    } `}
                    id="example_next"
                  >
                    <a
                      onClick={() => handlePrevious()}
                      aria-controls="example"
                      data-dt-idx="2"
                      tabIndex="0"
                      className={`page-link ${
                        tableData?.data?.enquiries?.prev_page_url == null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Previous
                    </a>
                  </li> */}

                  {tableData?.data?.enquiries?.links?.map((page, ind) => (
                    <li
                      className={`paginate_button page-item  ${
                        page?.active ? "active" : ""
                      } `}
                      key={ind}
                    >
                      <button
                        className="page-link"
                        dangerouslySetInnerHTML={{ __html: page?.label }}
                        disabled={page?.url == null}
                        onClick={() => {
                          if (page?.label?.includes("Previous")) {
                            handlePrevious();
                          } else if (page?.label?.includes("Next")) {
                            handleNext();
                          } else {
                            handleCustomPage(parseInt(page?.label));
                          }
                        }}
                      ></button>
                    </li>
                  ))}

                  {/* <li
                    className={`paginate_button page-item next ${
                      tableData?.data?.enquiries?.next_page_url != null
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
                        tableData?.data?.enquiries?.next_page_url != null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Next
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal fade zoomIn"
        id="edit-enq"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
        size="xl"
        centered
        show={editModalShow}
        onHide={handleClose}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl m-0">
          <div className="modal-content border-0">
            <Modal.Header className="modal-header p-3 bg-soft-info">
              <h5 className="modal-title font-bold" id="exampleModalLabel">
                Create Task
              </h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="close-modal"
                onClick={() => handleClose()}
              ></button>
            </Modal.Header>
            <Modal.Body>
              {editEnqId && <EditEnquiry info={editEnqId} handleClose={handleClose} />}
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DataTable;
