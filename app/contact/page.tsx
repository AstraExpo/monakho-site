import type React from "react";

import { HeroContact } from "@/components/HeroContact";
import { ContactMethods } from "@/components/ContactMethods";
import { ContactForm } from "@/components/ContactForm";
import { QuickActions } from "@/components/QuickActions";
import { Location } from "@/components/Location";

export default function Contact() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroContact />

      {/* Contact Methods */}
      <ContactMethods />

      {/* Contact Form */}
      <ContactForm />

      {/* Quick Actions */}
      <QuickActions />

      {/* Location & Hours */}
      {/* TODO: Update the location section if it is needed */}
      {/* <Location /> */}
    </div>
  );
}
