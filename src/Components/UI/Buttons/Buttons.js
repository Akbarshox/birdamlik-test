import React from "react";
import Aux from '../../../hoc/Wrapper';
import styles from './Buttons.module.css';



const button = (props) => {
  //   const { classes } = props;
  return (
    <Aux>
      <button
        disabled={props.disabled}
        className={[styles.Button, styles[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}
      </button>
    </Aux>
  );
};

export default (button);