import React from 'react'

interface Props {
  setLineColor: any
  setLineWidth: any
  setLineOpacity: any
  onDownload: any
}

const Menu = ({
  setLineColor,
  setLineWidth,
  setLineOpacity,
  onDownload,
}: Props) => {
  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value)
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => {
          setLineWidth(e.target.value)
        }}
      />
      <label>Brush Opacity</label>
      <input
        type="range"
        min="1"
        max="100"
        onChange={(e) => {
          setLineOpacity(+e.target.value / 100)
        }}
      />
      <button onClick={() => onDownload()}>Download</button>
    </div>
  )
}

export default Menu
