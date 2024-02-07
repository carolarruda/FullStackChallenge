import Login from "../components/LoginAndSign/Login";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Dashboard from "../components/Dashboard/Dashboard";

export const Context = React.createContext();
export const ClientsContext = React.createContext();

const apiUrl = "http://localhost:4000";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [clients, setClients] = useState();
  const [products, setProducts] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/clients`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch clients data");
        }
        const data = await response.json();
        setClients(data.clients);
      } catch (error) {
        console.error("Error fetching clients data:", error);
      }
    };

    if (token) {
      setLoggedIn(true);
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products data");
        }
        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };

    if (token) {
      fetchProducts();
    }
  }, [token]);

  return (
    <Context.Provider value={[loggedIn, setLoggedIn]}>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Login clients={clients} setClients={setClients} />}
          />

          <Route
            path="/home"
            element={
              loggedIn && (
                <>
                  <Dashboard
                    setProducts={setProducts}
                    clients={clients}
                    products={products}
                    setClients={setClients}
                  />
                </>
              )
            }
          />
          <Route
            path="/register"
            element={
              <Login
                register={true}
                clients={clients}
                setClients={setClients}
                products={products}
                setProducts={setProducts}
              />
            }
          />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
