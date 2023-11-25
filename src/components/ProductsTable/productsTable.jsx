"use client";
import { useEffect, useState } from "react";
import { Container } from "../container/container";
import styles from "./productsTable.module.css";
import { useAppStore } from "@/store";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";




export const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const { setIsOpen, setId, setTitle, setDescription, setPrice } =
    useAppStore();

  const getProducts = () => {
    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  };

  useEffect(() => {
    getProducts();
  }, [search]);

  return (

    <div className={styles.table}>
      <Container>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />


        <dev className={styles.rowflex}>
          <input type="text" className={styles.searchbtn} value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Find Product"
            onKeyDown={(e) => {
              if (e.key === "Enter") { setSearch(value); }
            }
            } />


          <button className={styles.btnmodal}
            onClick={() => {
              setId(null);
              setTitle("");
              setDescription("");
              setIsOpen(true);
            }}
          > + New Product </button></dev>


        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((el, i) => (
              <tr key={i}>
                <td>{el.id}</td>
                <td>
                  <b>{el.title}</b></td>
                <td>
                  <b>{el.price} $</b>
                </td>
                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => {
                      setId(el.id);
                      setTitle(el.title);
                      setDescription(el.description);
                      setPrice(el.price);
                      setIsOpen(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <Delete id={el.id} />
                </td>

             
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
};


function Delete({ id }) {
  const deleteProduct = () => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(console.log);
  };
  return (
    <div>
      <button
        className={styles.deleteBtn} onClick={deleteProduct}> <MdOutlineDeleteForever /> </button> </div>
  );
}
export default Delete;