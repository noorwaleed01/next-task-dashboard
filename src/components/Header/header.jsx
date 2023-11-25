"use client";

import { Container } from "../container/container";
import styles from "./header.module.css";



export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>
          <h2>Dashboard</h2>
          <div className={styles.admin}>
            <h4>Noor</h4>
            <div className={styles.avatar}>
              <img src="girl.svg" />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
