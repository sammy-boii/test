import { Lusitana, Poppins } from 'next/font/google'

export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lusitana'
})
