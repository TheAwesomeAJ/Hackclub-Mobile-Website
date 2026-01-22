"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function getCookie(name: string) {
  return typeof document !== "undefined"
    ? document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1]
    : undefined;
}

export default function HeroSection() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loggedInParam = params.get("logged_in");

    const cookie = getCookie("hc_user");
    if (cookie) {
      try {
        setUser(JSON.parse(decodeURIComponent(cookie)));
      } catch (e) {
        // ignore parse errors
      }
    }

    if ((loggedInParam === "true" || loggedInParam === "1") && cookie) {
      setShowModal(true);
      // remove the query param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("logged_in");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  return (
    <>
      <section className="min-h-screen flex items-center -mt-16 py-10 lg:py-16 bg-white dark:bg-background transition-colors">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <Badge variant="outline">📱 Hack Club Mobile</Badge>
              <h1 className="font-heading my-4 text-4xl text-balance md:text-5xl lg:leading-14 text-foreground dark:text-white">
                Hack Club in Your Pocket
              </h1>
              <p className="text-muted-foreground mb-8 text-balance lg:text-lg dark:text-gray-300">
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
              className="w-full rounded-md object-cover bg-white dark:bg-zinc-900 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Modal shown when ?logged_in and user is authenticated */}
      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent>
          <div className="flex flex-col items-center text-center gap-6 py-8 px-6">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>

            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-semibold text-foreground">
                You're logged in 🎉
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-sm text-muted-foreground">
                Welcome back, {user?.name || user?.nickname || "Hack Clubber"}!
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogAction onClick={() => setShowModal(false)} className="bg-green-600 text-white hover:bg-green-700">
                Close
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}