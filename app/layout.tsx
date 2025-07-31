import '@/app/ui/global.css'
import { poppins } from '@/app/ui/fonts'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={poppins.variable}>
        <div className='font-poppins antialiased'>{children}</div>
      </body>
    </html>
  )
}
