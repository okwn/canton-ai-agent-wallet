'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BrandMark } from './BrandMark';
import { useAuth } from '@/components/auth/AuthProvider';

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  className?: string;
  logo?: React.ReactNode;
  leftLinks?: NavLink[];
  rightLinks?: NavLink[];
  cta?: React.ReactNode;
  sticky?: boolean;
}

/**
 * Marcus Navigation — warm, clean horizontal nav
 */
export function Navbar({
  className: classNameProp,
  logo,
  leftLinks = [],
  rightLinks = [],
  cta,
  sticky = true,
}: NavbarProps) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const defaultLeftLinksGuest: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Agent', href: '/agent' },
  ];

  const defaultLeftLinksAuth: NavLink[] = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Agent', href: '/agent' },
  ];

  const defaultRightLinksGuest: NavLink[] = [
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
  ];

  const links = leftLinks.length > 0 ? leftLinks : (user ? defaultLeftLinksAuth : defaultLeftLinksGuest);
  const secondaryLinks = rightLinks.length > 0 ? rightLinks : (user ? [] : defaultRightLinksGuest);

  return (
    <header
      className={cn(
        'w-full border-b border-light-cream bg-cream z-50',
        sticky && 'sticky top-0',
        classNameProp
      )}
    >
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          {logo || <BrandMark variant="full" size="md" />}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-charcoal hover:text-charcoal-83 transition-colors duration-150 font-normal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-charcoal hover:bg-charcoal-04 rounded-sm transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-charcoal-04 flex items-center justify-center">
                    <span className="text-xs font-medium text-charcoal">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-medium">{user.name}</span>
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-cream border border-light-cream rounded-md shadow-focus-warm z-20">
                      <div className="px-3 py-2 border-b border-light-cream">
                        <p className="text-xs text-muted-gray truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="block px-3 py-2 text-sm text-charcoal hover:bg-charcoal-04 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        type="button"
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-sm text-charcoal hover:bg-charcoal-04 transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-charcoal hover:text-charcoal-83 transition-colors duration-150 font-normal"
                >
                  {link.label}
                </Link>
              ))}
            </>
          )}
          {cta || (
            <Link
              href="/agent"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-cream-light bg-charcoal rounded-sm transition-all duration-150 hover:opacity-90 active:opacity-80"
              style={{
                boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0px inset, rgba(0, 0, 0, 0.2) 0px 0px 0px 0.5px inset, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
              }}
            >
              Open Agent
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 text-charcoal hover:bg-charcoal-04 rounded-sm transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 4L16 16M16 4L4 16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-light-cream bg-cream">
          <nav className="max-w-content mx-auto px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-charcoal hover:text-charcoal-83 py-2 font-normal"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-light-cream pt-4 flex flex-col gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-charcoal-04 flex items-center justify-center">
                      <span className="text-sm font-medium text-charcoal">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-charcoal">{user.name}</p>
                      <p className="text-xs text-muted-gray truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-charcoal-04 rounded-sm transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-charcoal hover:text-charcoal-83 py-2 font-normal"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </>
              )}
              <Link
                href="/agent"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-cream-light bg-charcoal rounded-sm mt-2"
                style={{
                  boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0px inset, rgba(0, 0, 0, 0.2) 0px 0px 0px 0.5px inset, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Open Agent
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;