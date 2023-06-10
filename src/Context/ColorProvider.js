import React, { useState } from 'react'
import ColorContext from './ColorContext'

const ColorProvider = (props) => {

  //Context API for changing color on slection in theme menu

  const [currentColor , setCurrentColor] = useState({
    mainColor: "#ddeeed",
    gradient: "#fdf1e0",
    botBubbleColor:"#fff",
    userBubbleColor: "#23B5E1"
  })
  return (
    <ColorContext.Provider value={{currentColor: currentColor, setCurrentColor:setCurrentColor}}>
   {props.children}
  </ColorContext.Provider>
  )
}

export default ColorProvider