import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const threadId = searchParams.get("thread_id");
  console.log("threadId: ", threadId);

  //Display the Assistant's Response
  const messagesNew = await openai.beta.threads.messages.list(threadId, {
    order: "asc",
  });
  console.log("messagesNew : ");
  
  const messagesList = messagesNew.data.map((m) => {
    const text = m.content[0].text;
    if (m.metadata.by) {
      const newObj = {
        ...text,
        ...m.metadata,
      };
      console.log("meta exists");
      return newObj;
    }
    return text;
  });

  messagesList.shift();

  return Response.json({ chatHistory: messagesList }, { status: 200 });
}
