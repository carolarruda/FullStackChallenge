import { useState } from "react";
import classes from "./Dashboard.module.css";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ClientList from "../ClientList/ClientList";
import ProductList from "../ProductList/ProductList";
import { useNavigate } from "react-router-dom";
import DashboardView from "./DashboardView";

const Dashboard = ({ clients, products, setProducts, setClients }) => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const nav = useNavigate();

  const handleLogout = () => {
    nav("/");
  };

  return (
    <section className={classes.section}>
      <nav className={classes.nav}>
        <ul className={classes.navItems}>
          <li>
            <button
              className={
                selectedTab === "Dashboard"
                  ? `${classes.button} ${classes.activeTab}`
                  : classes.button
              }
              onClick={() => setSelectedTab("Dashboard")}
            >
              <div className={classes.iconBox}>
                <HomeIcon
                  sx={{
                    borderRadius: "8px",
                    color: selectedTab === "Dashboard" ? "#5932ea" : "#9197B3",
                  }}
                />
              </div>
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              className={
                selectedTab === "Clients"
                  ? `${classes.button} ${classes.activeTab}`
                  : classes.button
              }
              onClick={() => setSelectedTab("Clients")}
            >
              <div className={classes.iconBox}>
                <GroupIcon
                  sx={{
                    borderRadius: "8px",
                    color: selectedTab === "Clients" ? "#5932ea" : "#9197B3",
                  }}
                />
              </div>
              <span>Clients</span>
            </button>
          </li>
          <li>
            <button
              className={
                selectedTab === "Products"
                  ? `${classes.button} ${classes.activeTab}`
                  : classes.button
              }
              onClick={() => setSelectedTab("Products")}
            >
              <div className={classes.iconBox}>
                <CategoryOutlinedIcon
                  sx={{
                    borderRadius: "8px",
                    color: selectedTab === "Products" ? "#5932ea" : "#9197B3",
                  }}
                />
              </div>
              <span>Products</span>
            </button>
          </li>
          <li>
            <button
              className={
                selectedTab === "Profile"
                  ? `${classes.button} ${classes.activeTab}`
                  : classes.button
              }
              onClick={() => setSelectedTab("Profile")}
            >
              <div className={classes.iconBox}>
                <AccountCircleOutlinedIcon
                  sx={{
                    borderRadius: "8px",
                    color: selectedTab === "Profile" ? "#5932ea" : "#9197B3",
                  }}
                />
              </div>
              <span>Profile</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className={classes.main}>
        <div className={classes.mainHeader}>
          <h2 className={classes.greeting}>
            Hello, {localStorage.getItem("username")}!{" "}
          </h2>
          <button onClick={handleLogout} className={classes.logout}>
            Logout
          </button>
        </div>
        {selectedTab === "Dashboard" && <DashboardView />}
        {selectedTab === "Clients" && (
          <ClientList clients={clients} setClients={setClients} />
        )}
        {selectedTab === "Products" && (
          <ProductList products={products} setProducts={setProducts} />
        )}
        {selectedTab === "Profile" && <h1>Hey user</h1>}
      </div>
    </section>
  );
};

export default Dashboard;
