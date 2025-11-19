# 🧾 UtilityBill 

A complete **full-stack web application** built with the **MERN Stack (MongoDB, Express, React, Node.js)** that allows users to **manage, pay, and track their utility bills** from one place — all with a modern UI and smooth experience.
 <img src="./public/screenshot-20251119130316.png">

---

## 🌐 Live Site

🔗 **[Visit Live Site](https://utility-bills-cfa.netlify.app)**  


---

## ⚙️ Tech Stack

### 🖥️ Frontend

| Technology                                                                                                              | Description                | Badge                           |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------- | ------------------------------- |
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)                       | Component-based UI library | ⚛️ Build interactive interfaces |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)   | Routing                    | 🔁 SPA navigation               |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)    | Styling                    | 🎨 Modern utility-first CSS     |
| ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat-square&logo=daisyui&logoColor=white)                  | UI Components              | 🌸 Prebuilt Tailwind components |
| ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-FF6B6B?style=flat-square&logo=sweetalert2&logoColor=white)      | Alerts                     | 💬 Modern popup notifications   |
| ![jsPDF](https://img.shields.io/badge/jsPDF-FFD43B?style=flat-square&logo=javascript&logoColor=black)                   | PDF Generation             | 📄 Export user reports          |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)                        | HTTP Client                | ⚙️ API requests handling        |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)       | Animation                  | ✨ Page transitions             |
| ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)                      | Animation                  | 🎬 Interactive effects          |
| ![React Hot Toast](https://img.shields.io/badge/React_Hot_Toast-FF8800?style=flat-square&logo=react&logoColor=white)    | Toasts                     | 🔔 Success/error messages       |
| ![Typewriter](https://img.shields.io/badge/React_Simple_Typewriter-5C2D91?style=flat-square&logo=react&logoColor=white) | Text Animation             | 🖋️ Typing effects               |
| ![React Icons](https://img.shields.io/badge/React_Icons-E91E63?style=flat-square&logo=react&logoColor=white)            | Icons                      | 🎯 Modern icon set              |

---

### ⚙️ Backend

| Technology                                                                                                   | Description | Badge                        |
| ------------------------------------------------------------------------------------------------------------ | ----------- | ---------------------------- |
| ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)       | Runtime     | 🟢 JavaScript backend engine |
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | Framework   | ⚙️ REST API creation         |
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)       | Database    | 🗄️ Data storage              |

---

### 🔐 Authentication

| Tech                                                                                                      | Description    | Badge                        |
| --------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------- |
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) | Authentication | 🔑 Secure Email/Google Login |

---

### ☁️ Hosting

| Service                                                                                                | Role           | Badge                  |
| ------------------------------------------------------------------------------------------------------ | -------------- | ---------------------- |
| ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white) | Client Hosting | 🌍 Frontend deployment |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)    | Server Hosting | ⚙️ Backend deployment  |

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
  View and update your name and photo instantly from the Profile page.

- ⚡ **Category Filtering and Details**  
  Filter bills by category and view complete information with an option to pay.

---

## 📂 Pages Overview

| Page                 | Description                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| **Home**             | Carousel, category cards, recent bills, and extra informative sections.      |
| **Bills**            | Displays all bills with filtering by category and “See Details” navigation.  |
| **Bill Details**     | Full information with payment form (available only for current month).       |
| **My Pay Bills**     | Displays logged-in user’s bills with Update/Delete options and PDF download. |
| **About**            | Information about the platform and its purpose.                              |
| **Profile**          | Shows and allows updating of user's display name and profile photo.          |
| **Login / Register** | Authentication pages with Firebase and Google login.                         |
| **404 Page**         | Custom not-found route handling.                                             |

---

## 🧩 Additional Features

- 🌓 Dark/Light Theme Toggle

- 🔁 Smooth Scroll & Animations

- 🎥 Lottie or Framer Motion for UI Effects

- 🔔 Toasts for Success/Error Feedback

- 🔒 Persistent Login State (Private Routes)

---

## 💻 Installation & Setup

Follow these steps to run the project locally:


```bash
1. Clone the repository
git clone https://github.com/jubayer-bd/Utility_Bills_Client_Side.git

2. Navigate to the project directory
cd warmpaws

3. Install dependencies
npm install

4. Configure Firebase Keys
Create a .env.local file in the root folder and add your Firebase credentials:
VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_app_id

5. Start the server
npm run dev

---

## 🧾 MongoDB Collections

### **bills**

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

{
  "email": "user@gmail.com",
  "billId": "674e5f...",
  "username": "Jubayer",
  "address": "Mirpur, Dhaka",
  "phone": "017XXXXXXXX",
  "amount": 1200,
  "date": "2025-11-08"
}

---

```
