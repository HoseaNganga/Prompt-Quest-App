import HomeFeed from "@/components/HomeFeed/HomeFeed";

export default function Home() {
  return (
    <>
      <header className="grid justify-center p-8">
        <h1 className="text-4xl font-extrabold capitalize text-center mb-4">
          discover & share
          <br />
          <span className="text-center bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
            ai-powered prompts
          </span>
        </h1>
        <p className="text-center desc">
          Prompt Quest is an open-source AI prompting tool for modern world to
          discover,create and share creative prompts
        </p>
      </header>
      <main>
        <HomeFeed />
      </main>
    </>
  );
}
