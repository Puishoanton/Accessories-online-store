import BasketPage from '../pages/BasketPage'
import FavoritePage from '../pages/FavoritePage'
import AuthPage from './../pages/AuthPage'
import ContactsPage from './../pages/ContactsPage'
import MainPage from './../pages/MainPage'
import OrderPage from './../pages/OrderPage'
import ServicePage from './../pages/ServicePage'
import ProductWirelessHeadphones from '../pages/ProductWirelessHeadphones'
import LeatherPage from '../pages/LeatherCases'
import ProductHeadphonesPage from '../pages/ProductHeadphones'
import SiliconPage from '../pages/SiliconCases'
import ProductGlassPage from '../pages/GlassCases'
import SiliconByIdPage from '../pages/SiliconByIdPage'
import GlassByIdPage from '../pages/GlassByIdPage'
import LeatherByIdPage from '../pages/LeatherByIdPage'

export const BASKET_PATH = '/basket'
export const FAVORITE_PATH = '/favorite'
export const AUTH_PATH = '/auth'
export const CONTACTS_PATH = '/contacts'
export const MAIN_PATH = '/'
export const ORDER_PATH = '/order'
export const SERVICE_PATH = '/service'
export const PRODUCT_HEADPHONES_PATH = '/product/headphones/:id'
export const PRODUCT_WIRELESSHEADPHONES_PATH = '/product/wirelessheadphones/:id'
export const SILICONCASES_PATH = '/product/silicon'
export const GLASSCASES_PATH = '/product/glass'
export const LEATHERCASES_PATH = '/product/leather'
export const PRODUCT_LEATHERCASEBYID_PATH = '/product/leather/:id'
export const PRODUCT_SILICONCASEBYID_PATH = '/product/silicon/:id'
export const PRODUCT_GLASSCASEBYID_PATH = '/product/glass/:id'

export const privateRoute = [
  { path: BASKET_PATH, element: <BasketPage /> },
  { path: FAVORITE_PATH, element: <FavoritePage /> },
  { path: ORDER_PATH, element: <OrderPage /> },
  { path: CONTACTS_PATH, element: <ContactsPage /> },
  { path: MAIN_PATH, element: <MainPage /> },
  { path: SERVICE_PATH, element: <ServicePage /> },
  { path: PRODUCT_HEADPHONES_PATH, element: <ProductHeadphonesPage /> },
  { path: PRODUCT_WIRELESSHEADPHONES_PATH, element: <ProductWirelessHeadphones /> },
  { path: SILICONCASES_PATH, element: <SiliconPage /> },
  { path: GLASSCASES_PATH, element: <ProductGlassPage /> },
  { path: LEATHERCASES_PATH, element: <LeatherPage /> },
  { path: PRODUCT_LEATHERCASEBYID_PATH, element: <LeatherByIdPage /> },
  { path: PRODUCT_SILICONCASEBYID_PATH, element: <SiliconByIdPage /> },
  { path: PRODUCT_GLASSCASEBYID_PATH, element: <GlassByIdPage /> },
]
export const publicRoute = [
  { path: AUTH_PATH, element: <AuthPage /> },
  { path: CONTACTS_PATH, element: <ContactsPage /> },
  { path: MAIN_PATH, element: <MainPage /> },
  { path: SERVICE_PATH, element: <ServicePage /> },
  { path: PRODUCT_HEADPHONES_PATH, element: <ProductHeadphonesPage /> },
  { path: PRODUCT_WIRELESSHEADPHONES_PATH, element: <ProductWirelessHeadphones /> },
  { path: SILICONCASES_PATH, element: <SiliconPage /> },
  { path: GLASSCASES_PATH, element: <ProductGlassPage /> },
  { path: LEATHERCASES_PATH, element: <LeatherPage /> },
  { path: PRODUCT_LEATHERCASEBYID_PATH, element: <LeatherByIdPage /> },
  { path: PRODUCT_SILICONCASEBYID_PATH, element: <SiliconByIdPage /> },
  { path: PRODUCT_GLASSCASEBYID_PATH, element: <GlassByIdPage /> },
]
