import { memo } from 'react'
import Random from './Random'
import Countdown from './Countdown'

function Test({words}) {
    return (
        <>
            <Countdown />
            <Random words={words}/>
        </>
    )
}

export default memo(Test)