/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import EditEnquiry from "./EditEnquiryForm";
import {
  useLazyEnquirySearchQuery,
  useLazyEnquiriesPaginationQuery,
} from "../../services/api";
import {Modal} from "react-bootstrap"
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../reducers/loader";
import TableLoader from "../TableLoader";


    


const DataTable = ({ enquiriesData, type, showModal, hideModal }) => {
  const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loader?.value);
const [tableData, setTableData] = useState([])
  const [editEnqId, setEditEnqId] = useState({})
  const [editModalShow, setEditModalShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [enquiriesSearch, { data, isLoading }] = useLazyEnquirySearchQuery();

  useEffect(() => {

    dispatch(showLoader())
    if (searchTerm != "")
    {
      const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm, "searchTerm");
      console.log(searchTerm)
      if (searchTerm != "") {
        enquiriesSearch({ searchkey: searchTerm, type: "NEW" }).then((res) => {
          console.log(res, "searchTerm");
          setTableData(res?.data);
        });
      } else {
        setTableData(enquiriesData);
      }
        dispatch(hideLoader())
        return () => {
          clearTimeout(debounceTimer);
        };
      }, 1500);
    } else {
      dispatch(hideLoader());
      setTableData(enquiriesData)
    }
    // Clear the timeout on each key press to reset the timer
    
  }, [searchTerm, enquiriesData]);

    useEffect(() => {
      // Replace this with your actual search logic (e.g., API call)
      console.log("Searching with debounced term:", debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    // Handler for input change
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };


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
  
  // Render the table
  return (
    <>
      {loading || isLoading && <Loader />}
      <div className="text-end flex justify-end">
        <label className="flex items-center gap-3">
          Search:
          <input
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            className="form-control "
            placeholder="Search Enquiries"
            aria-controls="example"
          />
        </label>
      </div>
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
                          onClick={() => handleEditEnquiry(row)}
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
              {tableData?.data?.enquiries?.data?.length == 0 && (
                <tr>
                  <td colSpan={10}>
                    <p className="text-center w-full text-lg">No data found</p>
                  </td>
                </tr>
              )}
            </tbody>
            {loaderState && <TableLoader />}
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
              {editEnqId && (
                <EditEnquiry info={editEnqId} handleClose={handleClose} />
              )}
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DataTable;
