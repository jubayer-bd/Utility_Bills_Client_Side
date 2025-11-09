import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { AuthContext } from "../../provider/AuthProvider";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const [myBills, setMyBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);

  // Fetch bills for logged-in user
  const fetchMyBills = () => {
    setLoading(true);
    fetch(`https://your-server-url.vercel.app/myBills?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMyBills(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (user?.email) fetchMyBills();
  }, [user]);

  // Calculate totals
  const totalCount = myBills.length;
  const totalAmount = myBills.reduce((sum, b) => sum + Number(b.amount), 0);

  // Delete bill
  const handleDelete = (billId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will permanently delete this bill!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://your-server-url.vercel.app/myBills/${billId}`, {
          method: "DELETE",
        })
          .then(() => {
            Swal.fire("Deleted!", "Bill has been deleted.", "success");
            fetchMyBills();
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete bill.", "error");
          });
      }
    });
  };

  // Update bill
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedBill = {
      amount: form.amount.value,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
    };

    fetch(`https://your-server-url.vercel.app/myBills/${currentBill._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBill),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Updated!", "Bill has been updated.", "success");
        setShowUpdateModal(false);
        fetchMyBills();
      })
      .catch(() => {
        Swal.fire("Error!", "Failed to update bill.", "error");
      });
  };

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("My Pay Bills Report", 14, 20);
    const tableColumn = [
      "Username",
      "Email",
      "Amount",
      "Address",
      "Phone",
      "Date",
    ];
    const tableRows = [];

    myBills.forEach((bill) => {
      const row = [
        bill.username,
        bill.email,
        bill.amount,
        bill.address,
        bill.phone,
        new Date(bill.date).toLocaleDateString(),
      ];
      tableRows.push(row);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save("my_bills_report.pdf");
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-4">My Pay Bills</h2>

      <div className="mb-6 flex justify-between items-center">
        <p>
          Total Bills Paid: <strong>{totalCount}</strong> | Total Amount:{" "}
          <strong>৳{totalAmount}</strong>
        </p>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Amount</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBills.map((bill) => (
              <tr key={bill._id} className="text-center">
                <td className="py-2 px-4 border">{bill.username}</td>
                <td className="py-2 px-4 border">{bill.email}</td>
                <td className="py-2 px-4 border">৳{bill.amount}</td>
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-500"
              onClick={() => setShowUpdateModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4 text-center">
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
