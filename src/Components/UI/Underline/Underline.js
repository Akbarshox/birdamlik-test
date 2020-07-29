import React from "react";
import Aux from '../../../hoc/Wrapper';
import styles from './Underline.module.css';



const underlined = (props) => {
  return (
    <Aux>
      <div className={styles.underline}></div>
    </Aux>
  );
};

export default (underlined);