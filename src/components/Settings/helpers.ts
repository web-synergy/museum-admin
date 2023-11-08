import { KeyboardEventHandler } from 'react'

export const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
  if (!/[0-9]/gi.test(e.key) && e.key.toUpperCase() !== 'BACKSPACE') e.preventDefault()
}

export const getUserCode = (arr: (HTMLInputElement | null)[]) =>
  arr.reduce((acc, el) => (acc += el?.value), '')
