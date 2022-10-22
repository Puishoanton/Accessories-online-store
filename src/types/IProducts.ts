export interface IProducts {
  // data(data: any): unknown
  id: number
  type: string
  header: {
    selected: string
    notSelected: string
  }
  img: string
  galleryImgs?: string[] | null
  title: string
  price: string
  discount: string
  rating: {
    img: string
    num: number
  }
  decription: string[]
}
export interface CasesType {
  id: number
  type: string
  products: IProducts[]
  img: string
}
export interface ICases {
  id: number
  title: string
  cases: CasesType[]
}
export interface IHeadphones {
  id: number
  title: string
  headPhones: IProducts[]
}
export interface IWireless {
  id: number
  title: string
  wirelessHeadPhones: IProducts[]
}
export interface IProducts {
  ICases: any
  IHeadphones: any
  IProducts: any
}
