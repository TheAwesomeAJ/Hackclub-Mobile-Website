"use client";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { DesktopNav } from "@/components/navbar/desktop-nav";
import { MobileNav } from "@/components/navbar/mobile-nav";
import { ThemeToggle } from "../theme-toggle";

export function MainHeader() {
	const scrolled = useScroll(10);

	const [user, setUser] = useState<any>(null);

	function getCookie(name: string) {
		return typeof document !== "undefined"
			? document.cookie
					.split("; ")
					.find((row) => row.startsWith(name + "="))
					?.split("=")[1]
			: undefined;
	}

	useEffect(() => {
		const cookie = getCookie("hc_user");
		if (cookie) {
			try {
				setUser(JSON.parse(decodeURIComponent(cookie)));
			} catch (e) {
				// ignore
			}
		}
	}, []);

	return (
		<header
			className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
				"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-6 w-full max-w-7xl items-center px-4 pt-7">
				<div className="flex flex-1 items-center justify-center gap-5">
					<a className="rounded-md px-3 py-2.5 hover:bg-accent flex items-center" href="/">
						<img
							src="full-logo.svg"
							alt="Hack Club Logo"
							className="h-10"
						/>
					</a>
					<DesktopNav />
				</div>
				<div className="hidden items-center gap-2 md:flex">
					<ThemeToggle />
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="rounded-full focus:outline-none">
									<Avatar>
										{user?.picture ? (
											<AvatarImage src={user.picture} />
										) : (
											<AvatarFallback>{(user?.name || user?.nickname || "?").charAt(0)}</AvatarFallback>
										)}
									</Avatar>
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<div className="px-2 py-2">
									<div className="text-sm font-medium">{user?.name || user?.nickname}</div>
									<div className="text-xs text-muted-foreground">{user?.sub}</div>
								</div>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<Link href="/profile">Profile</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<a href="/logout">Logout</a>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button variant="hc_outline" asChild>
							<a href="/login">Login with Hack Club Auth</a>
						</Button>
					)}
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
