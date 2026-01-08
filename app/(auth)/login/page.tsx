"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function getCookie(name: string) {
  return typeof document !== "undefined"
    ? document.cookie
        .split("; ")
        .find((row) => row.startsWith(name + "="))
        ?.split("=")[1]
    : undefined;
}

export default function LoginPage() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loggedIn = params.get("logged_in");

    const cookie = getCookie("hc_user");
    if (cookie) {
      setUser(JSON.parse(decodeURIComponent(cookie)));
    }

    if (loggedIn === "1") {
      setShowModal(true);
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const handleOAuthLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_HC_CLIENT_ID;
    const params = new URLSearchParams({
      client_id: clientId || "",
      response_type: "code",
      scope: "openid profile email",
      redirect_uri:
        typeof window !== "undefined"
          ? window.location.origin + "/api/auth/callback"
          : ""
    });
    window.location.href = `https://auth.hackclub.com/oauth/authorize?${params.toString()}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white font-sans">
      <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-8 bg-white/95 rounded-2xl shadow-2xl px-8 py-10">
        {/* Logos */}
        <div className="flex h-16 w-32 items-center justify-center gap-4">
          <Image
            src="/logo-red.svg"
            alt="Your Logo"
            width={80}
            height={80}
          />
        </div>
        {/* Heading */}
        <h1 className="font-heading text-center text-3xl font-bold text-black drop-shadow-sm">
          Hack Club Mobile
        </h1>
        {!user && (
          <div className="text-center text-gray-700 text-base leading-relaxed">
            <p>
              Welcome to <span className="font-semibold">Hack Club Mobile</span>!<br />
              For your security and convenience, we use <span className="font-semibold">Hack Club Auth</span> for authentication.
            </p>
            <p className="mt-2">
              The same Hack Club Auth app powers both this website and the mobile app, so you only need to grant access once. After logging in, you’ll be able to see all your devices with Hack Club Mobile installed and manage your sessions—including revoking access for any device, anytime.
            </p>
          </div>
        )}
        {user ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-lg text-gray-800">
              Welcome back, <span className="font-bold">{user.nickname}</span> 👋
            </p>
            <Button asChild variant="outline" className="w-full">
              <a href="/logout">Logout</a>
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={handleOAuthLogin}
              className="w-full flex items-center gap-2 bg-fd-primary text-white font-bold shadow-md hover:bg-[#d32c3a]"
              type="button"
              size="lg"
            >
              Continue with Hack Club Auth
            </Button>
          </>
        )}
      </div>
      {/* Modal for successful login */}
      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">You're logged in 🎉</AlertDialogTitle>
            <AlertDialogDescription>
              Welcome back, {user?.name || user?.nickname || "Hacker"}!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowModal(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
