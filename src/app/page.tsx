import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="home-background flex items-center justify-center">
      <main className="w-full max-w-7xl bg-white py-12 rounded-md text-center shadow-lg mt-10">
        <div className="flex flex-col items-center max-w-screen-md mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4 flex flex-row">
          Discover smart, intuitive assistance tailored for you.
          </h1>
          <UserButton />
        </div>

        <div>
          <h4 className="mt-4 mb-3">Introducing <span className="text-indigo-400">HashBot AI</span></h4>
          <h4 className="mb-3 max-w-screen-sm mx-auto">
            Ask questions about anything and everything and our chatbot will assist you the best it can. <span className="text-indigo-400">HashBot AI</span> is a free ai app that you can use  
            whenever you want and desire. Try it out by asking any question!
          </h4>
          <Button className="mt-4">
            <Link href="/chat">Get Started</Link>
          </Button>
        </div>

        <div className="mt-8">
          <div className="relative w-full max-w-4xl mx-auto">
            <Image 
              alt="App screenshot"
              src="/HashBot.jpeg"
              layout="responsive"
              width={1200}
              height={800} 
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
