import React from 'react'

import { useGetDocsListQuery } from './services/docs'
import Canvas from './features/Canvas'

const App: React.FC = () => {
  const { data, error, isLoading } = useGetDocsListQuery()

  return (
    <main className="App">
      <Canvas />
    </main>
  )
}

export default App
