import { PropsWithChildren } from 'react'
import { TopNav } from '@/components/docs/navigation/topnav'
import { DocsLayout as DocsLayoutComponent } from '@/components/docs/docs-layout'
import localFont from 'next/font/local'
import { classes } from '@/utils/classes'
import '../docs-globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  display: 'swap',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  display: 'swap',
})

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={classes(geistSans.variable, geistMono.variable, geistSans.className)}>
      <TopNav />
      <DocsLayoutComponent>{children}</DocsLayoutComponent>
    </div>
  )
}
