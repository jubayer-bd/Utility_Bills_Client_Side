import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const AddBill = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.title = "Add Bill | Utility Bills";
  }, []);

  const handleAddBill = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newBill = {
      title: form.title.value,
      category: form.category.value,
      email: user?.email,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      amount: parseFloat(form.amount.value),
    };

    try {
      const res = await fetch(
        "https://utility-bills-server-side.vercel.app/bills",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBill),
        }
      );

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Bill added successfully",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        form.reset();
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add bill",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong!",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Add a New Bill
      </h2>

      <form
        onSubmit={handleAddBill}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-200 p-6 rounded-2xl shadow"
      >
        <input
          name="title"
          type="text"
          placeholder="Bill Title"
          className="input input-bordered"
          required
        />

        <select name="category" className="select select-bordered" required>
          <option value="">Select Category</option>
          <option>Electricity</option>
          <option>Gas</option>
          <option>Water</option>
          <option>Internet</option>
        </select>

        <input
          name="amount"
          type="number"
          placeholder="Amount (৳)"
          className="input input-bordered"
          required
        />

        <input
          name="location"
          type="text"
          placeholder="Location"
          className="input input-bordered"
          required
        />

        <input
          name="image"
          type="url"
          placeholder="Image URL"
          className="input input-bordered"
          required
        />

        <input
          name="date"
          type="date"
          className="input input-bordered"
          required
        />

        <textarea
          name="description"
          className="textarea textarea-bordered md:col-span-2"
          placeholder="Description"
          required
        ></textarea>

        <input
          name="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered md:col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary md:col-span-2"
        >
          {loading ? "Adding..." : "Add Bill"}
        </button>
      </form>
    </div>
  );
};

export default AddBill;
