import React from 'react'
import quoteIcon from '../assets/quote.png'
import { useState, useEffect } from 'react';

function QuoteComponent() {



  const [quote, setQuote] = useState('Your inspirational quote goes here!');

  useEffect(() => {
    // Function to fetch a new quote from the API
    const fetchNewQuote = async () => {
      try {
        const response = await fetch(' https://api.adviceslip.com/advice');
        const data = await response.json();

        // Extract the advice from the API response
        const newQuote = data.slip.advice;

        // Update the state with the new quote
        setQuote(newQuote);
      } catch (error) {
        console.error('Error ', error);
      }
    };

    fetchNewQuote();

    // Set up an interval to fetch a new quote every 10 seconds
    const intervalId = setInterval(fetchNewQuote, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);



  return (
    <div className='quote-container'>
    <div className='head'>Quote #1</div>
      <p>"{quote}"</p>
      <div className='quoteimage'>
      <img src={quoteIcon}></img>
      </div>
    </div>
  )
}

export default QuoteComponent
