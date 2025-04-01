import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getCount, updateCount } from "../functions";
import Main from "../components/Main";
import { Navbar } from "../components/layout/navbar";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Footer } from "../components/layout/footer";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCount(),
});

function Home() {
  const state = Route.useLoaderData();
  const router = useRouter();

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-6">
        <Card>
          <h2 className="text-xl font-bold">Welcome to Monakho Ministry</h2>
          <p className="text-gray-700">
            Experience the power of worship and ministry.
          </p>
          <Button className="mt-4">Learn More</Button>
        </Card>
      </main>
      <Footer />
    </>
  );
}
