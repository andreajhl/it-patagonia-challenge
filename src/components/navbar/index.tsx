import Search from "@components/search";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => (
  <header className="fixed z-20 flex h-max w-full items-center justify-center bg-blue-600 py-4 shadow">
    <nav className="relative flex w-full max-w-5xl items-center justify-between gap-8 px-4 lg:px-8">
      <Link
        href="/"
        className="relative h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
        aria-label="Go to homepage"
      >
        <Image src="/brand-white.png" alt="Brand logo" fill priority />
      </Link>

      <div className="w-60 md:w-64">
        <Search />
      </div>
    </nav>
  </header>
);

export default Navbar;
