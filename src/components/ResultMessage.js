// ResultMessage.js
import React ,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';


const ResultMessage = ({message, onClose  }) => {

  const [gameStart, setGameStart] = useState(false);
  const navigate1 = useNavigate();


  const startHome = () => {
    setGameStart(true);
    
    
  };

  return (
    <div className="result-message">
      <p className='message1'>YOU WON</p>
      <p className='message2'>{message}</p>
      <div className='rbuttons'>
      <Link to="/tictac" className='quit' onClick={startHome}><div>QUIT</div></Link>
      <button onClick={onClose} className='next'>NEXT ROUND</button>
      </div>
    </div>
  );
};

export default ResultMessage;
