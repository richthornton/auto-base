# Tutorial

In this tutorial we're going to create a realtime chat client.

## The Frontend - NextJS
First, we'll create a simple chat widget.

### Create the project

We'll use NextJS for the frontend framework, and Tailwind CSS for styling. Let's bootstrap an initial project with these already setup. In your command line run:

```bash
npx create-next-app --example with-tailwindcss auto-base-chat
```

If you don't already have `create-next-app` installed it may ask you to do that now. Press 'y' to confirm.

Next, navigate into the project you just created by running:

```bash
cd auto-base-chat
```

Open a text editor, and let's replace `pages/index.tsx` with just some basic content:

```typescript
// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Auto Base Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex flex-col justify-between min-h-screen bg-gray-100 p-8">
          {/* <Messages /> */}
          {/* <MessageInput /> */}
        </div>
      </main>
    </div>
  );
};

export default Home;
```

All you should see is a grey bar in the middle of the screen. Don't worry we'll add some components next.

### Adding the MessageInput

The first thing we want to add is a place for our users to input a message. Let's create a new file with a MessageInput component.

```typescript
// MessageInput.tsx
import { useState } from "react";

type MessageInputProps = {
  onMessage: (message: string) => void;
};
export const MessageInput = ({ onMessage }: MessageInputProps) => {
  const [text, setText] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onMessage(text);
        setText("");
      }}
    >
      <div className="flex items-center justify-center">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-blue-500"
            placeholder="Type your message"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-4 rounded-2xl ml-4"
        >
          Send
        </button>
      </div>
    </form>
  );
};
```

We can now import this into our `pages/index.tsx` file, where the updated version should look like this:

```diff
// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
+ import { MessageInput } from "./MessageInput";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Auto Base Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex flex-col justify-between min-h-screen bg-gray-100 p-8">
          {/* <Messages /> */}
+          <MessageInput onMessage={(message) => console.log(message)} />
        </div>
      </main>
    </div>
  );
};

export default Home;
```

Run `yarn dev` to see the new messages component. If you open the console, you should be able to see the text input being logged after submitting. However, it's not being stored anywhere.


### Storing the data in memory

We can use a `useState` hook to store the list of comments for now.

```diff
// pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import { MessageInput } from "./MessageInput";
+ import { useState } from "react";

+ type Message = {
+  text: string;
+  userId: string;
+ };

+ const userId = crypto.randomUUID();

const Home: NextPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Auto Base Chat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="flex flex-col justify-between min-h-screen bg-gray-100 p-8">
          {/* <Messages /> */}
-          <MessageInput onMessage={(message) => console.log(message)} />
+          <MessageInput
+            onMessage={(text) =>
+              setMessages((messages) => [...messages, { text, userId }])
+            }
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
```

So now we are capturing the messages


### Create our data model

Let's download two packages to help us with our data modelling. Via the command like run:

```bash
npm install fp-ts io-ts
```




- Have a demo of the final component here
- Can create a UUID when it loads, then append it to the url
  - If they refresh the page / load it in another tab they'll see the same thing and can see it working

Steps:

### Supabase

- Setup
- Add table
  - Talk about row level security
- Ensure Realtime is Setup

### NextJS

- Setup project
- Install packages
  - Automerge, Supabase, io-ts, fp-ts
- Create chat or todo component (saving to state)
- Allow async webAssembly

### Next Steps

- Add other type of widget (chat or todo)? Shows how easy it is to add multiple
- Setup row level security
