
import React ,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';


const Quit = ({onClose1}) => {

  const [gameStart1, setGameStart1] = useState(false);
  const navigate2 = useNavigate();


  const startHome1 = () => {
    setGameStart1(true);
    
    

    
    
    
  };

  return (
    <div className="resultMessage3">
      <p className='message1'></p>
      <p className='message2'>DO YOU WANT TO QUIT</p>
      <div className='rbuttons'>
      <button onClick={onClose1} className='next'>PLAY AGAIN</button>
      <Link to="/tictac" className='quit' onClick={startHome1}><div>QUIT</div></Link>
      </div>
    </div>
  );
};

export default Quit;
