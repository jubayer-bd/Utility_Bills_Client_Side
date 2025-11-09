# 🧾 Utility Bill Management System (MERN)

A complete full-stack web application built with the **MERN Stack (MongoDB, Express, React, Node.js)** that allows users to **manage, pay, and track their utility bills** easily from one place.

---

## 🌐 Live Site

🔗 [Visit Live Site](https://your-live-site-url.netlify.app)  
_(Replace this link with your actual deployed URL)_

---

## ⚙️ Tech Stack

**Frontend:**

- React
- React Router
- TailwindCSS + DaisyUI
- SweetAlert2
- jsPDF + jsPDF-AutoTable

**Backend:**

- Node.js
- Express.js
- MongoDB
- Hosted on Vercel

**Authentication:**

- Firebase Authentication (Email/Password + Google Login)

**Hosting:**

- Client: Netlify / Firebase
- Server: Vercel

---

## ✨ Features

- 🔐 **User Authentication System**  
  Secure login, registration, and Google social authentication using Firebase.

- 🧾 **Bill Management Dashboard**  
  Add, view, and manage all utility bills (Electricity, Gas, Water, Internet) with CRUD operations.

- 💳 **Online Bill Payment**  
  Users can pay their current month’s bills directly from the details page with a confirmation form.

- 📄 **PDF Report Generation**  
  Generate and download a personalized payment report with total count and total amount using jsPDF.

- 🎨 **Responsive Modern UI**  
  Fully responsive layout with Navbar, Footer, Category cards, Carousel, and extra informative sections.

- 🧑‍💼 **User Profile Management**  
  View and update your name and photo instantly from the Profile page without a modal.

- ⚡ **Category Filtering and Details**  
  Filter bills by category and view complete information with an option to pay.

---

## 📂 Pages Overview

| Page                 | Description                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| **Home**             | Carousel, category cards, recent bills, and extra informative sections.      |
| **Bills**            | Displays all bills with filtering by category and "See Details" navigation.  |
| **Bill Details**     | Full information with payment form (available only for current month).       |
| **My Pay Bills**     | Displays logged-in user’s bills with Update/Delete options and PDF download. |
| **About**            | Information about the platform and its purpose.                              |
| **Profile**          | Shows and allows updating of user's display name and profile photo.          |
| **Login / Register** | Authentication pages with Firebase and Google login.                         |
| **404 Page**         | Custom not-found route handling.                                             |

---

## 🧾 MongoDB Collections

### bills

```json
{
  "title": "Frequent Power Outage in Mirpur",
  "category": "Electricity",
  "amount": 1500,
  "location": "Mirpur-10, Dhaka",
  "description": "Power cuts occur daily in the evening.",
  "image": "https://example.com/power.jpg",
  "date": "2025-11-01"
}
```

{
  "email": "user@gmail.com",
  "billId": "674e5f...",
  "username": "Jubayer",
  "address": "Mirpur, Dhaka",
  "phone": "017XXXXXXXX",
  "amount": 1200,
  "date": "2025-11-08"
}
