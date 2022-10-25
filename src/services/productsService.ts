import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CasesType, ICases, IHeadphones, IProducts, IWireless } from '../types/IProducts'

export const CASESTYPEURL = 0
export const HEADPHONESURL = 1 as const
export const HEADPHONESARRAYNAME = 'headPhones' as const
export const WIRELESSHEADPHONESURL = 2 as const
export const WIRELESSHEADPHONESARRAYNAME = 'wirelessHeadPhones' as const
export const WIRELESSHEADPHONESARRAYNAMEq = 'wirelessHeadPhones' as const
export const SILICONSURL = 0 as const
export const GLASSURL = 1 as const
export const LEATHERURL = 2 as const

type queryArgsType = {
  product: number
  typeOfProduct:
    | typeof HEADPHONESARRAYNAME
    | typeof WIRELESSHEADPHONESARRAYNAME
    | typeof SILICONSURL
    | typeof GLASSURL
    | typeof LEATHERURL
  id: number | undefined
}

export const productAPI = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://puisho-store-default-rtdb.europe-west1.firebasedatabase.app',
  }),
  endpoints: builder => ({
    getAllCases: builder.query<ICases, void>({
      query: () => `/products/0.json`,
    }),
    getHeadphones: builder.query<IHeadphones, void>({
      query: () => `/products/1.json`,
    }),
    getWireless: builder.query<IWireless, void>({
      query: () => `/products/2.json`,
    }),
    getCases: builder.query<CasesType, number>({
      query: typeOfCases => `/products/${CASESTYPEURL}/cases/${typeOfCases}.json`,
    }),
    getHeadphonesById: builder.query<IProducts | undefined, queryArgsType>({
      query: ({ product, typeOfProduct, id }) => `/products/${product}/${typeOfProduct}/${id}.json`,
    }),
    getCaseById: builder.query<IProducts | undefined, queryArgsType>({
      query: ({ product, typeOfProduct, id }) =>
        `/products/${product}/cases/${typeOfProduct}/products/${id}.json`,
    }),
  }),
})
