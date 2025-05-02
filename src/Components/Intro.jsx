import React from 'react';
import { Link } from 'react-router-dom';

const Intro = () => {
    return (
      <>
        <div className="header">
         <img src="/images/logo-blue.png" alt="SayLess logo with smiling mouth"></img>
        </div>

        <h2 className="motto">The fun phrase game you will be itching to play!</h2>
        <h3 className="intro-premise">Think you can trim down a classic quote to its bare essentials while keeping it recognizable? Welcome to <i>SayLess</i>!
        <br></br><br></br>
        Player One receives a well-known phrase. The challenge? Shorten it to fewer characters while keeping it guessable. Can your partner guess the original phrase from your minimal masterpiece?
        <br></br><br></br>
        It's fast, it's clever, and it's a hilariously high-stakes word game where every letter counts!
        </h3>
        
        <h2 className="rules">Game Play</h2>
          <h4>
           <ol>
            <li>Player One receives a phrase to shorten.</li>
            <li>Player One shortens the phrase by using only a portion of the characters used in the original phrase.</li>
            <li>Player One sends the reduced phrase to Player Two to decipher.</li>
            <li>Player Two must guess the original phrase to win!</li>
           </ol>
          </h4>
          <video className="intro-demo" width="500px" height="400px" controls="controls">
              <source src="images/intro-vid.mp4" type="video/mp4" />
          </video>
          
          
          
              <Link to="/game">
                <button className="intro-button">Say Less! Let's Play!</button>
              </Link>
         

      </>

)};

export default Intro;