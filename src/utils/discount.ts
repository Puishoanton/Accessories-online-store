export const calcDiscount = (price: string, discount: string): number => {
  return +price.slice(0, -3) - +discount.slice(0, -1).slice(1)
}
