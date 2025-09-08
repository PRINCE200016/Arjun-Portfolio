'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '@/lib/isAuthenticated';

export function Footer() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    // Set the year client-side to avoid hydration mismatch
    setCurrentYear(new Date().getFullYear().toString());
    // Check authentication status client-side
    setIsAdmin(isAuthenticated());
  }, []);

  return (
    <footer className="border-t">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {currentYear || '2024'} Arjun Rajawat. All rights reserved.
            </p>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Admin
                  </Link>
                </li>
              )}
              {!isAdmin && (
                <li>
                  <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
