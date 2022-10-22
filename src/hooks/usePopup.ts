import React, { RefObject } from 'react'

export function usePopup(ref: RefObject<HTMLElement>, openRef: RefObject<HTMLElement>) {
  const [popup, setPopup] = React.useState(false)
  const closePopup = ({ target }: MouseEvent): void => {
    if (
      ref &&
      !ref.current?.contains(target as Node) &&
      !openRef.current?.contains(target as Node)
    ) {
      setPopup(false)
    }
  }
  const closeAllPopups = () => {
    setPopup(false)
  }
  React.useEffect(() => {
    document.addEventListener('mousedown', closePopup)
    return () => {
      document.removeEventListener('mousedown', closePopup)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
  return { popup, setPopup, closeAllPopups }
}
