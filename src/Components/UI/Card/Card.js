import React from "react";
import Aux from '../../../hoc/Wrapper';
import styles from './Card.module.css';


const card = (props) => {
  //   const { classes } = props;
  return (
    <Aux>
      <div className={[styles.Card, styles[props.cardType]].join(' ')}>
          {props.children}
      </div>
    </Aux>
  );
};

export default (card);