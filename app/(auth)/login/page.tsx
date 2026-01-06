'use client';

import { useEffect, useState } from 'react';

function getCookie(name: string) {
  return document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='))
    ?.split('=')[1];
}

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loggedIn = params.get('logged_in');

    const cookie = getCookie('hc_user');
    if (cookie) {
      setUser(JSON.parse(decodeURIComponent(cookie)));
    }

    if (loggedIn === '1') {
      setShowModal(true);
      // Clean URL
      window.history.replaceState({}, '', '/');
    }
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Home</h1>

      {user && <p>Welcome back, {user.nickname} 👋</p>}

      {showModal && (
        <div style={modalBackdrop}>
          <div style={modal}>
            <h2>You're logged in 🎉</h2>
            <p>Welcome back, {user?.name}!</p>
            <button onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const modalBackdrop: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modal: React.CSSProperties = {
  background: 'white',
  padding: 24,
  borderRadius: 12,
  width: 320,
};
