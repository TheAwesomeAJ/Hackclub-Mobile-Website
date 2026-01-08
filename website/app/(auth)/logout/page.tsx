"use client";

import React from "react";
import { redirect } from "next/navigation";

// This page logs the user out and redirects to the login page
export default function LogoutPage() {
  React.useEffect(() => {
    // Remove the 'hc_user' cookie used for authentication
    document.cookie = "hc_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Optionally clear other auth-related storage here

    // Redirect to login page after logout
    redirect("/login");
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Logging out...</h1>
      <p>You are being logged out. Please wait.</p>
    </main>
  );
}
