import { useState, memo, useRef, useContext } from "react"
import { WordsContext } from "./App"
function Random() {
    const words = useContext(WordsContext)
    // const words = useRef([{"word":"あ","mean":"a"},{"word":"い","mean":"i"},{"word":"う","mean":"u"},{"word":"え","mean":"e"}])
    const [result, setResult] = useState()
    const [newWords, setNewWords] = useState([...words])
    const indexRandom = useRef(Math.floor(Math.random() * newWords.length))
    // console.log("ngoai", newWords);
    // console.log("ngoai", indexRandom.current);

    const handleRandom = e => {
        // console.log(newWords);
        // console.log(words.current);
        // console.log("trong",indexRandom.current);
        e.target.value = null
        // newWords.length === 1 && setNewWords([...words])
        setNewWords(prev => {
            console.log("before: ",prev);
            if(prev.length === 0) {
                prev = [...words]
                console.log("add");
            }else {
                prev.splice(indexRandom.current,1)
            }
            indexRandom.current = Math.floor(Math.random() * newWords.length)
            console.log("after: ",prev);
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
            {/* <button onClick={handleRandom}>Random</button> */}
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