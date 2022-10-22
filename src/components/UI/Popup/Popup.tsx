import React, { ReactNode } from 'react'
import styles from './Popup.module.scss'

interface PopupProps {
  popup: boolean
  children: ReactNode
  divRef: React.RefObject<HTMLDivElement>
  classes: string
}

const Popup: React.FC<PopupProps> = ({ popup, children, divRef, classes }) => {
  const rootPopup = [styles.popup, styles[classes]]
  popup && rootPopup.push(styles.active)
  return (
    <div ref={divRef} className={rootPopup.join(' ')}>
      {children}
    </div>
  )
}

export default Popup
