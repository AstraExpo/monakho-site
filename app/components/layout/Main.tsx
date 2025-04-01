import { Card } from "../ui/card";
import { Button } from "../ui/button";

export function Main() {
  return (
    <main className="container mx-auto p-6">
      <Card>
        <h2 className="text-xl font-bold">Welcome to Monakho Ministry</h2>
        <p className="text-gray-700">
          Experience the power of worship and ministry.
        </p>
        <Button className="mt-4">Learn More</Button>
      </Card>
    </main>
  );
}