import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./pages/root";
import { Menu } from "./pages/menu";
import { Item } from "./pages/item";
import { Cart } from "./pages/cart";
import { Info } from "./pages/info";
import { Checkout } from "./pages/checkout";
import { ThankYou } from "./pages/thankyou";
import { Admin } from "./pages/admin";
import { DataProvider } from "./components/data-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: "item/:id",
        element: <Item />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "info",
        element: <Info />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "thankYou",
        element: <ThankYou />,
      },
    ],
  },
  {
    path: "admin/*",
    element: <Admin />,
  },
]);

root.render(
  <ChakraProvider>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
