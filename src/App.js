import React, { useEffect, useState } from 'react'
import Dice from "./Components/Dice"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allDiceRoll())
  const [tenzies, setTenzies] =  useState(false)

    useEffect(() => {
        const allHeld = dice.every(items => items.isHeld)
        const firstValue = dice[0].value
        const allValue = dice.every(items => items.value === firstValue)
        if (allHeld && allValue){
          setTenzies(true)
        }
    }, [dice])

  function generateNewDie(){
    const randomNumber = Math.ceil(Math.random() * 6)
    return{
      value:randomNumber,
      isHeld:false,
      id:nanoid(),
    }
  }

  function allDiceRoll(){
    const newDice= []
    for(let i=0; i<10; i++){
      const randomNumber = Math.ceil(Math.random() * 6)
      newDice.push(generateNewDie())
    }  
    return newDice
  }


  const diceElements = dice.map(items  => {
    return(
    <Dice 
      key={items.id}
      value={items.value}
      isHeld={items.isHeld}
      holdDice={()=>{holdDice(items.id)}}
    />
    )
  })

  function clickDice(){
    if(!tenzies){
    setDice(prevDice => prevDice.map(items => {
      return  items.isHeld ? items : generateNewDie()
    }))
  }else {
    setTenzies(false)
    setDice(allDiceRoll())
  }
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(items => {
      return(
          items.id === id ?
          {...items, isHeld:!items.isHeld} : items
      )
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='text'>Roll until all dices are the same.
      Click each die to freeze it at its current value between rolls.</p>
    
      <div className='container'>
        {diceElements}
      </div>

      <button className='submit-btn' onClick={clickDice}>
        {tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App




