<div align="center">
  <h3 align="center">AutoPark - A Smart Parking Management System</h3>
   <p align="center">
     This project is inspired by the need for efficient and user-friendly parking solutions in urban areas. As a part of IoT project, it used a interface to connect users with available parking spaces in real-time.
  </p>
  <div>
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-ShadCN_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=000000" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Firebase-black?style=for-the-badge&logoColor=DD2C00&logo=firebase&color=FFCA28" alt="firebase" />
  </div>
</div>

## 🚗 Overview

AutoPark is a smart parking management system that allows users to easily manage their parking sessions, make secure payments, and track their parking history. Built with Next.js 15 and leveraging modern web technologies, AutoPark provides a seamless experience for both users and parking facility administrators.

The application connects to IoT parking hardware and provides real-time status updates, secure authentication, and payment processing. With its intuitive interface, AutoPark makes managing parking slots and sessions effortless.

## ✨ Features

- **Smart Parking Management** - Park and unlock vehicles with a single tap
- **User Authentication** - Secure sign-in with credentials and social providers
- **Real-time Status Updates** - Monitor parking status in real-time
- **Payment Processing** - Secure payment system for parking fees
- **Parking History** - Track and view complete parking history
- **User Profiles** - Manage personal information and payment methods
- **Weather Information** - Get local weather updates at parking locations
- **Push Notifications** - Receive important updates via web notifications
- **Responsive Design** - Optimized for mobile and tablet devices

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 15.4.3 (with App Router)
  - React 19.1.0
  - TypeScript 5.x
  - Tailwind CSS 4.x
  - React Hook Form with Zod validation

- **Backend**:
  - Next.js Server Actions
  - MongoDB with Mongoose ODM
  - NextAuth.js for authentication

- **Integrations**:
  - Firebase (Realtime Database, Cloud Messaging)
  - Resend for transactional emails

- **UI Components**:
  - Custom UI components based on Radix UI primitives
  - Recharts for data visualization
  - Sonner for toast notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- MongoDB instance (local or Atlas)
- Firebase project with Realtime Database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/lhlam2515/autopark-website.git
   cd autopark-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   AUTH_SECRET=your_auth_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_firebase_database_url
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
   NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY=your_firebase_fcm_vapid_key

   # Resend (Email)
   RESEND_API_KEY=your_resend_api_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🔗 Related Projects

- [AutoPark Firebase](https://github.com/lhlam2515/autopark-functions) - Firebase Cloud Functions for notifications delivery
