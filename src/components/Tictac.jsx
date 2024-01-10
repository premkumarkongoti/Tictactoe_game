import React, {useState} from 'react'
import './Tictac.css'
import circleIcon from '../assets/circle.png'
import crossIcon from '../assets/cross.png'
import Game from './Game' 
import { Link ,useNavigate } from 'react-router-dom'
import InviteButton from './InviteButton';



function Tictac() {

  const [showInviteButton, setShowInviteButton] = useState(false);




  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  const startGame = (choice) => {
    setGameStarted(true);
    
    setShowInviteButton(true);
  
    
  };
  const showInvite = () => {
    setShowInviteButton(true);
  };



  return (
    <div className='container'>
    {gameStarted ? (
      <Game />
    ) : (
      <div>
        <div className='images'>
        <img src={crossIcon} alt="Description of the image" />
        <img src={circleIcon} alt="Description of the image" />
        </div>
    
        <div className='smallcontainer'><div className='pickplayer'>PICK PLAYER</div>
        <div className='buttons'>
        <Link to="/game" className='btn1'  onClick={() =>startGame("X")}>
         <div className='btn1' onClick={() =>startGame("X")}><img src={crossIcon}></img>
         </div>
         </Link>
        
         <Link to="/game" onClick={() =>startGame("O")}>
         <div className='btn2' onClick={() =>startGame("O")}><img src={circleIcon}></img></div>
         </Link>
        </div>
        
        </div>
        <Link to="/game" onClick={startGame}>
        <div className='newgame1'><button className='newgame1'>NEW GAME (VS CPU)</button></div></Link>
        <div className='newgame2'><button className='newgame2'>NEW GAME (VS HUMAN) coming soon</button></div>
        <div>
        <div className='invite' onClick={showInvite}>Invite your friend</div>
        <div>
            {showInviteButton && <InviteButton />}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default Tictac;