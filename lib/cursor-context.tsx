'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface CursorContextType {
  cursorEnabled: boolean
  setCursorEnabled: (v: boolean) => void
}

const CursorContext = createContext<CursorContextType>({
  cursorEnabled: true,
  setCursorEnabled: () => {},
})

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorEnabled, setCursorEnabled] = useState(true)
  return (
    <CursorContext.Provider value={{ cursorEnabled, setCursorEnabled }}>
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  return useContext(CursorContext)
}
