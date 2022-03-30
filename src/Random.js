import { useState, memo, useRef, useContext } from "react"
import { WordsContext } from "./App"


function Random() {
    const words = useContext(WordsContext)
    const btn_none = useRef()
    // const words = useRef([{"word":"あ","mean":"a"},{"word":"い","mean":"i"},{"word":"う","mean":"u"},{"word":"え","mean":"e"}])
    const [result, setResult] = useState()
    const [newWords, setNewWords] = useState([])
    const indexRandom = useRef()
    // console.log("ngoai", newWords);
    console.log("ngoai", indexRandom.current);

    const handleRandom = e => {
        btn_none.current.style.display = "none"
        // console.log(newWords);
        // console.log(words.current);
        console.log("trong",indexRandom.current);
        e.target.value = null
        // newWords.length === 1 && setNewWords([...words])
        setNewWords(prev => {
            // console.log("before: ",prev);
            // console.log("before: ",indexRandom.current);
            if(prev.length <= 1) {
                prev = [...words]
                console.log("add");
            }else {
                Number.isInteger(indexRandom.current) && prev.splice(indexRandom.current,1)
            }
            indexRandom.current = Math.floor(Math.random() * prev.length)
            // console.log("after: ",prev);
            // console.log("after: ",indexRandom.current);
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
            <button className="btn" style={{ width: 100, height: 30}} ref={btn_none} onClick={handleRandom}>Random</button>
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