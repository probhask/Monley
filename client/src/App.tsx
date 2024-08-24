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
import { ErrorBoundary, LoadingSpinner, PageNotFound } from "./components";
import { lazy, Suspense } from "react";
const Search = lazy(() => import("./pages/Search"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="w-screen h-screen flex flex-col justify-center items-center">
            <LoadingSpinner />
            <span className="text-lg font-semibold"> Loading...</span>
          </div>
        }
      >
        <ErrorBoundary>
          <HomeLayout />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <div className="w-screen h-screen flex flex-col justify-center items-center">
                <LoadingSpinner />
                <span className="text-lg font-semibold"> Loading...</span>
              </div>
            }
          >
            <Landing />
          </Suspense>
        ),
      },
      {
        path: "shop",
        element: (
          <Suspense
            fallback={
              <div className="w-screen h-screen flex flex-col justify-center items-center">
                <LoadingSpinner />
                <span className="text-lg font-semibold"> Loading...</span>
              </div>
            }
          >
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "shop/product/:id",
        element: (
          <Suspense
            fallback={
              <div className="w-screen h-screen flex flex-col justify-center items-center">
                <LoadingSpinner />
                <span className="text-lg font-semibold"> Loading...</span>
              </div>
            }
          >
            <ItemDetail />
          </Suspense>
        ),
        errorElement: (
          <div className="my-10 text-center text-xl font-semibold uppercase">
            Unable to get product details
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
        element: (
          <Suspense
            fallback={
              <div className="w-screen h-screen flex flex-col justify-center items-center ">
                <LoadingSpinner />
                <span className="text-lg font-semibold"> Loading...</span>
              </div>
            }
          >
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "user-profile",
        element: (
          <Suspense
            fallback={
              <div className="w-screen h-screen flex flex-col justify-center items-center">
                <LoadingSpinner />
                <span className="text-lg font-semibold"> Loading...</span>
              </div>
            }
          >
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "order",
        element: (
          <Suspense
            fallback={
              <div className="w-screen h-screen flex flex-col justify-center items-center">
                <LoadingSpinner />
                <span className="text-lg font-semibold"> Loading...</span>
              </div>
            }
          >
            <Order />
          </Suspense>
        ),
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
