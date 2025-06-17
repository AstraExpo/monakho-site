import {
  CarFront,
  Music,
  Cross,
  Star,
  Rotate3d,
  Calendar,
  Mail,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { Metadata } from "next";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/worship-events", label: "Events" },
  { href: "/gifts", label: "Content" },
  { href: "/contact", label: "Contact" },
];

export const values = [
  {
    icon: CarFront,
    title: "GOD - DRIVEN WORSHIP:",
    description: "Centered in Truth and Spirit: <strong>John 4:23</strong>",
  },
  {
    icon: Music,
    title: "SACRED MUSIC:",
    description:
      "Every song, lyrics and messages areSpirit led grounded in the Word of God: <strong>John 1:1</strong> and <strong>Romans 8:14</strong>",
  },
  {
    icon: Cross,
    title: "HOLINESS:",
    description:
      "Pursuing purity in Spirit, Heart and Intimacy with God with a lifestyle to honor the Glorious of God: <strong> Psalm 24:3-4</strong>, <strong>John 4:23</strong>",
  },
  {
    icon: Star,
    title: "EXCELLENCE WITH HUMILITY:",
    description:
      "We offer our best in the Word Of God, Music and ministry with contrite heart and humble spirit to God: <strong>Isaiah 57:15</strong>, <strong>Colossians 3:23</strong>",
  },
  {
    icon: Rotate3d,
    title: "TRANSFORMATION THROUGH WORSHIP:",
    description:
      " Worship that transforms and establish good change in lives and brings freedom, healing, and salvation to all Heads of state and their nations :<strong> Revelation 21:21-27</strong>, <strong>2 Corinthians 3:18</strong>",
  },
];

export const leadership = [
  {
    name: "Valentine Monakho",
    role: "Founder & Ministry Leaderr",
    image: "/Monakho_PhotoGrid (1) (1).png",
    bio: "Valentine has been leading worship communities for over 10 years, with a passion for bridging traditional faith with contemporary expression.",
  },
  {
    name: "Winnie Monakho",
    role: "Lead Vocalist & Worship Leader",
    image: "/Winnie (1).png",
    bio: "Winnie brings her background in music and worship leading to create powerful and engaging worship experiences.",
  },
  {
    name: "PA Flourence",
    role: "Personal Assistant to Valentin Monakho",
    image: "/Florence_PhotoGrid (1) (1).png",
    bio: "Flourence is the Personal Assistant to Valentin Monakho and is Responsible for passing Ministry Information to the entire team.",
  },
  {
    name: "Producer Brian",
    role: "Music Producer & Band Director",
    image: "/Chekea (1).png",
    bio: "Brian focuses on crafting the sound of Monakho Ministry, blending modern production techniques with sacred music traditions.",
  },
  {
    name: "Pianist Dominic",
    role: "Deputy Band Director",
    image: "/Domonic_PhotoGrid (1) (1).png",
    bio: "Dominic is the lead Pianist and Deputy Band Director.",
  },
  {
    name: "Secretary Emmanuel",
    role: "Secretary and Pianist",
    image: "/Emmanuel (1).png",
    bio: "Emmanuel is a Prayer worrior and the secretary to the Ministry. He is responsible for planning and Organising events.",
  },
];

export const metadata: Metadata = {
  title: "About Us - Monakho Ministry",
  description:
    "Learn about our mission, values, and leadership team at Monakho Ministry.",
};

export const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a message anytime",
    contact: "Gmail",
    action: "mailto:monakhoministry@gmail.com",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our team",
    contact: "Direct Phone Call",
    action: "tel:+254711547617",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with us online",
    contact: "Available 9 AM - 6 PM",
    action: "https://wa.me/254711547617",
    gradient: "from-pink-500 to-red-500",
  },
  {
    icon: Calendar,
    title: "Schedule Meeting",
    description: "Book a one-on-one",
    contact: "Google Calender",
    action: "https://calendar.google.com/calendar/u/2/r?pli=1",
    gradient: "from-red-500 to-orange-500",
  },
];

export const quickActions = [
  {
    icon: Users,
    title: "Join Our Community",
    description: "Connect with fellow believers",
    action: "Join WhatsApp Group",
    url: "https://chat.whatsapp.com/your-whatsapp-group-id", // TODO: Update the url to a valid whatsapp group link
  },
  {
    icon: Calendar,
    title: "Attend an Event",
    description: "Find upcoming worship services",
    action: "Watch on YouTube",
    url: "https://www.youtube.com/@monakho.",
  },
  {
    icon: MessageCircle,
    title: "Prayer Request",
    description: "Send your prayer request via WhatsApp",
    action: "Message Us",
    url: "https://wa.me/254711547617",
  },
];
