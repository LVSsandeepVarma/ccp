/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Comments from "./Comments";
import {
  useLazyEnquiriesPaginationQuery,
  useLazyEnquirySearchQuery,
} from "../../services/api";
import CreateCustomer from "./CreateCustomer";
import Modal from "react-bootstrap/Modal";
import Loader from "../Loader";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../reducers/loader";
import TableLoader from "../TableLoader";




const CommonTable = ({ enquiriesData, type, enquirySelect }) => {
    const dispatch = useDispatch();
    const loaderState = useSelector((state) => state.loader?.value);
const [tableData, setTableData] = useState([]);
  const [editEnq, setEditEnq] = useState({});
  const [cusData, setCusData] = useState({})
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const [show, setShow] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    const [enquiriesSearch, { data, isLoading }] = useLazyEnquirySearchQuery();

    useEffect(() => {
      dispatch(showLoader());
      const debounceTimer = setTimeout(() => {
        setDebouncedSearchTerm(searchTerm, "searchTerm");
        console.log(searchTerm);
        if (searchTerm != "") {
          enquiriesSearch({
            searchkey: searchTerm,
            type: type?.toUpperCase(),
          }).then((res) => {
            console.log(res, "searchTerm");
            setTableData(res?.data);
          });
        } else {
          setTableData(enquiriesData);
        }
        dispatch(hideLoader());
      }, 1500);
      // Clear the timeout on each key press to reset the timer
      return () => {
        clearTimeout(debounceTimer);
      };
    }, [searchTerm, enquiriesData]);

    useEffect(() => {
      // Replace this with your actual search logic (e.g., API call)
      console.log("Searching with debounced term:", debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    // Handler for input change
    const handleInputChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
      const handleCommentsClose = () => setShowCommentsModal(false);
  const handleCommentsShow = () => setShowCommentsModal(true);
  

useEffect(() => {
  setTableData(enquiriesData);
}, [enquiriesData]);

  


  
const [nextPage, { data: pageData, isLoading: loading, error }] =
  useLazyEnquiriesPaginationQuery();

console.log(pageData, loading, error);

const handleNext = () => {
  nextPage({
    type: type?.toUpperCase(),
    no: enquiriesData?.data?.enquiries?.current_page + 1,
  }).then((res) => {
    console.log(res);
    setTableData(res?.data);
  });
};

const handlePrevious = () => {
  nextPage({
    type: type?.toUpperCase(),
    no: tableData?.data?.enquiries?.current_page - 1,
  }).then((res) => {
    console.log(res);
    setTableData(res?.data);
  });
};

const handleCustomPage = (pageNO) => {
  nextPage({
    type: type?.toUpperCase(),
    no: pageNO,
  }).then((res) => {
    console.log(res);
    setTableData(res?.data);
  });
};

  const handleCommentEnquiry = async (row) => {
    setShowCommentsModal(true)
     localStorage.setItem("cmtEnq", JSON.stringify(row));
     setEditEnq(row);
    console.log(row);
    
    handleCommentsShow()
                       
     
  };
  
  const handleCreateCustomer = async (row) => {
    setCusData(row);
    handleShow()
  }
  const handleTableSorting = (colType, fieldName) => {
    console.log(tableData);
    if (tableData?.data?.enquiries?.data) { 
    if (colType == "string") {
      const sortedData = [...tableData.data.enquiries.data].sort((a, b) =>
        a[fieldName].localeCompare(b[fieldName])
      );

      // Create a new object with the sorted data
      const updatedTableData = {
        ...tableData,
        data: {
          ...tableData.data,
          enquiries: {
            ...tableData.data.enquiries,
            data: sortedData,
          },
        },
      };

      // Update the state with the new object
      setTableData(updatedTableData);
    } else if (colType == "number") {
      const sortedData = [...tableData.data.enquiries.data].sort(
        (a, b) => a[fieldName] - b[fieldName]
      );

      // Create a new object with the sorted data
      const updatedTableData = {
        ...tableData,
        data: {
          ...tableData.data,
          enquiries: {
            ...tableData.data.enquiries,
            data: sortedData,
          },
        },
      };

      // Update the state with the new object
      setTableData(updatedTableData);
      console.log(sortedData, "sortedData");
    } else if (colType == "date") {
       const sortedData = [...tableData.data.enquiries.data].sort((a, b) => {
         const dateA = new Date(a[fieldName]).getTime();
         const dateB = new Date(b[fieldName]).getTime();

         return dateA - dateB;
       });

      // Create a new object with the sorted data
      const updatedTableData = {
        ...tableData,
        data: {
          ...tableData.data,
          enquiries: {
            ...tableData.data.enquiries,
            data: sortedData,
          },
        },
      };

      // Update the state with the new object
      setTableData(updatedTableData);
    }
  }
  }

    const handleTableDescSorting = (colType, fieldName) => {
      console.log(tableData);
      if (tableData?.data?.enquiries?.data) {
        if (colType == "string") {
          const sortedData = [...tableData.data.enquiries.data].sort((a, b) =>
            a[fieldName].localeCompare(b[fieldName])
          );
          sortedData.reverse();

          // Create a new object with the sorted data
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              enquiries: {
                ...tableData.data.enquiries,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
        } else if (colType == "number") {
          const sortedData = [...tableData.data.enquiries.data].sort(
            (a, b) => b[fieldName] - a[fieldName]
          );

          // Create a new object with the sorted data
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              enquiries: {
                ...tableData.data.enquiries,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
          console.log(sortedData, "sortedData");
        } else if (colType == "date") {
          const sortedData = [...tableData.data.enquiries.data].sort((a, b) => {
            const dateA = new Date(a[fieldName]).getTime();
            const dateB = new Date(b[fieldName]).getTime();

            return dateB - dateA;
          });

          // Create a new object with the sorted data
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              enquiries: {
                ...tableData.data.enquiries,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
        }
      }
    };

  // Render the table
  return (
    <>
      {loading || (isLoading && <Loader />)}
      <div className="text-end flex justify-end mx-3">
        <label className="flex items-center gap-3">
          Search:
          <input
            type="search"
            value={searchTerm}
            onChange={handleInputChange}
            className="form-control form-control-sm"
            placeholder="Search Enquiries"
            aria-controls="example"
          />
        </label>
      </div>
      <div className="">
        <table className="table responsive w-100" id="example">
          <thead className="table-light text-muted">
            <tr>
              {/* <th scope="col" className="w-[40px]">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkAll"
                    value="option"
                  />
                </div>
              </th> */}
              <th>
                Sl No.{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableSorting("number", "id")}
                >
                  ↑
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableDescSorting("number", "id")}
                >
                  ↓
                </span>
              </th>
              <th>
                Name{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableSorting("string", "name")}
                >
                  ↑
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableDescSorting("string", "name")}
                >
                  ↓
                </span>
              </th>
              <th>
                Phone{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableSorting("number", "phone")}
                >
                  ↑
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableDescSorting("number", "phone")}
                >
                  ↓
                </span>
              </th>
              <th>
                Ringing Date{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableSorting("date", "created_at")}
                >
                  ↑
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableDescSorting("date", "created_at")}
                >
                  ↓
                </span>
              </th>
              <th>
                Message{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableSorting("string", "message")}
                >
                  ↑
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableDescSorting("string", "message")}
                >
                  ↓
                </span>
              </th>
              <th>
                Comment{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableSorting("string", "comment")}
                >
                  ↑
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableDescSorting("string", "message")}
                >
                  ↓
                </span>
              </th>
              <th>
                Status{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableSorting("string", "status")}
                >
                  ↑
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => handleTableDescSorting("string", "message")}
                >
                  ↓
                </span>
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="list form-check-all">
            {tableData?.data?.enquiries?.data?.length > 0 &&
              tableData?.data?.enquiries?.data?.map((row, ind) => (
                <tr
                  key={ind}
                  className=" cursor-pointer"
                  onClick={() => enquirySelect(row)}
                >
                  {/* <th scope="row">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="chk_child"
                        value="option1"
                      />
                    </div>
                  </th> */}
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
                      // data-bs-placement="top"
                      // data-bs-title="Convert to Customer"
                      onClick={() => handleCreateCustomer(row)}
                    >
                      <button
                        className="btn btn-soft-primary py-1 btn-sm"
                        // data-bs-toggle="modal"
                        // data-bs-target="#convertCustomer"
                        onClick={() => handleCreateCustomer(row)}
                      >
                        <span className="">
                          <i className="mdi mdi-account-edit-outline align-middle fs-15"></i>
                        </span>
                      </button>
                    </a>
                  </td>
                </tr>
              ))}
            {tableData?.data?.enquiries?.data?.length == 0 && (
              <tr>
                <td colSpan={8}>
                  <p className="text-center w-full text-lg">No data found</p>
                </td>
              </tr>
            )}
          </tbody>
          {loaderState && <TableLoader />}
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
      <Modal
        className="modal fade"
        onHide={handleCommentsClose}
        show={showCommentsModal}
        id="createTask"
        tabIndex="-1"
        aria-labelledby="createTaskLabel"
        aria-hidden="false"
        size="xl"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl m-0">
          <div className="modal-content border-0 bg-[#fbf7f4]">
            {editEnq && (
              <Comments
                type={type}
                logData={editEnq}
                onHide={handleCommentsClose}
              />
            )}
          </div>
        </div>
        {/* {editEnqId && <EditEnquiry info={editEnqId} />} */}
      </Modal>
      <Modal
        className="modal fade"
        onHide={handleClose}
        show={show}
        id="convertCustomer"
        tabIndex="-1"
        aria-labelledby="createTaskLabel"
        aria-hidden="true"
        size="xl"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl m-0">
          <div className="modal-content border-0 bg-[#fbf7f4]">
            <div className="modal-header p-3 bg-soft-success">
              <h5 className="modal-title h5" id="createTaskLabel">
                Create Customer
              </h5>
            </div>
            <div className="modal-body">
              {cusData && (
                <CreateCustomer
                  id={cusData?.id}
                  type={type}
                  onHide={handleClose}
                />
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommonTable;
