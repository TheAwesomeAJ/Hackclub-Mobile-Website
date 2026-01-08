import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center -mt-16 py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              📱 Hack Club Mobile
              <ArrowUpRight />
            </Badge>
            <h1 className="font-heading my-4 text-4xl text-balance md:text-5xl lg:leading-14">
              Hack Club in Your Pocket
            </h1>
            <p className="text-muted-foreground mb-8 text-balance lg:text-lg">
              Stay connected with Hack Club on the go. Track your coding streaks
              with Hackatime, explore YSWS programs, join exciting events, and
              get notifications from YSWS Managers—all from your mobile device.
            </p>
            <div className="flex justify-center gap-2">
              <Button asChild>
                <Link href="/features">Learn More</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="https://hackclub.com/slack/">Join Hack Club Slack</Link>
              </Button>
            </div>
          </header>
          <img
            src="https://assets.hackclub.com/flag-standalone.svg"
            alt="Dashboard interface of the SaaS platform"
            className="w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}