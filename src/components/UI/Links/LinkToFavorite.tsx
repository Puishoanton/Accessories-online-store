import React, { FC } from 'react'
import { usePopup } from '../../../hooks/usePopup'
import { userSliceinitialStateType } from '../../../store/reducers/userSlice'
import Popup from '../Popup/Popup'
import styles from './Links.module.scss'
import favoriteImg from '../../../data/img/icon/liked.svg'
import { useAppSelector } from '../../../hooks/redux'
import FavCard from '../../elements/Card/FavCard'

type LinkToFavoriteProps = {
  user: userSliceinitialStateType | null
}

const LinkToFavorite: FC<LinkToFavoriteProps> = ({ user }) => {
  const popupRef = React.useRef<HTMLDivElement>(null)
  const popupOpenRef = React.useRef<HTMLImageElement>(null)
  const { popup, setPopup } = usePopup(popupRef, popupOpenRef)
  const { favorite: favList } = useAppSelector(state => state.favorite)
  return (
    <div className={styles.linkFav}>
      <img ref={popupOpenRef} onClick={() => setPopup(!popup)} src={favoriteImg} alt='favorite' />
      {user?.user !== null && favList.length !== 0 && (
        <div className={styles.favCount}>{favList.length}</div>
      )}
      <Popup classes={'favoritePopup'} divRef={popupRef} popup={popup}>
        {user?.user !== null && favList.length > 0 ? (
          <div className={styles.favCards}>
            {favList.map(card => (
              <FavCard key={Date.now() + Math.random()} item={card} />
            ))}
          </div>
        ) : user?.user !== null ? (
          <p className={styles.isEmpty}>Fav is empty</p>
        ) : (
          <p className={styles.isEmpty}>Please proceed to auth page</p>
        )}
      </Popup>
    </div>
  )
}

export default LinkToFavorite
