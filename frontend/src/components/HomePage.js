import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "../styles/HomePage.module.css";
import baking from "../images/baking.png";
import logo from "../images/logo.png";

export default function HomePage() {
  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 style={{ fontSize: "40px" }}>
            <img className={styles.logo} src={logo} />
            Campus Cooks
          </h1>
        </div>
        <div>
          <h2 className={styles.title}>
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
          <img className={styles.baking} src={baking} />
        </div>
      </div>
    </>
  );
}
