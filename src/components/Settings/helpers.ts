import { KeyboardEventHandler } from 'react'

export const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = e => {
  if (!/[0-9]/gi.test(e.key) && e.key.toUpperCase() !== 'BACKSPACE') e.preventDefault()
}

export const getUserCode = (arr: (HTMLInputElement | null)[]) =>
  arr.reduce((acc, el) => (acc += el?.value), '')

export const isValuesSame = (value: string, repeatValue: string) => {
  if (value.length < repeatValue.length) return false
  if (!value.length && !repeatValue.length) return false
  const partValue = value.slice(0, repeatValue.length)
  return partValue === repeatValue
}
