// import {useState} from "react"

function Show({ words }) {
    return (
        <ul id="ul-list" >
            {words.map((word,index) => (
                <li className="list" key={index}>{index+1}. {word.word} : {word.mean}</li>
            ))}
        </ul>
    )
}

export default Show