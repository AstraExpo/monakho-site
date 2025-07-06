"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

export default function BookPurchaseForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    code: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const res = await fetch("/api/purchase", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("sent");
      setFormData({ name: "", email: "", location: "", code: "" });
    } else {
      alert("Something went wrong. Try again.");
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Order Received!</h2>
        <p className="text-lg">
          Your book will be delivered to your email shortly.
        </p>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 bg-black/20" id="BookPurchaseForm">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Confirm Your Book Purchase
          </h2>
          <p className="text-xl text-gray-300">
            Fill in your details after completing MPESA payment to receive your
            book.
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-md border-white/10">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white font-semibold mb-2"
                  >
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-semibold mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-white font-semibold mb-2"
                  >
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City / Town"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="code"
                    className="block text-white font-semibold mb-2"
                  >
                    MPESA Transaction Code
                  </label>
                  <Input
                    id="code"
                    name="code"
                    type="text"
                    required
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="e.g., QFT67X13XZ"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={status === "sending"}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
              >
                <Send className="mr-2 h-5 w-5" />
                {status === "sending" ? "Submitting..." : "Submit Confirmation"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
