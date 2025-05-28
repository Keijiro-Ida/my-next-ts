'use client';

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { useSession } from "next-auth/react";

export default function AuthMenu() {
  const { data: session, status } = useSession();

  if (status === "loading" || !session) return null;

  return (
    <ul className="flex bg-blue-600 mb-4 pl-2">
      <li className="block px-4 py-2 my-1 hover:bg-grey-100 rounded">
        <Link className="no-underline text-blue-300" href="/">Home</Link>
      </li>
      <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-grey-100 rounded">
        <Link className="no-underline text-blue-300" href="/books">Search</Link>
      </li>
      <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-grey-100 rounded">
        <Link className="no-underline text-blue-300" href="https://wings.msn.to/" target="_blank">Support</Link>
      </li>
      <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-grey-100 rounded">
        <LogoutButton />
      </li>
    </ul>
  );
}
