import React, { useEffect,useState } from 'react'
import useWordle from '../Hooks/useWordle'

// components
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'


export default function Wordle({ solution }) {
  const { currentGuess, guesses, turn, isCorrect, usedKeys,handleKeyup } = useWordle(solution)
  const [showModal, setShowModal] = useState(false)
  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)
    if(isCorrect){
      //console.log('You Win Congraulations!!!');
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }
    if(turn>5){
      //console.log('Sorry you finished all your Guesses');
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }
    return () => window.removeEventListener('keyup', handleKeyup)
  }, [handleKeyup,isCorrect,turn])

 /* useEffect(() => {
    console.log(guesses, turn, isCorrect)
  }, [guesses, turn, isCorrect,turn])*/

  return (
    <div>
      {/*<div>solution - {solution}</div>*/}
      <div>Current Guess - {currentGuess}</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
    </div>
  )
}