import React, { useContext } from 'react'
import ColorContext from '../Context/ColorContext';

const ThemeBox = (props) => {
  const colorCtx = useContext(ColorContext);

  const changeMainBgHandler = (e) => {
    colorCtx.setCurrentColor({
      ...colorCtx.currentColor,
      mainColor: e.target.value,
    });
  };
  const chnageBgGradientHandler = (e) => {
    colorCtx.setCurrentColor({
      ...colorCtx.currentColor,
      gradient: e.target.value,
    });
  };
  const botBubbleHandler = (e) => {
    colorCtx.setCurrentColor({
      ...colorCtx.currentColor,
      botBubbleColor: e.target.value,
    });
  };
  const userBubbleHandler = (e) => {
    colorCtx.setCurrentColor({
      ...colorCtx.currentColor,
      userBubbleColor: e.target.value,
    });
  };

  return (
    <div className="themeMenu">
      <span className="heading">Theme Preview</span>
      <div
        className="themePreview"
        style={{
          background: `linear-gradient(239.26deg, ${colorCtx.currentColor.mainColor} 63.17%, ${colorCtx.currentColor.gradient} 94.92%)`,
        }}>
        <div
          className="botMessage"
          style={{
            background: `${colorCtx.currentColor.botBubbleColor}`,
          }}>
          Bot message
        </div>
        <div
          className="userMessage"
          style={{
            background: `${colorCtx.currentColor.userBubbleColor}`,
          }}>
          User's Message
        </div>
      </div>

      <div className="options">
        <div>
          <span>Background </span>
          <input
            type="color"
            value={colorCtx.currentColor.mainColor}
            onChange={changeMainBgHandler}></input>
        </div>
        <div>
          <span>Background gradient </span>
          <input
            type="color"
            value={colorCtx.currentColor.gradient}
            onChange={chnageBgGradientHandler}></input>
        </div>
        <div>
          <span>Bot bubble color</span>
          <input
            type="color"
            value={colorCtx.currentColor.botBubbleColor}
            onChange={botBubbleHandler}></input>
        </div>
        <div>
          <span>User bubble color</span>
          <input
            type="color"
            value={colorCtx.currentColor.userBubbleColor}
            onChange={userBubbleHandler}></input>
        </div>
      </div>
      <div onClick={props.toggleThemeBar}><button>Apply changes</button></div>
    </div>
  )
}

export default ThemeBox