/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import {  useCreateProposalMutation, useProductsQuery, useSendProposalMutation } from "../../services/api";
import Loader from "../Loader";
import Select from "react-select";
import TableLoader from "../TableLoader";

export default function CreateProposal({ customer, close }) {
  console.log(customer);
    const [apiErr, setApiErr] = useState();
  const [items, setItems] = useState([
    {
      id: 1,
      itemId: 0,
      product: "Product 1",
      rate: "",
      qty: 1,
      amount: 500,
      seater: "",
    },
  ]);
    const [taxNo, setTaxNo] = useState("");
    const [mailSent, setMailSent] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipppingCharge, setShippingCharge] = useState(0);
  const [total, setTotal] = useState(0);
  const [discountErr, setDiscountErr] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [successMsg, setSuccessMsg] = useState("");
  const [taxNumberErr, setTaxNumberErr] = useState("")

  const { data: productsData, isLoading } = useProductsQuery();
  console.log(productsData);

    useEffect(() => {
      setTaxNo(customer?.gst_no);
    }, []);

  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg("");
        close();
      }, 2000);
    }
    if (apiErr) {
      setTimeout(() => {
        setApiErr("");
        close();
      }, 2000);
    }
  }, [successMsg, apiErr]);
  useEffect(() => {
    if (discount > 15) {
      setDiscountErr("max 15% is allowed");
    } else {
      setDiscountErr("");
    }
  }, [discount]);

  useEffect(() => {
    setSubTotal(
      items
        ?.reduce(
          (total, item) =>
            total + parseFloat(item?.amount || 0) * parseFloat(item?.qty),
          0
        )
        ?.toFixed(2)
    );
  }, [items]);

  useEffect(() => {
    const amountAfterdiscount = parseFloat(
      subTotal - (subTotal * discount) / 100
    ).toFixed(2);
    console.log(discount, subTotal, (subTotal * discount) / 100, "discount");
    setTax(parseFloat(amountAfterdiscount * 0.18)?.toFixed(2));
  }, [subTotal, discount]);

  useEffect(() => {
    setTotal(
      parseFloat(
        subTotal -
          parseFloat((subTotal * discount) / 100).toFixed(2) +
          parseInt(shipppingCharge) +
          parseInt(tax)
      ).toFixed(2)
    );
  }, [tax, shipppingCharge]);

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map(
        (item) =>
          item?.id && {
            ...item,
            item_id: productsData?.data?.products[0]?.id,
            product: productsData?.data?.products[0]?.description,
            description: productsData?.data?.products[0]?.long_description,
            amount: parseFloat(productsData?.data?.products[0]?.rate).toFixed(
              2
            ),
          }
      )
    );
  }, [productsData]);

  const addNewItem = () => {
    const newItemId = items.length + 1;
    setItems([
      ...items,
      {
        id: newItemId,
        itemId: productsData?.data?.products[0]?.id,
        product: productsData?.data?.products[0]?.description,
        description: productsData?.data?.products[0]?.long_description,
        rate: "",
        qty: 1,
        amount: parseFloat(productsData?.data?.products[0]?.rate).toFixed(2),
      },
    ]);
  };

  const handleDeleteItem = (rowId) => {
    if (rowId != 1) {
      setItems((prevRows) => prevRows.filter((row) => row.id !== rowId));
    }
  };

  const handleProductChange = (rowID, product) => {
    const itemsFiltered = productsData?.data?.products?.filter((item) => {
      if (item?.description == product) {
        return item;
      }
    });
    setItems((prevItems) =>
      prevItems.map((item) =>
        item?.id == rowID
          ? {
              ...item,
              product: product,
              amount: parseInt(itemsFiltered[0]?.rate),
              itemId: itemsFiltered[0]?.id,
              description: itemsFiltered[0]?.long_description,
              seater: itemsFiltered[0]?.seater,
            }
          : item
      )
    );
  };

  const handleItemqty = (rowID, type) => {
    if (type == "+") {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item?.id == rowID
            ? { ...item, qty: type == "+" && item?.qty + 1 }
            : item
        )
      );
    } else {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item?.id == rowID
            ? { ...item, qty: type == "-" && item?.qty > 1 ? item?.qty - 1 : 1 }
            : item
        )
      );
    }
  };

  const [createProposal, { data: proposalData, isLoading: loading }] =
    useCreateProposalMutation();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const itemsArr = items?.map((item) => {
      const product = productsData?.data?.products?.find(
        (product) => product?.description == item?.product
      );
      if (product) {
        return {
          description: item?.product,
          long_description: item?.description,
          qty: item?.qty,
          rate: item?.amount,
          total: parseFloat(item?.amount) * parseInt(item?.qty),
          seater: product?.seater,
        };
      }
    });

    console.log(itemsArr);
    let proposalData = {};
    proposalData["sub_total"] = subTotal;
    proposalData["total_amount"] = total;
    proposalData["currency"] = "5";
    proposalData["discount_percentage"] = discount;
    proposalData["shipping_charge"] = shipppingCharge;
    proposalData["items"] = [...itemsArr];
    proposalData["customer_id"] = customer?.id;
    proposalData["date"] = `${date}`;
    proposalData["tax_amount"] = tax;
    proposalData["mail_send"] = mailSent;
    proposalData["tax_number"] = 9999999999;

    const response = await createProposal({ ...proposalData });
    console.log(response, "response");
    if (response?.data?.status) {
      setSuccessMsg(response?.data?.message);
      
    } else {
      console.log(response)
      if (response?.error?.data?.errors) {
        setTaxNumberErr(response?.error?.data?.errors["tax_number"]);

      } else {
        setApiErr(response?.error?.data?.message)
      }
    }
  };

  function convertToISODate(dateString) {
    const dateRegex = /^\d{2}-[a-zA-Z]{3}-\d{4}$/;

    if (!dateRegex.test(dateString)) {
      console.log(
        "Invalid date format. Please provide date in DD-MON-YYYY format."
      );
      return null; // or throw an error, depending on your use case
    }

    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const [day, month, year] = dateString.split("-");
    const monthInISOFormat = months[month];
    const isoDate = `${year}-${monthInISOFormat}-${day}`;

    return setDate(isoDate);
  }



  return (
    <>
      {isLoading || (loading && <TableLoader />)}
      <form
        className="needs-validation"
        noValidate
        // id="proposal_form"
      >
        <>
          <div className="card-body border-bottom border-bottom-dashed px-4 pb-4 pt-0">
            <div className="row">
              <div className="col-lg-12">
                <img
                  src="/assets/images/ccp_logo.webp"
                  className="card-logo card-logo-dark user-profile-image img-fluid m-auto"
                  alt="logo dark"
                />
              </div>
              <div className="col-lg-4">
                <div>
                  <p className="mb-0 test-dark fw-bold fs-16">
                    Client/Company Name
                  </p>
                  <p className="mb-0 test-dark fs-14">
                    Second Floor, No-5M-323, 5th Main Road,
                    <br /> 3rd F Cross, East of NGEF Layout, Kasthuri,
                  </p>
                  <p className="mb-0 test-dark fs-14">Bengaluru, Karnataka</p>
                  <p className="mb-0 test-dark fs-14">India - 560016</p>
                  <p className="mb-0 test-dark fs-14">GST - GSTIN5415560016</p>
                  <p className="mb-0 test-dark fs-14">+91 90361 56001</p>
                </div>
              </div>
              {/* <!--end col--> */}
              <div className="col-lg-4 ms-auto">
                <div className="text-end">
                  <p className="mb-0 test-dark fw-bold fs-16">
                    Client/Company Name
                  </p>
                  <p className="mb-0 test-dark fs-14">
                    Second Floor, No-5M-323, 5th Main Road,
                    <br /> 3rd F Cross, East of NGEF Layout, Kasthuri,
                  </p>
                  <p className="mb-0 test-dark fs-14">Bengaluru, Karnataka</p>
                  <p className="mb-0 test-dark fs-14">India - 560016</p>
                  <p className="mb-0 test-dark fs-14">GST - GSTIN5415560016</p>
                  <p className="mb-0 test-dark fs-14">+91 90361 56001</p>
                </div>
              </div>
            </div>
            {/* <!--end row--> */}
          </div>
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-lg-3 col-sm-6 hidden">
                <label htmlFor="proposalnoInput">proposal No</label>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  id="proposalnoInput"
                  placeholder="Proposal No"
                  value="#INV-25000355"
                  readOnly="readonly"
                />
              </div>
              {/* <!--end col--> */}
              <div className="col-lg-3 col-sm-6">
                <div>
                  <label htmlFor="date-field">Date</label>
                  <Flatpickr
                    className="form-control bg-light border-0"
                    options={{
                      // mode: "range",
                      enableTime: true,
                      dateFormat: "d-M-Y",
                      defaultDate: new Date(date),
                      onChange: (selectedDates, dateStr, instance) =>
                        convertToISODate(dateStr),
                    }}
                  />
                </div>
              </div>
              {/* <!--end col--> */}
              <div className="col-lg-3 col-sm-6">
                <div>
                  <label htmlFor="totalamountInput">
                    Total Amount (auto calculated)
                  </label>
                  <input
                    type="text"
                    className="form-control bg-light border-0"
                    id="totalamountInput"
                    placeholder="₹0.00"
                    value={total}
                    readOnly
                  />
                </div>
              </div>
              {/* <!--end col--> */}
            </div>
            {/* <!--end row--> */}
          </div>
        </>

        <div className="card-body p-4 border-top border-top-dashed">
          <div className="row">
            <div className="col-12">
              <div>
                <label
                  htmlFor="billingName"
                  className="text-muted text-uppercase fw-semibold"
                >
                  Billing Address
                </label>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  id="billingName"
                  placeholder="Full Name"
                  value={customer?.first_name}
                  readOnly
                  required
                />
                <div className="invalid-feedback">Please enter a full name</div>
              </div>
            </div>
            {/* <!--end col--> */}
            <div className="col-lg-4 col-sm-6">
              <div className="mb-2">
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  data-plugin="cleave-phone"
                  id="billingPhoneno"
                  placeholder={customer?.phone}
                  // value="+91 90361 83631"
                  // readOnly
                  required
                />
                <div className="invalid-feedback">
                  Please enter a phone number
                </div>
              </div>
            </div>
            {/* <!--end col--> */}
            <div className="col-lg-4 col-sm-6">
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  id="billingTaxno"
                  placeholder="Tax Number"
                  required
                  defaultValue={taxNo}
                  onChange={(e) => setTaxNo(e?.target?.value)}
                />
                {taxNumberErr && (
                  <div className="text-red-600 p-0 m-0">{taxNumberErr}</div>
                )}
              </div>
            </div>
            {/* <!--end col--> */}
            <div className="col-lg-12 col-sm-12">
              <div className="mb-2">
                <textarea
                  className="form-control bg-light border-0"
                  id="billingAddress"
                  rows=""
                  placeholder="Address"
                  required
                  readOnly
                >
                  Second Floor, No-5M-323, 5th Main Road, 3rd F Cross, East of
                  NGEF Layout, Kasthuri, Bengaluru, Karnataka, India - 560016
                </textarea>
                <div className="invalid-feedback">Please enter a address</div>
              </div>
            </div>
            {/* <!--end col--> */}
          </div>
          {/* <!--end row--> */}
        </div>
        <div className="card-body p-4">
          <div className="table-responsive">
            <table className="invoice-table table table-borderless table-nowrap mb-0">
              <thead className="align-middle">
                <tr className="table-active">
                  <th scope="col" className="w-[50px]">
                    #
                  </th>
                  <th scope="col">Product Details</th>
                  <th scope="col" className="w-[120px]">
                    <div className="d-flex currency-select input-light align-items-center">
                      Rate
                      <select
                        className="form-selectborder-0 bg-light"
                        data-choices
                        data-choices-search-false
                        id="choices-payment-currency"
                        onChange="otherPayment()"
                      >
                        {/* <option value="$">($)</option>
                        <option value="£">(£)</option> */}
                        <option value="₹" selected>
                          (₹)
                        </option>
                        {/* <option value="€">(€)</option> */}
                      </select>
                    </div>
                  </th>
                  <th scope="col" className="w-[120px]">
                    qty
                  </th>
                  <th scope="col" className="w-[150px]">
                    Amount
                  </th>
                  <th scope="col" className="text-end w-[105px]"></th>
                </tr>
              </thead>
              <tbody id="newlink">
                {items?.map((item, ind) => (
                  <tr id="1" className="product" key={ind}>
                    <th scope="row" className="product-id">
                      {item?.id}
                    </th>
                    <td className="text-start">
                      <div className="mb-2">
                        <Select
                          className="js-example-basic-single inv-select-box"
                          id=""
                          placeholder="product"
                          name="products"
                          value={{ label: item?.product, value: item?.product }}
                          onChange={(inputValue) =>
                            handleProductChange(item?.id, inputValue?.value)
                          }
                          options={productsData?.data?.products?.map(
                            (prod) => ({
                              value: prod?.description,
                              label: prod?.description,
                            })
                          )}
                        />

                        {/* <option value="Product 1">Product 1</option>
                          <option value="Product 2">Product 2</option>
                          <option value="Product 3">Product 3</option>
                          <option value="Product 4">Product 4</option>
                          <option value="Product 5">Product 5</option> */}
                        {/* </select> */}
                      </div>
                      <p
                        className="form-control bg-light border-0 whitespace-break-spaces line-clamp-5 motion-reduce:!transition-all hover:line-clamp-none py-1"
                        id="productDetails-1"
                        // rows="auto"
                        placeholder="Product Description "
                      >
                        {item?.description}
                      </p>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control product-price bg-light border-0"
                        id="productRate-1"
                        step="0.01"
                        value={item?.amount}
                        placeholder="0.00"
                        required
                      />
                      <div className="invalid-feedback">
                        Please enter a rate
                      </div>
                    </td>
                    <td>
                      <div className="input-step">
                        <button
                          type="button"
                          className="minus"
                          onClick={() => handleItemqty(item?.id, "-")}
                        >
                          –
                        </button>
                        <input
                          type="number"
                          className="product-qty"
                          id="product-qty-1"
                          value={item?.qty}
                        />
                        <button
                          type="button"
                          className="plus"
                          onClick={() => handleItemqty(item?.id, "+")}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-end">
                      <div>
                        <input
                          type="text"
                          className="form-control bg-light border-0 product-line-price"
                          id="productPrice-1"
                          placeholder="$0.00"
                          value={item?.amount * item?.qty}
                          readOnly
                        />
                      </div>
                    </td>
                    <td className="product-removal">
                      <a
                        href="javascript:void(0)"
                        className={`btn ${
                          item?.id == 1
                            ? "bg-gray-200 cursor-not-allowed"
                            : "btn-success bg-success"
                        }`}
                        onClick={() => handleDeleteItem(item.id)}
                        disabled={item?.id == 1}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr id="newForm hidden">
                  <td className="d-none" colSpan="5">
                    <p>Add New Form</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan="6" className="text-start">
                    <a
                      // href="javascript:new_link()"
                      id="add-item"
                      className="btn btn-soft-secondary fw-medium"
                      onClick={() => addNewItem()}
                    >
                      <i className="ri-add-fill me-1 align-bottom"></i> Add Item
                    </a>
                    <hr className="w-full my-2" />
                  </td>
                </tr>

                <tr className="border-top border-top-dashed mt-2 ">
                  <td colSpan="4"></td>
                  <td colSpan="2" className="p-0">
                    <table className="table table-borderless table-sm table-nowrap align-middle mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Sub Total</th>
                          <td className="w-[150px]">
                            <input
                              type="text"
                              className="form-control bg-light border-0"
                              id="cart-subtotal"
                              value={subTotal}
                              placeholder="₹0.00"
                              readOnly
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">
                            Discount %
                            <small className="text-muted">(Before Tax)</small>
                          </th>
                          <td>
                            <input
                              type="number"
                              className="form-control bg-light border-0"
                              id="cart-discount"
                              placeholder="0%"
                              pattern="[0-9]+(\.[0-9]*)?"
                              max={20}
                              min={0}
                              step="0.01"
                              value={discount}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[0-9]+(\.[0-9]*)?$/.test(inputValue)) {
                                  setDiscount(inputValue);
                                }
                              }}
                            />
                            <div>
                              <p className="text-red-600 text-xs w-full">
                                {discountErr}
                              </p>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">Tax (18%)</th>
                          <td>
                            <input
                              type="text"
                              className="form-control bg-light border-0"
                              id="cart-tax"
                              value={tax}
                              placeholder="₹0.00"
                              readOnly
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Shipping Charge</th>
                          <td>
                            <input
                              type="text"
                              pattern="[0-9]*"
                              className="form-control bg-light border-0"
                              id="cart-shipping"
                              placeholder="₹0.00"
                              value={shipppingCharge}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                if (/^[0-9]*$/.test(inputValue)) {
                                  setShippingCharge(inputValue);
                                }
                              }}
                            />
                          </td>
                        </tr>
                        <tr className="border-top border-top-dashed">
                          <th scope="row">Total Amount</th>
                          <td>
                            <input
                              type="text"
                              className="form-control bg-light border-0"
                              id="cart-total"
                              value={total}
                              placeholder="₹0.00"
                              readOnly
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {/* <!--end table--> */}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <!--end table--> */}
          </div>

          <div className="mt-4">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="form-label text-muted text-uppercase fw-semibold"
            >
              NOTES
            </label>
            <textarea
              className="form-control alert alert-info"
              id="exampleFormControlTextarea1"
              placeholder="Notes"
              rows="2"
              required
            >
              All accounts are to be paid within 7 days from receipt of
              proposal. To be paid by cheque or credit card or direct payment
              online. If account is not paid within 7 days the credits details
              supplied as confirmation of work undertaken will be charged the
              agreed quoted fee noted above.
            </textarea>
          </div>
          <div className="flex justify-between items-center">
            <div className="hstack gap-2 justify-content-end d-print-none mt-4">
              <p className="text-success text-start">{successMsg}</p>
            </div>
            <div className="hstack gap-2 justify-content-end d-print-none mt-4">
              {/* <button
              className="btn  btn-success"
              disabled={discountErr != "" ? true : false}
            >
              <i className="ri-printer-line align-bottom me-1"></i> Save
            </button>
            <button
              disabled={discountErr != "" ? true : false}
              className="btn btn-primary bg-primary"
            >
              <i className="ri-download-2-line align-bottom me-1"></i> Download
              proposal
            </button> */}

              <button
                disabled={discountErr != "" ? true : false}
                className="btn btn-info bg-info"
                onClick={(e) => {
                  setMailSent(true);
                  handleSubmit(e);
                }}
              >
                <i className="ri-send-plane-fill align-bottom me-1"></i>Save &
                Create Proposal
              </button>

              <button
                disabled={discountErr != "" ? true : false}
                className="btn btn-secondary bg-secondary"
                onClick={handleSubmit}
              >
                <i className="ri-send-plane-fill align-bottom me-1"></i> Create
                proposal
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
