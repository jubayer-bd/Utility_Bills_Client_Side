import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const BillDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [bill, setBill] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Fetch bill details from backend
  useEffect(() => {
    fetch(`http://localhost:3000/bills/${id}`)
      .then((res) => res.json())
      .then((data) => setBill(data))
      .catch((err) => console.error(err));
  }, [id]);

  // Check if bill belongs to current month
  const isCurrentMonth = () => {
    if (!bill.date) return false;
    const billMonth = new Date(bill.date).getMonth();
    const currentMonth = new Date().getMonth();
    return billMonth === currentMonth;
  };

  // Handle Pay Bill form submission
  const handlePayBill = (e) => {
    e.preventDefault();
    const form = e.target;

    const newBill = {
      billId: bill._id,
      title: bill.title,
      email: user?.email,
      username: form.username.value,
      address: form.address.value,
      phone: form.phone.value,
      amount: bill.amount,
      additional: form.additional.value,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3000/my-bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBill),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Your bill has been added to My Bills!",
          timer: 2000,
          showConfirmButton: false,
        });
        setShowModal(false);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto shadow rounded-2xl overflow-hidden ">
        <img
          src={bill.image}
          alt={bill.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold">{bill.title}</h2>
          <p>
            <strong>Category:</strong> {bill.category}
          </p>
          <p>
            <strong>Location:</strong> {bill.location}
          </p>
          <p className="leading-relaxed">
            <strong>Description:</strong> {bill.description}
          </p>
          <p className="text-lg font-semibold text-blue-600">
            Amount: ৳{bill.amount}
          </p>
          <p className="text-sm text-gray-500">
            Bill Date:{" "}
            {bill.date ? new Date(bill.date).toLocaleDateString() : "N/A"}
          </p>

          {/* Pay Bill Button */}
          <div className="flex items-center mt-3">
            <button
              disabled={!isCurrentMonth()}
              onClick={() => setShowModal(true)}
              className={`px-6 py-2 rounded-lg text-white font-medium ${
                isCurrentMonth()
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Pay Bill
            </button>
            {!isCurrentMonth() && (
              <span className="text-red-500 font-semibold ml-4">
                Only current month bills can be paid.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0  flex items-center justify-center z-50">
          <div className=" p-6 bg-white shadow-lg rounded-2xl w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-500"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
              Pay Bill Form
            </h3>

            <form onSubmit={handlePayBill} className="space-y-3">
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full border rounded-lg p-2 bg-gray-100"
              />
              <input
                type="text"
                value={bill._id}
                readOnly
                className="w-full border rounded-lg p-2 bg-gray-100"
              />
              <input
                type="number"
                value={bill.amount}
                readOnly
                className="w-full border rounded-lg p-2 bg-gray-100"
              />
              <input
                type="text"
                name="username"
                placeholder="Enter your name"
                required
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                required
                className="w-full border rounded-lg p-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                required
                className="w-full border rounded-lg p-2"
              />
              <textarea
                name="additional"
                placeholder="Additional info (optional)"
                rows="2"
                className="w-full border rounded-lg p-2"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Confirm Payment
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;
