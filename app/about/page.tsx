import { OriginStory } from "@/components/OriginStory";
import { CoreValues } from "@/components/CoreValues";
import Leadership from "@/components/Leadership";

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Monakho Ministry was born from a vision to create worship
            experiences that speak to the modern soul while honoring timeless
            spiritual truths. Valentin Daniel Monakho, born in 1983, began his
            ministry journey at the age of three in 1985. Encouraged by his
            Christian upbringing, especially his mother's influence, he gave his
            first public song presentation during a weekday church service. This
            marked the official beginning of a ministry that now spans over 39
            years (as of 2025).
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <OriginStory />

      {/* Values */}
      <CoreValues />

      {/* Leadership */}
      <Leadership />
    </div>
  );
}
