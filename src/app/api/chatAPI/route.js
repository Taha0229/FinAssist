import OpenAI from "openai";
import data from "../../../../data.json";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req, { params }) {
  // destructure props/request body
  const { userMessage, thread_id, assistant_id } = await req.json();

  // setup basic requirements
  const assistantId = process.env.ASSISTANT_ID;
  let threadId;
  let messageValue;

  // Todo: fix this
  // Cannot fetch data from API route; the URL has to be external

  // const fetchCloudData = async () => {
  //   const cloudData = await fetch("/api/fetchCloudData", {
  //     method: "GET",
  //   });
  //   const resp = await cloudData.json();
  //   return resp;
  // };

  // const data = fetchCloudData();

  const handleRun = async (threadId, messageContent) => {
    // light weight and straightforward function to handle initial thread loading and continuous chat

    // get the user message
    const message = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: messageContent,
      metadata: { by: "human" },
    });

    // set up the instruction for the agent
    const instruction = `You are professional cloud resource analyzer. Your name is FinAssist. Your task is to help the user to analyze their cloud infrastructure and guide them on how to optimize the infrastructure and how to cut down the cost.
      The user will provide you the details of their cloud infrastructure is a json format and will ask questions related to that. You will respond in the asked format.`;

    // run the thread with the new message
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      instructions: instruction,
      stream: true,
    });

    return run;
  };

  if (thread_id) {
    // if thread_id is available, configure thread id
    threadId = thread_id;
    console.log("threadId: ", threadId);
    messageValue = userMessage;

    // configure new user message
  } else {
    const prompt = `Here is my information about my cloud infrastructure, please analyze and generate the following

  Information: ${JSON.stringify(data[0])}

  Generate the response as mentioned below:

  Summary: summarize your analysis
  Why it is required: justify your analysis
  Benefits of Applying the change: explain the benefits
  CPU Utilization: Analyze CPU utilization as average, minimum and maximum utilization
  Recommendation: Your final recommendation 
  `;
    const thread = await openai.beta.threads.create();
    threadId = thread.id;
    console.log("threadId: ", threadId);
    messageValue = prompt;
  }

  // get the streamer
  const streamer = await handleRun(threadId, messageValue);

  // Stream out the completion
  return new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(JSON.stringify({ threadId }) + "\n");
        for await (let chunk of streamer) {
          if (chunk.event === "thread.message.delta") {
            controller.enqueue(
              JSON.stringify(chunk.data.delta.content[0]) + "\n"
            );
          }
        }
        controller.close();
      },
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
