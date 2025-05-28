'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
    <button
      onClick={handleLogout}
      className="no-underline text-blue-300"
    >
      ログアウト
    </button>
  );
}
