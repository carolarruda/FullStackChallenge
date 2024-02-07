import TableProducts from "../Table/TableProducts";
import classes from "./ProductList.module.css";

const ProductList = ({ products, setProducts }) => {
  return (
    <div className={classes.clientsContainer}>
      <h3 className={classes.title}>Products</h3>
      <div className={classes.tableContainer}>
        <TableProducts products={products}  setProducts={setProducts}/>
      </div>
    </div>
  );
};

export default ProductList;
