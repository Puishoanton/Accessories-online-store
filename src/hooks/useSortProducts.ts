import { useMemo } from "react"
import { IProducts } from "../types/IProducts"

export const useSortProducts = (typeOfFilter: string, sortedElemtnt: IProducts[]): IProducts[] => {
    const sortedPost: IProducts[] = useMemo(() => {
      if (typeOfFilter === 'name') {
        return [...sortedElemtnt].sort((a, b) => {
          const title1 = a.title.toUpperCase()
          const title2 = b.title.toUpperCase()
          if (title1 > title2) {
            return 1
          }
          if (title1 < title2) {
            return -1
          }
          return 0
        })
      }
      if (typeOfFilter === 'price') {
        return [...sortedElemtnt].sort((a, b) => +a.price.slice(0, 3) - +b.price.slice(0, 3))
      }
      if (typeOfFilter === 'discount') {
        return [...sortedElemtnt].sort(
          (a, b) => +b.discount.slice(0, -1).slice(1) - +a.discount.slice(0, -1).slice(1)
        )
      }
      return sortedElemtnt
    }, [typeOfFilter, sortedElemtnt])
    return sortedPost
  }