"use client";

import { useAppStore } from "@/store";
import { Modal } from "../Modal/modal";
import styles from "./form.module.css";

export const From = () => {
  const {
    isOpen,
    setIsOpen,
    id,
    title,
    setTitle,
    setId,
    description,
    setDescription,
    price,
    setPrice,
  } = useAppStore();

  const update = () => {
    fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        price,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const add = () => {
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        price,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const handleSave = () => {
    if (id) {
      update();
      alert("Updated");
    } else {
      add();
      alert("Additon ");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <dev className={styles.topmodal}>
        <h4>Edit Modal</h4>
        <button className={styles.x}
          onClick={() => {
            setTitle("");
            setDescription("");
            setPrice("");
            setId(null);
            setIsOpen(false);
          }} >X</button></dev>



      <div className={styles.input}>
        <p>Title</p>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={styles.inputtitle} />
      </div>
      <div className={styles.input}>
        <p>Description</p>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.des} />
      </div>
      <div className={styles.input}>
        <p>Price</p>
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
      </div>
      <br />
      <button className={styles.save}
        onClick={() => {
          handleSave();
          setIsOpen(false); }}> Save </button>



      <button className={styles.cancel} onClick={() => {
        setTitle("");
        setDescription("");
        setPrice("");
        setId(null);
        setIsOpen(false);
      }}>Cancel</button>
    </Modal>
  );
};
