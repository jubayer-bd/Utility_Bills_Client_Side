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
    document.title = "My Pay Bills | Utility Bills";
  }, []);

  // 🔹 Fetch user's bills
  const fetchMyBills = () => {
    setLoading(true);
    fetch(
      `https://utility-bills-server-side.vercel.app/my-bills?email=${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setMyBills(data))
      .catch(() => Swal.fire("Error", "Failed to load bills", "error"))
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
    Swal.fire({
      title: "Are you sure?",
      text: "This bill will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://utility-bills-server-side.vercel.app/my-bills/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Deleted!", "Your bill has been removed.", "success");
            fetchMyBills();
          })
          .catch(() => Swal.fire("Error!", "Failed to delete bill.", "error"));
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
        Swal.fire("Updated!", "Bill has been updated.", "success");
        setShowUpdateModal(false);
        fetchMyBills();
      })
      .catch(() => Swal.fire("Error!", "Failed to update bill.", "error"));
  };

  // 🔹 PDF Download (jsPDF + autoTable)
  const downloadPDF = () => {
    if (!myBills.length)
      return Swal.fire("No Data", "No bills to download.", "info");

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "A4",
    });

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

    rows.push(["", "", `Total: ${totalAmount}`, "", "", ""]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 110,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5, halign: "center" },
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      didParseCell: (data) => {
        if (data.row.index === rows.length - 1) {
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.fillColor = [240, 240, 240];
        }
      },
    });

    doc.save("my_bills_report.pdf");
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">My Pay Bills</h2>

      {/* Header Info Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <p className="text-gray-700">
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

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Amount (BDT)</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBills.map((bill) => (
              <tr key={bill._id} className="text-center hover:bg-gray-50">
                <td className="py-2 px-4 border">{bill.username}</td>
                <td className="py-2 px-4 border">{bill.email}</td>
                <td className="py-2 px-4 border font-medium text-gray-800">
                  BDT {bill.amount}
                </td>
                <td className="py-2 px-4 border">{bill.address}</td>
                <td className="py-2 px-4 border">{bill.phone}</td>
                <td className="py-2 px-4 border">
                  {new Date(bill.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border space-x-2">
                  <button
                    onClick={() => {
                      setCurrentBill(bill);
                      setShowUpdateModal(true);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(bill._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {showUpdateModal && currentBill && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
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
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                name="address"
                defaultValue={currentBill.address}
                required
                className="w-full border rounded-lg p-2"
              />
              <input
                type="tel"
                name="phone"
                defaultValue={currentBill.phone}
                required
                className="w-full border rounded-lg p-2"
              />
              <input
                type="date"
                name="date"
                defaultValue={currentBill.date?.slice(0, 10)}
                required
                className="w-full border rounded-lg p-2"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
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
