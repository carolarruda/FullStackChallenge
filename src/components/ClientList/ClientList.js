import TableRemoveFunc from "../Table/TableRemoveFunc";
import classes from "./ClientsList.module.css";

const ClientList = ({ clients, setClients }) => {
  return (
    <div className={classes.clientsContainer}>
      <h3 className={classes.title}>All Customers</h3>
      <div className={classes.tableContainer}>
        <TableRemoveFunc clients={clients} setClients={setClients} />
      </div>
    </div>
  );
};

export default ClientList;
