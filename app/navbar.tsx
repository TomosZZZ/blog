"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { silkscreen } from "@/shared/fonts";
import Link from "next/link";
import { NAVBAR_LINKS } from "@/constants";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const isEditor = session?.user?.role === "EDITOR";
  const isAdminOrEditor = isAdmin || isEditor;
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ctaButtonStyles =
    "border-violet-500 border-2 rounded-lg tracking-widest text-lg hover:bg-violet-800 hover:text-white transition-colors py-2 px-4";

  return (
    <nav className="sticky top-0 z-50 h-20 w-full  bg-neutral-900 text-white border-b border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-full">
        <Link href={"/"} onClick={() => setIsMenuOpen(false)}>
          <h1
            className={`text-3xl font-bold select-none ${silkscreen.className}`}
          >
            TomCode
          </h1>
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          {NAVBAR_LINKS.map((link) => {
            if (link.href === "/auth/login" && session) return null;
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg transition-colors hover:text-violet-400 ${
                    isActive ? "text-violet-400 font-semibold" : "text-white"
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}

          {isAdminOrEditor && (
            <>
              <li>
                <Link
                  className={`text-lg transition-colors hover:text-violet-400 ${
                    pathname === "/blog/new-post"
                      ? "text-violet-400 font-semibold"
                      : ""
                  }`}
                  href="/blog/new-post"
                >
                  Create
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    className={`text-lg transition-colors hover:text-violet-400 ${
                      pathname.startsWith("/admin")
                        ? "text-violet-400 font-semibold"
                        : ""
                    }`}
                    href="/admin"
                  >
                    Admin
                  </Link>
                </li>
              )}
              {isEditor && (
                <li>
                  <Link
                    className={`text-lg transition-colors hover:text-violet-400 ${
                      pathname.startsWith("/admin")
                        ? "text-violet-400 font-semibold"
                        : ""
                    }`}
                    href="/admin/manage-posts"
                  >
                    Posts
                  </Link>
                </li>
              )}
            </>
          )}

          {session ? (
            <li>
              <Button
                className={`${ctaButtonStyles} bg-transparent`}
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </li>
          ) : (
            <li>
              <Link href="/auth/signup" className={ctaButtonStyles}>
                Sign up
              </Link>
            </li>
          )}
        </ul>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-neutral-900 border-b border-white/10 flex flex-col items-center gap-6 py-8">
          {NAVBAR_LINKS.map((link) => {
            if (link.href === "/auth/login" && session) return null;
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="list-none">
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-xl transition-colors hover:text-violet-400 ${
                    isActive ? "text-violet-400 font-semibold" : "text-white"
                  }`}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}

          {isAdminOrEditor && (
            <>
              <li className="list-none">
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-xl transition-colors hover:text-violet-400 ${
                    pathname === "/blog/new-post"
                      ? "text-violet-400 font-semibold"
                      : ""
                  }`}
                  href="/blog/new-post"
                >
                  Create
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    className={`text-lg transition-colors hover:text-violet-400 ${
                      pathname.startsWith("/admin")
                        ? "text-violet-400 font-semibold"
                        : ""
                    }`}
                    href="/admin"
                  >
                    Admin
                  </Link>
                </li>
              )}
              {isEditor && (
                <li>
                  <Link
                    className={`text-lg transition-colors hover:text-violet-400 ${
                      pathname.startsWith("/admin")
                        ? "text-violet-400 font-semibold"
                        : ""
                    }`}
                    href="/admin/manage-posts"
                  >
                    Posts
                  </Link>
                </li>
              )}
            </>
          )}

          {session ? (
            <li className="list-none mt-2">
              <Button
                className={`${ctaButtonStyles} bg-transparent`}
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </Button>
            </li>
          ) : (
            <li className="list-none mt-2">
              <Link
                href="/auth/signup"
                className={ctaButtonStyles}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </li>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
