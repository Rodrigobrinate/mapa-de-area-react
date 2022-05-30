import  react, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

export default function Alerts({msg, variant}) {
    console.log(msg)
    return (
        <Alert variant={variant}>
        
                {msg}
            
            
        </Alert>
    )

    
}