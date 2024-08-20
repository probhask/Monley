# Monley E-commerce Project

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
  - [Frontend Structure](#frontend-structure)
  - [Backend Structure](#backend-structure)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Pages](#pages)
- [Features](#features)
  - [Product Listing](#product-listing)
  - [Product Details](#product-details)
  - [Cart Management](#cart-management)
  - [Checkout](#checkout)
  - [User Authentication](#user-authentication)

## Overview

The Monley E-commerce project is a full-stack web application built using React and TypeScript for the frontend and Node.js for the backend. The application provides a seamless online shopping experience with features such as product browsing, cart management, and user authentication.

[Website Link🔗](https://monley.netlify.app) - https://monley.netlify.app

- **Home Page**
  [!Home Page Image](./website_images/home.png)

## Project Structure

### Frontend Structure

The frontend is organized into several key directories, each responsible for different aspects of the application:

- **src/**: This is the main directory where all the source code resides. Below are the subdirectories and key files within `src/`:
- **components/**: contains Reusable UI components that are used across different part of the application.
- **context/**: Context providers managing global state .
- **features/**: Specific functionalities such as product listing, filtering, and checkout.
- **hooks/**: Custom React Hooks that encapsulates the logic used by multiple components.
- **pages/**: contains main pages of the application,such as Home, Product Details, Cart, and login/logout page
- **store/**: Manages the application's global store with redux
- **utils/**: Utility functions for various tasks
- **index.css**: Global styles
- **main.tsx**: Application entry point.
- **types.ts**: Custom TypeScript type definitions.

### Backend Structure

The backend is structured to manage the server, database, and API routes:

- **server.js**: The server.js file is the entry point of the backend, initializing the server and handling the request.
- **Database Folder**: Contains data in JSON format, acting as a simple database for the application.
- **Router Folder**: Houses the functionality for different API routes, handling various HTTP Request.
- **Data Folder**: Contains functions specific to each route, helping to organize the logic related to data handling and processing.

## Installation

To get started with the Monley E-commerce project, follow these steps:

1. **Clone the repository:he repository:**

```bash
   git clone https://github.com/probhask/Monley.git
```

2. **Install dependencies for both frontend and backend:**

```bash
 cd client
 npm install
 cd ..
 cd server
 npm install
```

3. **set url**
   For API Integration

- **Frontend:**
  Create .env file and paste this code

  ```bash
  VITE_BACKEND_URL=http://localhost:3000
  ```

- **Backend:**
  In `server.js` file in corsOptions object set origin with the url your react project is running. For example: http://localhost:5173

  ```bash
  const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "HEAD"],
  credentials: true,
  };
  ```

4. **Run the frontend and baFrontend::**

- **Frontend:**

  ```bash
    npm run dev
  ```

- **Backend:**

```bash
  node server.js
```

The frontend should now be running and the backend at http://localhost:3000.

## Technologies Used

- **Frontend**:

  - React
  - TypeScript
  - Vite
  - Redux
  - Tailwind CSS
  - CSS Modules

- **Backend**:

  - Node.js
  - Express.js
  - JSON for database storage

## Pages

- **Home**: A landing page includes content such as banner, featured, best seller product.
- **Shop**: Product browsing page with infinite scrolling.
- **Product Details**: Product details includes images, descriptions,specifications and reviews
- **Search**:Quick search by name or description with filtering and pagination.
- **Cart**: List of product in cart
- **User Profile**: Contains User Details and purchase history.
- **Login**: For login
- **Register**: For new Account creation.

## Pages Image

- **Home Page**
  [!Home Page Image](./website_images/home.png)
- **Shop Page**
  [!Shop Page Image](./website_images/shop.png)
- **Search Page**
  [!Search Page Image](./website_images/search.png)
- **cart Page**
  [!cart Page Image](./website_images/cart.png)
- **Order Page**
  [!Order Page Image](./website_images/order.png)
- **User Profile Page**
  [!User Profile Page Image](./website_images/profile.png)
- **Login Page**
  [!cart Page Image](./website_images/login.png)

## Features

### Product Listing

- **Search Functionality**: Quick search by name or description.
- **Dynamic Filtering and Sorting**: Filter and sort products in search page.
- **Pagination**: Product are displayed in pages for searching.
- **Infinite Scrolling**: Infante Scrolling is used to display products.

### Product details

- **Detailed Product View**: Includes images, descriptions,specifications and reviews.
- **Related Products**: Suggestions for similar or related products.

### Cart Management

- **Add/Remove Items**: Manage items in cart.

### Checkout

- **Payment Integration**: Dummy payment system.

### Themes

- **Dark/Light Theme**: Dark and light them toggle

### user Authentication

- **Sign Up / Login**: Account creation and login.
- **Protected Routes**: Certain pages are accessible only to authenticated users.

---

This project is a work in progress, and additional features and improvements are planned. Feedback are welcome!
