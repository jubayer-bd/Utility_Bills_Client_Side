import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AuthContext } from "../../provider/AuthProvider";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const [myBills, setMyBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);

  useEffect(() => {
    document.title = "My Pay Bills | UtilityBill";
  }, []);

  // ✅ SweetAlert2 theme adaptation
  const swalBase = Swal.mixin({
    background: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "#1f2937"
      : "#fff",
    color: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "#f9fafb"
      : "#111827",
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#dc2626",
  });

  // 🔹 Fetch user's bills
  const fetchMyBills = () => {
    setLoading(true);
    fetch(
      `https://utility-bills-server-side.vercel.app/my-bills?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setMyBills(data))
      .catch(() => swalBase.fire("Error", "Failed to load bills", "error"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.email) fetchMyBills();
  }, [user]);

  // 🔹 Totals
  const totalCount = myBills.length;
  const totalAmount = myBills.reduce(
    (sum, b) => sum + Number(b.amount || 0),
    0
  );

  // 🔹 Delete Bill
  const handleDelete = (id) => {
    swalBase
      .fire({
        title: "Are you sure?",
        text: "This bill will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`https://utility-bills-server-side.vercel.app/my-bills/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then(() => {
              swalBase.fire(
                "Deleted!",
                "Your bill has been removed.",
                "success"
              );
              fetchMyBills();
            })
            .catch(() =>
              swalBase.fire("Error!", "Failed to delete bill.", "error")
            );
        }
      });
  };

  // 🔹 Update Bill
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedBill = {
      amount: form.amount.value,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
    };

    fetch(
      `https://utility-bills-server-side.vercel.app/my-bills/${currentBill._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBill),
      }
    )
      .then((res) => res.json())
      .then(() => {
        swalBase.fire("Updated!", "Bill has been updated.", "success");
        setShowUpdateModal(false);
        fetchMyBills();
      })
      .catch(() => swalBase.fire("Error!", "Failed to update bill.", "error"));
  };

  // 🔹 PDF Download
  const downloadPDF = () => {
    if (!myBills.length)
      return swalBase.fire("No Data", "No bills to download.", "info");

    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.text("My Pay Bills Report", 40, 50);
    doc.setFontSize(12);
    doc.text(`Total Bills Paid: ${totalCount}`, 40, 70);
    doc.text(`Total Amount: BDT ${totalAmount}`, 40, 90);

    const columns = [
      "Username",
      "Email",
      "Amount (BDT)",
      "Address",
      "Phone",
      "Date",
    ];
    const rows = myBills.map((bill) => [
      bill.username || "-",
      bill.email || "-",
      bill.amount || "0",
      bill.address || "-",
      bill.phone || "-",
      new Date(bill.date).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 110,
      theme: "striped",
      styles: { fontSize: 10, cellPadding: 5, halign: "center" },
      headStyles: { fillColor: [37, 99, 235], textColor: 255 },
    });

    doc.save("my_bills_report.pdf");
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">My Pay Bills</h2>

      {/* Header Info Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <p className="text-gray-700 dark:text-gray-300">
          Total Bills Paid: <strong>{totalCount}</strong> | Total Amount:{" "}
          <strong>BDT {totalAmount}</strong>
        </p>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Download Report
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="py-3 px-4 border-b">Username</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Amount (BDT)</th>
              <th className="py-3 px-4 border-b">Address</th>
              <th className="py-3 px-4 border-b">Phone</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBills.map((bill, idx) => (
              <tr
                key={bill._id}
                className={`text-center transition ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="py-2 px-4">{bill.username}</td>
                <td className="py-2 px-4">{bill.email}</td>
                <td className="py-2 px-4 font-semibold text-blue-600 dark:text-blue-400">
                  ৳ {bill.amount}
                </td>
                <td className="py-2 px-4">{bill.address}</td>
                <td className="py-2 px-4">{bill.phone}</td>
                <td className="py-2 px-4">
                  {new Date(bill.date).toLocaleDateString()}
                </td>
                <td className="py-2 flex justify-between px-4 space-x-2">
                  <button
                    onClick={() => {
                      setCurrentBill(bill);
                      setShowUpdateModal(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(bill._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Update Modal with Theme Support */}
      {showUpdateModal && currentBill && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/60 dark:bg-black/70 z-50">
          <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl w-96 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-red-500"
              onClick={() => setShowUpdateModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold text-center mb-4">
              Update Bill
            </h3>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="number"
                name="amount"
                defaultValue={currentBill.amount}
                required
                className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
              />
              <input
                type="text"
                name="address"
                defaultValue={currentBill.address}
                required
                className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
              />
              <input
                type="tel"
                name="phone"
                defaultValue={currentBill.phone}
                required
                className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
              />
              <input
                type="date"
                name="date"
                defaultValue={currentBill.date?.slice(0, 10)}
                required
                className="w-full border rounded-lg p-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPayBills;
