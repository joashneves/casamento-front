import React from "react";
import styles from './Bloco.module.css'

export const Bloco = ({ color }) =>{
  return(<>
    <div className={styles.bloco} style={{ backgroundColor: color }}></div>
  </>)

}