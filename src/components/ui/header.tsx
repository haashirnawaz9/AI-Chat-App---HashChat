import { UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-300 to-indigo-400 h-16 flex justify-between items-center p-8 shadow-md sticky top-0">
      <h2 className="text-lg font-semibold">
        <Link href="/">HashBot AI</Link>
      </h2>
      <div className="flex items-center">
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
