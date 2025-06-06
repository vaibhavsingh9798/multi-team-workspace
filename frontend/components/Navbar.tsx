'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { useEffect, useState } from 'react';
import { CompanySwitcher} from './CompanySwitcher';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center w-full z-10 sticky top-0">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="text-xl font-bold text-blue-600">
          TeamCollab
        </Link>

        {user && (
          <>
            <Link
              href="/dashboard"
              className={pathname === '/dashboard' ? 'text-blue-500 font-semibold' : 'text-gray-600'}
            >
              Dashboard
            </Link>
            <Link
              href="/settings"
              className={pathname === '/settings' ? 'text-blue-500 font-semibold' : 'text-gray-600'}
            >
              Settings
            </Link>
          </>
        )}
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <CompanySwitcher />

          <span className="text-gray-700 text-sm">Hi, {user.name}</span>

          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link
            href="/login"
            className="text-blue-600 hover:underline mr-4"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-blue-600 hover:underline"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
}
