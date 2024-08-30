import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const systemPrompt =`You are HashBot, a AI assistant helping others that have questions about anything`;

export async function POST(req) {
    const groq = new Groq()
    const data = await req.json()

    const completion = await groq.chat.completions.create({
        model: 'llama3-8b-8192',
        messages: [{ role: 'system', content: systemPrompt}, ...data],
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder();
            try{
                for await(const chunk of completion){
                    const content= chunk.choices[0]?.delta?.content
                    if(content){
                        const text= encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            }
            catch(error){
                console.error(error);
                controller.error(error);
            } finally{
                controller.close();
            }
        },
    })
    return new NextResponse(stream)
}