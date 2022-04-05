import styles from './App.module.css'
import clsx from 'clsx'
import Show from "./Show";
import Test from "./Test";
import { useState, useEffect, useRef, createContext } from "react";
export const WordsContext = createContext()

function App() {
  // localStorage.removeItem("word")
  const [showTest, setShowTest] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [show, setShow] = useState(false)
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');
  const inputWord = useRef()
  const [words, setWords] = useState(() => {
    const storageWords = JSON.parse(localStorage.getItem("words"));
    return storageWords ?? [];
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY >= 150)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleAdd = () => {
    setWords((prev) => {
      if(word && mean){
        const newWords = [...prev, {word, mean}];
      

        //Save to local storage
        const jsonWords = JSON.stringify(newWords);
        localStorage.setItem("words", jsonWords);
        return newWords;
      }
      return prev;
    })

    setWord('')
    setMean('')
    inputWord.current.focus()
  };

  const handleSearch = () => {
    // const newWordsSort = words.map(word => [...word.word])
    // console.log(newWordsSort);
    // console.log(newWordsSort.sort());
    const resultWord = words.find((findWord) => word === findWord.word);
    word && setMean(resultWord.mean)
    const resultMean = words.find((findMean) => mean === findMean.mean);
    mean && setWord(resultMean.word)
  }

  return (
    <WordsContext.Provider value={words}>
      <div id="app" style={{marginTop: 100}}>
        <div class="text text-1">日</div>
        <div class="text text-2">本</div>
        <div class="text text-3">語</div>
        <div>
          <label>日本語: </label>
          <input 
            ref={inputWord}
            placeholder="Input word..." 
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>

        <div style={{marginTop: 5}}>
          <label>ベトナム語: </label>
          <input
            placeholder="Input mean..."
            value={mean}
            onChange={(e) => setMean(e.target.value)}
            onKeyDown={e => (e.key==="Enter" && handleAdd())}
          />
        </div>
        <div>
          <button
            className={clsx('btn')}
            onClick={handleAdd}
          >
            Add
          </button>
          <button 
            className={clsx('btn', {
              [styles.active]: show
            })} 
            onClick={() => {setShow(!show); setShowTest(false)}}
          >
            List
          </button>
          <button
            className={clsx('btn')}
            onClick={handleSearch}
          >
            Search
          </button>
          <button 
            className={clsx('btn', {
              [styles.active]: showTest
            })}
            onClick={() => {setShowTest(!showTest); setShow(false)}}
          >
            テスト
          </button>
        </div>

        {show && <Show words={words}/>}
        {showTest && <Test/>}

      </div>
        {/* Show scroll top     */}
        {showTop && (
          <button
            style={{
              position: 'fixed',
              right: 20,
              bottom: 20,
            }}

            onClick={() => window.scrollTo( {left: 0, top: 0, behavior: 'smooth'})}
          >
            うえ
          </button>
        )}
    </WordsContext.Provider>
  );
}

export default App;
