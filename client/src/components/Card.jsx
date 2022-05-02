import React from 'react';

export default function Card ({name, image, temperament}){
    return (
        <div>
             <h3>{name}</h3>
                 <h5>{temperament}</h5>
                     <img src={image} alt ='img not found' width= '200px' height='250px' />
        </div>
    );
}

