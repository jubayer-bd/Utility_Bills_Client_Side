import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AuthContext } from "../../provider/AuthProvider";
import { motion } from "framer-motion";

const MyPayBills = () => {
  const { user } = useContext(AuthContext);
  const [myBills, setMyBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);

  useEffect(() => {
    document.title = "My Pay Bills | UtilityBill";
  }, []);

  // ✅ Fetch bills
  const fetchMyBills = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://utility-bills-server-side.vercel.app/my-bills?email=${user?.email}`
      );
      const data = await res.json();
      setMyBills(data);
    } catch (err) {
      Swal.fire("Error!", "Failed to load bills.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchMyBills();
  }, [user]);

  const totalCount = myBills.length;
  const totalAmount = myBills.reduce(
    (sum, b) => sum + Number(b.amount || 0),
    0
  );

  // ✅ Delete Bill
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

  // ✅ Update Bill
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedBill = {
      amount: form.amount.value,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
    };

    try {
      const res = await fetch(
        `https://utility-bills-server-side.vercel.app/my-bills/${currentBill._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBill),
        }
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        Swal.fire({
          title: "Updated!",
          text: "Bill updated successfully",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        setShowUpdateModal(false);
        fetchMyBills();
      }
    } catch (err) {
      Swal.fire("Error!", "Failed to update bill.", "error");
    }
  };

  // ✅ Download PDF
  const downloadPDF = () => {
    if (!myBills.length)
      return Swal.fire("No Data", "No bills to download.", "info");

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
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-4 py-10"
    >
      <h2 className="text-3xl font-semibold text-center mb-6">My Pay Bills</h2>

      {/* Info + Button */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-base-200 p-4 rounded-xl shadow-md mb-6">
        <p className="text-base-content">
          Total Bills Paid: <strong>{totalCount}</strong> | Total Amount:{" "}
          <strong>BDT {totalAmount}</strong>
        </p>
        <button onClick={downloadPDF} className="btn btn-primary mt-4 md:mt-0">
          Download Report
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-200 p-4 rounded-2xl shadow-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBills.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.username}</td>
                <td>{bill.email}</td>
                <td className="font-semibold text-primary">৳ {bill.amount}</td>
                <td>{bill.address}</td>
                <td>{bill.phone}</td>
                <td>{new Date(bill.date).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => {
                      setCurrentBill(bill);
                      setShowUpdateModal(true);
                    }}
                    className="btn btn-warning btn-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(bill._id)}
                    className="btn btn-error btn-sm"
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-base-200 p-6 rounded-2xl shadow-2xl w-96 relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-circle"
              onClick={() => setShowUpdateModal(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-4 text-center">
              Update Bill
            </h3>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="number"
                name="amount"
                defaultValue={currentBill.amount}
                required
                placeholder="Amount"
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="address"
                defaultValue={currentBill.address}
                required
                placeholder="Address"
                className="input input-bordered w-full"
              />
              <input
                type="tel"
                name="phone"
                defaultValue={currentBill.phone}
                required
                placeholder="Phone"
                className="input input-bordered w-full"
              />
              <input
                type="date"
                name="date"
                defaultValue={currentBill.date?.slice(0, 10)}
                required
                className="input input-bordered w-full"
              />
              <button type="submit" className="btn btn-success w-full mt-3">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MyPayBills;
