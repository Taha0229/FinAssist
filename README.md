# FinAssist: Analyze your cloud infrastructure on the fly  

⚡ Implementing one-stop solution for your cloud infrastructure solutions 💪

## Project Overview

This project implements an OpenAI based agent with handcrafted optimal prompts and UI. The agent is designed to analyze and optimize your cloud infrastructure.  
The app follows an API architecture so that, the model can support external API calls.

## Tech-stack

| Technology | Description                                                           |
|------------|-----------------------------------------------------------------------|
| OpenAI API | Provides the language model for text generation                       |
| Next.Js    | full stack web development framework with optimal solutions           |
| NextUI     | Beautiful UI components served out of the box                         |
| TailwindCSS| makes CSS fun and less exhaustive                                     |

## How it works?

FinAssist provides carefully created AI backed solutions to optimize and save cost on your cloud infrastructure. Applies threads, agents and streaming capabilities to streamline your workflows.

Go to the landing page and initialize a thread. Wait a few seconds, to get redirected to the chatting interface. FinAssists will provide a dummy analysis out of the box to understand its capabilities. You can ask follow ups and can access your chats anytime in the future.

## Task solutions

1. **Project Setup**
    - Initialize a new Next.js project.
    - Install necessary dependencies for OpenAI integration and streaming text functionality.

    1. implemented the latest version of `Next.js` with other dependencies including `framer-motion`, `openai`, `react-markdown`, and `react-icons` 

2. **API Integration**
    - Configure the OpenAI API key securely.
    1. Secured all the API on environment variables
    - Integrate OpenAI's API to enable chatbot functionality.
    2. integrated `gpt-3.5-turbo` with agents, threads, and streaming capabilities

3. **Chatbot Development**
    - Implement the chatbot to support:
        - Streaming text responses.
        1. Manually configured the streaming capability using `ReadableStream` backed by asynchronous programming
        - Continued conversations using [threads](https://platform.openai.com/docs/api-reference/threads).
        2. Implemented multi-thread agent, use the model from heterogeneous devices at scale.
    - Ensure the chatbot renders responses in an interactive and user-friendly manner.
    * Crafted uncompromisng UI with `Next.Js`, `NextUI` and `TailwindCSS` with markdown support using `react-markdown`

4. **Mock API Response Handling**
    - Fetch and parse the provided mock API response.
    1. Tried to mimic actual API calling with the help of mock API.
    - When the chatbot is opened, it should present a summary of the recommendation based on the mock response.
    2. get hands on the analyzed results with memory enabled agent.

5. **User Interaction Flow**
    - Display an initial summary of the recommendation from the mock API response.
    - Allow users to ask follow-up questions and provide detailed answers based on the parsed data.
    1. view analysis summary immediately after starting the model, ask anything around the cloud infrastructures backed by uniquely created prompts
6. **Error Handling and Optimization**
    - Implement error handling for API requests.
    1. curated error handling functionalities while calling APIs
    - Optimize the chatbot’s performance and responsiveness.
    2. Following DRY and avoiding premature optimization


## GitHub commit message format

Feat– feature

Fix– bug fixes

Docs– changes to the documentation like README

Style– style or formatting change

Perf – improves code performance

Test– test a feature

Example: `git commit -m "Docs: add readme"` or `git commit -m "Feat: add chatting interface"`