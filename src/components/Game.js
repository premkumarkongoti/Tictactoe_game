import React, { useState, useEffect } from 'react';
import './Tictac.css';
import bcircleIcon from '../assets/bcircle.png';
import bcrossIcon from '../assets/bcross.png';
import './Game.css';
import circleIcon from '../assets/circle.png'
import crossIcon from '../assets/cross.png'
import resetIcon from '../assets/reset.png' 
import ResultMessage from './ResultMessage';
import { Link } from 'react-router-dom';
import Quit from './Quit';

const Game = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [initialData, setInitialData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [showResultMessage, setShowResultMessage] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [tieScore, setTieScore] = useState(0);
  const [showQuit, setShowQuit] = useState(false);
  
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);





  const resetGame = () => {
    setCount(0);
    setLock(false);
    setData(initialData);
    setShowResultMessage(false);
    setShowQuit(false); 

  };


  const resetGame1 = () => {
    setCount(0);
    setLock(false);
    setData(initialData);
    setShowResultMessage(false);
    setShowQuit(false);
    setOScore(0);
    setTieScore(0);
    setXScore(0) 

  };

  const reset1 = () =>{
    setShowQuit(true);
    setCount(0);
    setData(initialData);
    

  }
  
  const playAgain = () => {
    setShowQuit(false);
    setCount(0);
    setData(initialData);
    setOScore(0);
    setTieScore(0);
    setXScore(0)
  };
 

  const updateScores = (winner) => {
    if (winner === 'x') {
      setXScore((prevScore) => prevScore + 1);
    } else if (winner === 'o') {
      setOScore((prevScore) => prevScore + 1);
    } else {
      setTieScore((prevScore) => prevScore + 1);
    }
  };



  const checkWin = () => {
    // Check for a win
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] !== "" && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return; // Exit if there's a winner
      }
    }

    // Check for a tie
    if (count === 9 && !showResultMessage) {
      console.log("tie");
      tied();
    } else {
      console.log("Tie condition not met");
      console.log("data:", data);
      console.log("showResultMessage:", showResultMessage);
    }
  
    
  };

  const toggle = (num) => {
    if (lock || data[num] !== "") {
      return;
    }

    const newData = data.slice();
    newData[num] = count % 2 === 0 ? "x" : "o";


    setData(newData);
    setCount((prevCount) => prevCount + 1);
    checkWin();

    
  };

  const computerTurn = () => {
    if (lock || count % 2 === 0) {
      return;
    }

    let emptySquares = data.reduce((acc, val, index) => {
      if (val === "") {
        acc.push(index);
      }
      return acc;
    }, []);

    if (emptySquares.length === 0) {
      return; // No empty squares left
    }

    let randomIndex = Math.floor(Math.random() * emptySquares.length);
    let computerMove = emptySquares[randomIndex];

    
    toggle(computerMove);
    
  };

  useEffect(() => {
    if (count % 2 !== 0 && !lock) {
      setTimeout(computerTurn, 1000);
    }
  }, [count, lock]);

  const won = (winner) => {
    setLock(true);
    setResultMessage(`${winner === 'o' ? 'O' : 'X'} TAKES THE ROUND`);
    setShowResultMessage(true);
    updateScores(winner);
  };

  const tied = () => {
    setLock(true);
    setResultMessage("It's a tie!");
    setShowResultMessage(true);
    updateScores(null);
  
  };

  // ... (rest of your JSX)





  



  return (
    <div>
      <div className='gamecontainer'>
        <div>
          <div className='tic-tac-toe'>
            <div className='board'>
              <div className='row1'>
              <div className='box4'><img src={crossIcon}></img><img src={circleIcon}></img></div>
                <div className='boxes' onClick={() => toggle(0)}>
                  {data[0] === 'x' && <img src={bcrossIcon} alt='cross' />}
                  {data[0] === 'o' && <img src={bcircleIcon} alt='circle' />}
                </div>
                <div className='boxes' onClick={() => toggle(1)}>
                  {data[1] === 'x' && <img src={bcrossIcon} alt='cross' />}
                  {data[1] === 'o' && <img src={bcircleIcon} alt='circle' />}
                </div>
                <div className='boxes' onClick={() => toggle(2)}>
                  {data[2] === 'x' && <img src={bcrossIcon} alt='cross' />}
                  {data[2] === 'o' && <img src={bcircleIcon} alt='circle' />}
                </div>
                <div className='box1'><div className='you'>X(YOU)</div><div className='xscore'>{xScore}</div></div>
              </div>
              <div className='row2'>
              <div className='box5' >X TURN</div>
                <div className='boxes' onClick={() => toggle(3)}>
                  {data[3] === 'x' && <img src={bcrossIcon} alt='cross' />}
                  {data[3] === 'o' && <img src={bcircleIcon} alt='circle' />}
                </div>
                <div className='boxes' onClick={() => toggle(4)}>
                  {data[4] === 'x' && <img src={bcrossIcon} alt='cross' />}
                  {data[4] === 'o' && <img src={bcircleIcon} alt='circle' />}
                </div>
                <div className='boxes' onClick={() => toggle(5)}>
                  {data[5] === 'x' && <img src={bcrossIcon} alt='cross' />}
                  {data[5] === 'o' && <img src={bcircleIcon} alt='circle' />}
                </div>
                <div className='box2'><div className='ties'>TIES</div><div className='tscore'>{tieScore}</div></div>
              </div>
              <div className='row3'>
              <div className='box6' onClick={reset1}><img src={resetIcon}></img>
            
              </div>
                <div className='boxes' onClick={() => toggle(6)}>
                  {data[6] === 'x' && <img src={bcrossIcon} alt='cross' />}
                  {data[6] === 'o' && <img src={bcircleIcon} alt='circle' />}
                </div>
                <div className='boxes' onClick={() => toggle(7)}>
                  {data[7] === 'x' && <img src={bcrossIcon} alt='cross' />}
                  {data[7] === 'o' && <img src={bcircleIcon} alt='circle' />}
                </div>
                <div className='boxes' onClick={() => toggle(8)}>
                  {data[8] === 'x' && <img src={bcrossIcon} alt='cross' />}
                  {data[8] === 'o' && <img src={bcircleIcon} alt='circle' />}
                </div>
                <div className='box3'><div className='cpu'>O (CPU)</div><div className='oscore'>{oScore}</div></div>
              </div>
              <div className={`result ${showResultMessage ? 'visible' : 'hidden'}`}>
              
              {showResultMessage && <ResultMessage message={resultMessage}  onClose={resetGame} /> }
              
              </div>
              <div className='quitContainer'> {showQuit && <Quit onClose1={resetGame1} onPlayAgain={playAgain}/>}</div>
              
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};
      export default Game;
