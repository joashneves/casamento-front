import { Button } from "primereact/button";
import React from "react";
import { Link } from "react-router-dom";
import styles from './Presentes.module.css';

export const Presente = () =>{
  return(<>
  <h3>Presentes</h3>
  <p>Quer presentear os noivos? Confira aqui algumas sugestões!</p>
  <Link to="/gifts">
  <Button className={styles.botaocapenga} label="Presentes"/>
  </Link>
  </>)
}