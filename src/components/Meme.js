import React, {useEffect, useState} from "react";
import memesData from "../memesData";


function Meme() {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: ""
    })
    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        async function getMemes(){
            const response = await fetch("https://api.imgflip.com/get_memes")
            const data = await response.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    return (
       <main>
            <div className="form">
                <input type="Text" className="form--input" placeholder="Top text" name="topText" value={meme.topText} onChange = {handleChange}/>
                <input type="Text" className="form--input" placeholder="Bottom text"  name="bottomText" value={meme.bottomText} onChange = {handleChange}/>
            </div>
            <div className="button--form">
                <button onClick={getMemeImage} className="form--button"> Get a new Meme </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top ">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}

export default Meme;