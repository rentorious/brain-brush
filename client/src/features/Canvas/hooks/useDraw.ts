import { MutableRefObject, useEffect, useRef, useState } from 'react'

import { CANVAS_WIDTH, CANVAS_HEIGHT } from '../constants'
import { socket } from '../../socket'

export const useDraw = (
  canvasRef: MutableRefObject<HTMLCanvasElement | null>,
  ctxRef: MutableRefObject<CanvasRenderingContext2D | null>
) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState(5)
  const [lineColor, setLineColor] = useState('black')
  const [lineOpacity, setLineOpacity] = useState(0.1)

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalAlpha = lineOpacity
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctxRef.current = ctx
  }, [lineColor, lineOpacity, lineWidth])

  return {
    lineColor,
    setLineColor,
    lineWidth,
    setLineWidth,
    lineOpacity,
    setLineOpacity,
    onDownload,
    startDrawing,
    endDrawing,
    draw,
  }

  // Function for starting the drawing
  function startDrawing(e: React.MouseEvent) {
    if (!ctxRef.current) return
    ctxRef.current.beginPath()
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    setIsDrawing(true)
  }

  // Function for ending the drawing
  function endDrawing() {
    if (!ctxRef.current) return
    ctxRef.current.closePath()
    setIsDrawing(false)

    if (socket.connected && canvasRef.current) {
      socket.emit('canvas-snapshot', canvasRef.current.toDataURL('image/jpeg'))
    }
  }

  function draw(e: React.MouseEvent) {
    if (!isDrawing || !ctxRef.current) return

    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctxRef.current.stroke()
  }

  function onDownload() {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    var url = canvas.toDataURL('image/png')
    var link = document.createElement('a')
    link.download = 'filename.png'
    link.href = url
    link.click()
  }
}
