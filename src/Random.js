import { useState, memo, useRef } from "react"

function Random( {words} ) {
    const [result, setResult] = useState()
    const [newWords, setNewWords] = useState([...words])

    const indexRandom = useRef()

    const handleRandom = e => {
        e.target.value = null
        newWords.length === 1 && setNewWords([...words])
        setNewWords(prev => {
            prev.splice(indexRandom.current,1)
            indexRandom.current = Math.floor(Math.random() * newWords.length)
            return [...prev]
        })
    }

    const handleSubmit = (e) => {
        setResult(e.target.value)
    }

    const handleKeyDown = (e) => {
        e.key==="Enter" && result === newWords[indexRandom.current].mean && handleRandom(e)
    }

    return (
        <div id="random">
            <button onClick={handleRandom}>Random</button>
            {Number.isInteger(indexRandom.current) && (
                <>
                    <h1 className="word_random">{newWords[indexRandom.current].word}</h1>
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

export default memo(Random)