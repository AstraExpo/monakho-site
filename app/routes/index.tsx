import { createFileRoute } from "@tanstack/react-router";
import { getCount } from "../functions";
import { Footer } from "../components/layout/footer";
import { Main } from "../components/layout/Main";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    try {
      return await getCount();
    } catch (error) {
      console.error("Failed to load count:", error);
      return null;
    }
  },
});

function Home() {
  return (
    <>
      <Main />
    </>
  );
}
