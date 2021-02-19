import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "../styles/HomePage.module.css";
import baking from "../images/baking.png";

export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Campus Cooks!</h1>
        <div>
          <h2 className={styles.description}>
            UWaterloo's platform for sharing and trying new foods
          </h2>
          <Button
            href="/login"
            variant="outline-dark"
            size="lg"
            style={{ marginRight: "15px" }}
          >
            Log In
          </Button>
          <Button href="/browse" variant="dark" size="lg">
            Browse foods
          </Button>
          <img src={baking} />
        </div>
      </div>
    </>
  );
}
