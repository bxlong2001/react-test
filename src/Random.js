import { useState } from "react"

function Random( { words } ) {
    const [indexRandom, setIndexRandom] = useState(Math.floor(Math.random() * words.length))
    const [result, setResult] = useState()
    console.log(result);

    const handleRandom = (e) => {
        e.target.value = null
        setIndexRandom(Math.floor(Math.random() * words.length))
    }

    const handleSubmit = (e) => {
        setResult(e.target.value)
    }

    const handleKeyDown = (e) => {
        e.key==="Enter" && result === words[indexRandom].mean && handleRandom(e)
    }

    return (
        <div id="random">
            {/* <button onClick={handleRandom}>Random</button> */}
            {Number.isInteger(indexRandom) && (
                <>
                    <h1 className="word_random">{words[indexRandom].word}</h1>
                    <input
                        style={{
                            maxWidth: 250,
                            textAlign: "center"
                        }}
                        onChange={handleSubmit}
                        onKeyDown={handleKeyDown}
                    />
                </>
            )}
        </div>
    )
}

export default Random