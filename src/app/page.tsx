import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {} from "@clerk/nextjs"

export default function Home() {
  return (
    <div className="home-background flex items-center justify-center">
      <main className="w-full max-w-7xl bg-white py-12 rounded-md text-center shadow-lg mt-10">
        <div className="flex flex-col items-center max-w-screen-md mx-auto">
          <h1 className="text-4xl sm:text-5xl font-semibold mb-4 flex flex-row">
            Transform Your PDFs into Interactive Conversations
          </h1>
          <UserButton />
        </div>

        <div>
          <h4 className="mt-4 mb-3">Introducing <span className="text-indigo-400">Chat with PDF</span></h4>
          <h4 className="mb-3 max-w-screen-sm mx-auto">
            Upload your document, and our chatbot will answer questions, summarize content, and answer all your questions. 
            Ideal for everyone, <span className="text-indigo-400">Chat with PDF</span> turns static documents 
            into <span className="text-indigo-600">dynamic conversations</span>, enhancing productivity 10x fold effortlessly.
          </h4>
          <Button className="mt-4">
            <Link href="/chat">Get Started</Link>
          </Button>
        </div>
        <div>
          <Image 
            alt="App screenshot"
            src="https://i.imgur.com/VciRSTI.jpeg"
            width={2432}
            height={1442}
            className="rounded-xl shadow-2xl mt-8"
          />
        </div>
      </main>
    </div>
  );
}
