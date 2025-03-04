import React from 'react';
import {useTestState} from '../context/context'


const Info = () => {
    const {InfoText}=useTestState()
    console.log(InfoText,"InfoText");
    
    return ( 
        <>
            <p style={{color:"red"}}> {InfoText}</p>
        </>
     );
}
 
export default Info;