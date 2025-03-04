import React, { useState, useEffect } from 'react';
import { updateText, useTestDispatch } from '../context/context'


const Button = () => {
    const dispatch = useTestDispatch()
    const [text, setText] = useState("")
    const [debouncedType, setDebouncedType] = useState("")

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedType(text)
        }, 2000);



        return () => clearTimeout(handler)
    }, [text])

    useEffect(() => {
        if (debouncedType !== "") {
            if (text !== "") {
                updateText(dispatch, text)
            }
        }
    }, [debouncedType])
    return (
        <>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            {/* <button onClick={handleClick}> کلیک کنید</button> */}
        </>
    );
}

export default Button;