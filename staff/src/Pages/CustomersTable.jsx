import { useEffect, useState } from "react";
import { useGetCustomersQuery, useLazyCustomersPaginationQuery } from "../services/api"
import Loader from "./Loader"

export default function CustomersTable() {
  const [tableData, setTableData] = useState([]);

  


  const { data: customersData, isLoading, error } = useGetCustomersQuery()
  console.log(customersData, error)

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


  return (
    <>
      {isLoading && <Loader />}
      <table
        id="tbl_customers"
        className="table table-borderedless dt-responsive nowrap table-striped align-middle w-full"
      >
        <thead>
          <tr className="bg-light">
            <th>Customer No.</th>
            <th>Customer/Company</th>
            <th>Primary Contact</th>
            <th>Primary Email</th>
            <th>Phone</th>
            <th>Active</th>
            <th>Groups</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.data?.customers?.data?.map((customer, ind) => (
            <tr key={ind}>
              <td className="text-start">{customer?.id}</td>
              <td className="text-primary text-start">
                <a onClick={()=>{window.location.href = `/edit-customer/${customer?.id}`;}}>{customer?.company}</a>
              </td>
              <td className="text-start">{customer?.primary_contact?.name}</td>
              <td>
                <span className="badge badge-soft-info fs-12 text-start">
                  {customer?.primary_contact?.email}
                </span>
              </td>
              <td className="text-start">{customer?.primary_contact?.phone}</td>
              <td className="text-start">
                <div className="form-check form-switch form-switch-right form-switch-md">
                  <input
                    className="form-check-input code-switcher"
                    type="checkbox"
                    checked={customer?.status}
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