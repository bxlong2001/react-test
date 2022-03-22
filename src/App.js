import { useState, useEffect } from "react";
import Show from "./Show";
import Test from "./Test";

function App() {
  // localStorage.removeItem("word")
  const [showTest, setShowTest] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [show, setShow] = useState(false)
  const [word, setWord] = useState('');
  const [mean, setMean] = useState('');
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
  };

  const handleSearch = () => {
    // const newWordsSort = words.map(word => [...word.word])
    // console.log(newWordsSort);
    // console.log(newWordsSort.sort());
    const resultWord = words.find((findWord) => word === findWord.word);
    setMean(resultWord.mean)
  }

  return (
    <div classword="App" style={{marginTop: 140}}>
      <div class="text text-1">ひ</div>
      <div class="text text-2">ら</div>
      <div class="text text-3">が</div>
      <div class="text text-4">な</div>
      <div>
        <label>Japanese: </label>
        <input 
          placeholder="Input word..." 
          value={word}
          onChange={(e) => {setWord(e.target.value)}}
        />
      </div>

      <div style={{marginTop: 5}}>
        <label>Vietnamese: </label>
        <input
          placeholder="Input mean..."
          value={mean}
          onChange={(e) => setMean(e.target.value)}
        />
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={handleAdd}>Add</button>
        <button style={{ marginLeft: 5 }} onClick={() => {setShow(!show); setShowTest(false)}}>List</button>
        <button style={{ marginLeft: 5 }} onClick={handleSearch}>Search</button>
        <button style={{ marginLeft: 5 }} onClick={() => {setShowTest(!showTest); setShow(false)}}>Test</button>
        
      </div>
      {show && <Show words={words}/>}
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
      {showTest && <Test words={words}/>}
    </div>
  );
}

export default App;
