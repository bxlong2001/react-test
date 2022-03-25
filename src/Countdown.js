import {memo, useEffect, useState} from 'react'


function Countdown() {
    const [timeCountDown, setTimeCountDown] = useState(1)
    const [timeTheEnd, setTimeTheEnd] = useState()

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeCountDown(prev => prev + 1)
        }, 1000)

        if (timeCountDown <= 0) {
            setTimeTheEnd('Time out!')
            clearInterval(timerId)
        }

        return () => clearInterval(timerId)
    }, [timeCountDown])

    return (
        <>
            <h1>{timeTheEnd ?? timeCountDown}</h1>
        </>
    )
}

export default memo(Countdown)