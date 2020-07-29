import React, { useState, useEffect } from 'react';
import ReactStars from 'react-stars';

export default function Rating(props) {
    const [rating, setRating] = useState(null);
  
    const ratingChanged = (newRating) => {
        setRating(newRating)
        props.rateChange(newRating);
    };

    return (
        <ReactStars
            count={5}
            onChange={ratingChanged}
            size={props.size}
            color2={"#ffd600"}
            half={false}
            color1={"#ccc"}
            value={rating}
        />
    );
}