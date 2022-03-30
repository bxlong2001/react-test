import { memo } from 'react'
import Random from './Random'
import Countdown from './Countdown'

function Test() {
    return (
        <>
            <Countdown />
            <Random/>
        </>
    )
}

export default memo(Test)