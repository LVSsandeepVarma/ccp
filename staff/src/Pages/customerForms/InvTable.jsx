/* eslint-disable react/prop-types */

export default function InvoiceTable({
  customerData,
  handleCheckboxChange,
  handleShowInvoice,
  checkedIds
}) {

  return (
    <>
      <table
        id="tbl_invoices"
        className="table table-borderedless dt-responsive nowrap table-striped align-middle w-full fadeIn"
      >
        <thead>
          <tr className="bg-light">
            <th></th>
            <th>Invoice No.</th>
            <th>Amount</th>
            <th>Total Tax</th>
            <th>Date</th>
            <th>Project</th>
            <th>Tags</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {customerData?.data?.res_data?.invoices?.map((inv, ind) => (
            <tr key={ind}>
              <td>
                <div className="">
                  <input
                    className="form-check-input code-switcher"
                    type="checkbox"
                    checked={checkedIds.includes(inv.id?.toString())}
                    onChange={() => handleCheckboxChange(inv.id?.toString())}
                  />
                </div>
              </td>
              <td
                className="text-start cursor-pointer text-primary"
                onClick={() => {
                  handleShowInvoice(inv?.number);
                }}
              >
                {inv?.prefix}-
                {inv?.number?.toString().padStart(5, "0") +
                  "/" +
                  (new Date(inv?.date).getMonth() + 1)
                    ?.toString()
                    ?.padStart(2, "0") +
                  "/" +
                  new Date(inv?.date).getFullYear()}
              </td>
              <td className=" text-start">
                {
                  JSON.parse(sessionStorage.getItem("currency"))?.data
                    ?.currencies[0]?.symbol
                }
                {inv?.total}
              </td>
              <td className="text-start">
                {
                  JSON.parse(sessionStorage.getItem("currency"))?.data
                    ?.currencies[0]?.symbol
                }
                {inv?.total_tax}
              </td>
              <td className="text-start">
                <span className="badge badge-soft-info fs-12 text-start">
                  {inv?.date}
                </span>
              </td>
              <td></td>
              <td></td>
              <td className="text-start">
                <span className="badge badge-soft-danger fs-12">
                  {inv?.duedate}
                </span>
              </td>
              <td className="text-start">
                <span
                  className={`badge badge-soft-${
                    inv?.status == 1
                      ? "primary"
                      : inv?.status == 2
                      ? "success"
                      : inv?.status == 3
                      ? "secondary"
                      : inv?.status == 4
                      ? "warning"
                      : "danger"
                  } fs-11`}
                >
                  {inv?.status == 1
                    ? "Unpaid"
                    : inv?.status == 2
                    ? "Paid"
                    : inv?.status == 3
                    ? "Partially Paid"
                    : inv?.status == 4
                    ? "Overdue"
                    : "Cancelled"}
                </span>
              </td>
            </tr>
          ))}
          {customerData?.data?.res_data?.invoices?.length == 0 && (
            <tr>
              <td colSpan={8}>
                <p className="text-center w-full text-lg">No data found</p>
              </td>
            </tr>
          )}
        </tbody>
        {/* {zipInvLoading && <TableLoader />} */}
      </table>
    </>
  );
}