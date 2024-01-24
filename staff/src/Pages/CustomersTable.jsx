/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useGetCustomersQuery, useLazyCustomersPaginationQuery, useLazyCustomersSearchQuery } from "../services/api"
import Loader from "./Loader"
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../reducers/loader";
import TableLoader from "./TableLoader";



export default function CustomersTable() {
    const dispatch = useDispatch();
  const loaderState = useSelector((state) => state.loader?.value);
  
  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    const { data: customersData, isLoading, error } = useGetCustomersQuery();
    console.log(customersData, error);
  
  const [customersSearch, { data, isLoading:searchLoading }] = useLazyCustomersSearchQuery();

  useEffect(() => {
    dispatch(showLoader());
    const debounceTimer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm, "searchTerm");
      console.log(searchTerm);
      if (searchTerm != "") {
        customersSearch(searchTerm).then((res) => {
          console.log(res, "searchTerm");
          setTableData(res?.data);
        });
      } else {
        setTableData(customersData);
      }
      dispatch(hideLoader());
    }, 1500);
    // Clear the timeout on each key press to reset the timer
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, customersData]);


  // Handler for input change
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };


  




    useEffect(() => {
      setTableData(customersData);
    }, [customersData]);
  
  const [nextPage, { data: pageData, isLoading: loading, error:paginationErr }] =
    useLazyCustomersPaginationQuery();

  console.log(pageData, loading, paginationErr);

  const handleNext = () => {
    nextPage({
      no: customersData?.data?.customers?.current_page + 1,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

  const handlePrevious = () => {
    nextPage({
      no: tableData?.data?.customers?.current_page - 1,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

  const handleCustomPage = (pageNO) => {
    nextPage({
      no: pageNO,
    }).then((res) => {
      console.log(res);
      setTableData(res?.data);
    });
  };

    const handleTableSorting = (colType, fieldName) => {
      console.log(tableData);
      if (tableData?.data?.customers?.data) {
        if (colType == "string") {
          const sortedData = [...tableData.data.customers.data].sort((a, b) =>
            a[fieldName].localeCompare(b[fieldName])
          );

          // Create a new object with the sorted data
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              customers: {
                ...tableData.data.customers,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
        } else if (colType == "number") {
          const sortedData = [...tableData.data.customers.data].sort(
            (a, b) => a[fieldName] - b[fieldName]
          );

          // Create a new object with the sorted data
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              customers: {
                ...tableData.data.customers,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
          console.log(sortedData, "sortedData");
        } else if (colType == "date") {
          const sortedData = [...tableData.data.customers.data].sort((a, b) => {
            const dateA = new Date(a[fieldName]).getTime();
            const dateB = new Date(b[fieldName]).getTime();

            return dateA - dateB;
          });

          // Create a new object with the sorted data
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              customers: {
                ...tableData.data.customers,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
        }
      }
    };

    const handleTableDescSorting = (colType, fieldName) => {
      console.log(tableData);
      if (tableData?.data?.customers?.data) {
        if (colType == "string") {
          const sortedData = [...tableData.data.customers.data].sort((a, b) =>
            a[fieldName].localeCompare(b[fieldName])
          );
          sortedData.reverse();

          // Create a new object with the sorted data
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              customers: {
                ...tableData.data.customers,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
        } else if (colType == "number") {
          const sortedData = [...tableData.data.customers.data].sort(
            (a, b) => b[fieldName] - a[fieldName]
          );

          // Create a new object with the sorted data
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              customers: {
                ...tableData.data.customers,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
          console.log(sortedData, "sortedData");
        } else if (colType == "date") {
          const sortedData = [...tableData.data.customers.data].sort((a, b) => {
            const dateA = new Date(a[fieldName]).getTime();
            const dateB = new Date(b[fieldName]).getTime();

            return dateB - dateA;
          });

          // Create a new object with the sorted data
          const updatedTableData = {
            ...tableData,
            data: {
              ...tableData.data,
              customers: {
                ...tableData.data.customers,
                data: sortedData,
              },
            },
          };

          // Update the state with the new object
          setTableData(updatedTableData);
        }
      }
    };


  return (
    <>
      {loading || (isLoading && <Loader />)}{" "}
      <div className="text-end flex justify-end">
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
      <table
        id="tbl_customers"
        className={`table table-borderedless dt-responsive nowrap table-striped align-middle w-full ${
          loaderState ? "relative" : ""
        }`}
      >
        <thead>
          <tr className="bg-light">
            <th>
              Customer No.
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
              Customer/Company
              <span
                className="cursor-pointer"
                onClick={() => handleTableSorting("string", "company")}
              >
                ↑
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleTableDescSorting("number", "company")}
              >
                ↓
              </span>
            </th>
            <th>
              Primary Contact
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
              Primary Email
              <span
                className="cursor-pointer"
                onClick={() => handleTableSorting("string", "email")}
              >
                ↑
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleTableDescSorting("string", "email")}
              >
                ↓
              </span>
            </th>
            <th>
              Phone
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
            <th>Active</th>
            <th>Groups</th>
            <th>
              Created Date
              <span
                className="cursor-pointer"
                onClick={() => handleTableSorting("number", "created_at")}
              >
                ↑
              </span>
              <span
                className="cursor-pointer"
                onClick={() => handleTableDescSorting("number", "created_at")}
              >
                ↓
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData?.data?.customers?.data?.map((customer, ind) => (
            <tr key={ind}>
              <td className="text-start">{customer?.id}</td>
              <td className="text-primary text-start">
                <a
                  onClick={() => {
                    window.location.href = `/edit-customer/${customer?.id}`;
                  }}
                >
                  {customer?.company}
                </a>
              </td>
              <td className="text-start">{customer?.primary_contact?.name}</td>
              <td className="text-start">
                <span className="badge badge-soft-info fs-12 !text-start">
                  {customer?.primary_contact?.email}
                </span>
              </td>
              <td className="text-start">{customer?.primary_contact?.phone}</td>
              <td className="text-start">
                <div className="form-check form-switch form-switch-right form-switch-md">
                  <input
                    className="form-check-input code-switcher"
                    type="checkbox"
                    checked={customer?.status == 0 ? false: true}
                  />
                </div>
              </td>
              <td></td>
              <td className="text-start">
                <span className="badge badge-outline-primary">
                  {new Date(customer?.created_at).toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </td>
            </tr>
          ))}
          {tableData?.data?.customers?.data?.length == 0 && (
            <tr>
              <td colSpan={8}>
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
            Showing {tableData?.data?.customers?.from} to{" "}
            {tableData?.data?.customers?.to} of{" "}
            {tableData?.data?.customers?.total} entries
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
                      tableData?.data?.customers?.prev_page_url == null
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
                        tableData?.data?.customers?.prev_page_url == null
                          ? ""
                          : "!bg-gray-200 "
                      }`}
                    >
                      Previous
                    </a>
                  </li> */}

              {tableData?.data?.customers?.links?.map((page, ind) => (
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
                      tableData?.data?.customers?.next_page_url != null
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
                        tableData?.data?.customers?.next_page_url != null
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
    </>
  );
}