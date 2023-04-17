import { useEffect, useRef, useState } from 'react'

import CanvasDraw from 'react-canvas-draw'
import { socket } from '../socket'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants'

interface Props {}

const Canvas = (props: Props) => {
  const canvasDrawRef = useRef<CanvasDraw | null>(null)
  const [isHost, setIsHost] = useState(true)

  const handleCanvasSnapshot = (canvasData: string) => {
    if (!canvasDrawRef.current) return

    canvasDrawRef.current.loadSaveData(canvasData, true)
  }

  useEffect(() => {
    socket.on('canvas-snapshot-response', handleCanvasSnapshot)

    return () => {
      socket.off('canvas-snapshot-response', handleCanvasSnapshot)
    }
  })

  const onCanvasChange = (canvas: CanvasDraw) => {
    if (!isHost) return
    socket.emit('canvas-snapshot', canvas.getSaveData())
  }

  return (
    <>
      <button onClick={() => setIsHost(!isHost)}>
        {isHost ? 'HOST' : 'GUEST'}
      </button>

      <CanvasDraw
        disabled={!isHost}
        canvasWidth={CANVAS_WIDTH}
        canvasHeight={CANVAS_HEIGHT}
        ref={canvasDrawRef}
        onChange={onCanvasChange}
        hideInterface
      />
    </>
  )
}

export default Canvas
