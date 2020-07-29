import React,  { useState, useEffect } from 'react';
import ReactStars from 'react-stars';

export default function HalfRating(props) {
    const [rate, setRate] = useState(0)
    useEffect(() => {
        setRate(props.rate);
    },[props.rate]);
   return (
       <ReactStars
           count={5}
           size={props.size}
           color2={"#ffd600"}
           half={false}
           color1={"#ccc"}
           edit={false}
           value={rate}
       />
   );
}