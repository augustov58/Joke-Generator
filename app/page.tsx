"use client";

import { AwaitedReactNode, JSXElementConstructor, ReactElement, ReactNode, useState } from "react";
import { useChat } from "ai/react";

// Move these outside the component
const genres = [
  { emoji: "🧙", value: "Fantasy" },
  { emoji: "🕵️", value: "Mystery" },
  { emoji: "💑", value: "Romance" },
  { emoji: "🚀", value: "Sci-Fi" },
];

const tones = [
  { emoji: "😊", value: "Happy" },
  { emoji: "😢", value: "Sad" },
  { emoji: "😏", value: "Sarcastic" },
  { emoji: "😂", value: "Funny" },
];

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  const [state, setState] = useState({
    genre: "",
    tone: "",
  });
  
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleGenerateStory = () => {
    append({
      role: "user",
      content: `Generate a ${state.genre} story in a ${state.tone} tone`,
    });
  };

  const renderOptions = (options: { value: any; emoji: any; }[], name: string) => (
    <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
      <h3 className="text-xl font-semibold">{name}</h3>
      <div className="flex flex-wrap justify-center">
        {options.map(({ value, emoji }) => (
          <div key={value} className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
            <input
              id={value}
              type="radio"
              value={value}
              name={name.toLowerCase()}
              onChange={handleChange}
            />
            <label className="ml-2" htmlFor={value}>
              {`${emoji} ${value}`}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story by selecting the genre and tone.
            </p>
          </div>

          {renderOptions(genres, "Genre")}
          {renderOptions(tones, "Tone")}

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone}
            onClick={handleGenerateStory}
          >
            Generate Story
          </button>

          {messages.length > 0 && !messages[messages.length - 1]?.content.startsWith("Generate") && (
            <div className="bg-opacity-25 bg-gray-700 rounded-lg p-4">
              {messages[messages.length - 1]?.content}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}