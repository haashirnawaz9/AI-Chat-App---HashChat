import { Pinecone } from "@pinecone-database/pinecone";

if (!process.env.PINECONE_KEY) {
    throw new Error("PINECONE_KEY is not set");
}

const pineconeClient = new Pinecone({
    apiKey: process.env.PINECONE_KEY,
})

export default pineconeClient;