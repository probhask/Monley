import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  Cart,
  CreateAccount,
  HomeLayout,
  ItemDetail,
  Landing,
  Login,
  Order,
  Profile,
  // Search,
  Shop,
} from "./pages";
import { LoadingSpinner, PageNotFound } from "./components";
import { lazy, Suspense } from "react";
const Search = lazy(() => import("./pages/Search"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <HomeLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/product/:id",
        element: <ItemDetail />,
        errorElement: (
          <div className="my-10 text-center text-xl font-semibold uppercase">
            Unable to get product deatils
          </div>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
      {
        path: "search",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Search />,
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "user-profile",
        element: <Profile />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
