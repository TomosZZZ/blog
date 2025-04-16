"use client";
import React from "react";

import { Silkscreen } from "next/font/google";
import Link from "next/link";
import { NAVBAR_LINKS } from "@/constants";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const silkscreen = Silkscreen({ weight: "700", subsets: ["latin"] });

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className=" h-[10%] py-5 sm:px-4 px-1 bg-neutral-900 text-white border-b border-white border-opacity-10 flex flex-col gap-4 sm:flex-row items-center justify-between mb-5">
      <div className="md:w-1/2 sm:w-2/5 w-full flex justify-center">
        <Link href={"/"}>
          <h1
            className={`text-3xl font-bold select-none cursor-pointer ${silkscreen.className}`}
          >
            TomCode
          </h1>
        </Link>
      </div>
      <ul className="flex md:gap-7 sm:gap-5 gap-3 items-center md:w-[1/2] sm:w-[7/10] w-full justify-center ">
        {NAVBAR_LINKS.map((link) => {
          if (link.href === "/auth/login" && session) return null;
          return (
            <li key={link.href} className="md:text-xl text-lg">
              <Link className="hover:text-gray-200" href={link.href}>
                {link.text}
              </Link>
            </li>
          );
        })}
        {!session && (
          <li>
            <Link
              className="border-violet-500 border-2 rounded-lg  tracking-widest md:text-xl text-lg hover:text-gray-200 md:ml-8 sm:ml-4 ml-2 hover:bg-violet-800 cursor-pointer transition md:py-3 py-2 md:px-5 px-4"
              href="/auth/signup"
            >
              Sign up
            </Link>
          </li>
        )}
        {session && (
          <Button
            className="border-violet-500 border-2 rounded-lg bg-transparent  tracking-widest md:text-xl text-lg hover:text-gray-200 md:ml-8 sm:ml-4 ml-2 hover:bg-violet-800 cursor-pointer transition md:py-3 py-2 md:px-5 px-4"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
