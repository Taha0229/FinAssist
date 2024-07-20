import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req) {
  // get the search params to fetch chat history

  const searchParams = req.nextUrl.searchParams;
  const threadId = searchParams.get("thread_id");

  //Display the Assistant's Response
  const messagesNew = await openai.beta.threads.messages.list(threadId, {
    order: "asc",
  });
  

  // setup the messages list to make it easy to separate AI and human responses
  const messagesList = messagesNew.data.map((m) => {
    const text = m.content[0].text;
    if (m.metadata.by) {
      const newObj = {
        ...text,
        ...m.metadata,
      };
      return newObj;
    }
    return text;
  });

  // neglect the first user message (treated as the system message)
  messagesList.shift();

  return Response.json({ chatHistory: messagesList }, { status: 200 });
}
