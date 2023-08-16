import React from 'react'

function Dice(props) {
  const styles = {
    backgroundColor : props.isHeld ? "#59E391" : "#fff",
  }
  return (
    <div className='dice-face' style={styles} onClick={props.holdDice}>
      {props.value} </div>
  )
}

export default Dice









































