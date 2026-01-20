'use client'

import { ThemeToggle } from '../theme-toggle'
import { MobileNav } from './mobile-nav'
import { Logo } from './logo'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { ExternalLinkIcon } from 'lucide-react'
import { GithubButton } from '../github-button'

export const TopNav = () => {
  return (
    <header className="bg-background border-b sticky top-0 z-10 flex h-(--topnav-height) w-full py-2">
      <div className="relative mx-auto flex w-full max-w-(--site-width) px-(--site-padding-x) items-center justify-between  lg:gap-8">
        <div className="flex shrink-0 items-center gap-2 md:w-[calc(var(--side-nav-width)-var(--site-padding-x))]">
          <Logo href="/" showText />
        </div>
        <div className="flex gap-2">
          <nav className="hidden items-center justify-start gap-2 md:flex">
            <Button variant="navitem" asChild>
              <Link href="https://hackclub.com/slack" target="_blank" rel="noopener noreferrer">
                Slack <ExternalLinkIcon size={16} />
              </Link>
            </Button>
          </nav>

          <div className="hidden items-center justify-start gap-2 md:flex">
            <Button variant="navitem" asChild>
                <Link href="https://github.com/theawesomeaj/hackclub-mobile" target="_blank" rel="noopener noreferrer">
                <SiGithub size={16} />
                Github
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <nav className="flex flex-1 items-center justify-end gap-2 md:hidden">
          <GithubButton />
          <ThemeToggle />
          <MobileNav />
        </nav>
      </div>
    </header>
  )
}
