import React, { FC } from 'react'
import styles from './Sort.module.scss'

type SortProps = {
  typeofSorting: string
  setTypeofSorting: (value: string) => void
  options: Array<{
    value: string
    title: string
  }>
}

const Sort: FC<SortProps> = ({ typeofSorting, setTypeofSorting, options }) => {
  return (
    <select className={styles.select} value={typeofSorting} onChange={e => setTypeofSorting(e.target.value)}>
      {options.map(({ value, title }) => (
        <option value={value}>{title}</option>
      ))}
    </select>
  )
}

export default Sort
