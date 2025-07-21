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
  Heart,
} from "lucide-react";
import { Metadata } from "next";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/client/about", label: "About" },
  { href: "/client/worship-events", label: "Events" },
  { href: "//client/gifts", label: "Content" },
  { href: "/client/contact", label: "Contact" },
];

export const values = [
  {
    icon: CarFront,
    title: "GOD-DRIVEN WORSHIP:",
    description: "Centered in truth and spirit: <strong>John 4:23</strong>",
  },
  {
    icon: Music,
    title: "SACRED MUSIC:",
    description:
      "Every song, lyric, and message is Spirit-led and grounded in the Word of God: <strong>John 1:1</strong>, <strong>Romans 8:14</strong>",
  },
  {
    icon: Cross,
    title: "HOLINESS:",
    description:
      "Pursuing purity in spirit, heart, and intimacy with God — living a lifestyle that honors the glory of God: <strong>Psalm 24:3–4</strong>, <strong>John 4:23</strong>",
  },
  {
    icon: Star,
    title: "EXCELLENCE WITH HUMILITY:",
    description:
      "Offering our best in the Word, music, and ministry — with a contrite heart and humble spirit to God: <strong>Isaiah 57:15</strong>, <strong>Colossians 3:23</strong>",
  },
  {
    icon: Rotate3d,
    title: "TRANSFORMATION THROUGH WORSHIP:",
    description:
      "Worship that brings transformation, freedom, healing, and salvation — impacting lives, leaders, and nations: <strong>Revelation 21:21–27</strong>, <strong>2 Corinthians 3:18</strong>",
  },
];

export const leadership = [
  {
    name: "VALENTIN MONAKHO",
    role: "Founder & Ministry Leaderr",
    image: "/Monakho_PhotoGrid (1) (1).png",
    bio: "Valentin Monakho is an anointed spiritual worship leader and gifted music arranger, known for stirring revival through truth, mentorship, and Spirit-led worship. God moves powerfully through his voice and guitar, creating sacred moments where lives are transformed. He is also a great crowd mover and puller, drawing hearts into deep worship and divine encounter—where the presence of God becomes tangible and undeniable.",
  },
  {
    name: "WINNIE MONAKHO",
    role: "Lead Vocalist & Worship Leader",
    image: "/Winnie (1).png",
    bio: "Winnie Monakho, a fervent worshipper graced with a voice that moves the soul, stands faithfully beside her husband, the vision bearer Valentin Monakho, in the sacred calling of divine worship and service.",
  },
  {
    name: "FLORENCE MAKOKHA",
    role: "Personal Assistant to Valentin Monakho",
    image: "/Florence_PhotoGrid (1) (1).png",
    bio: "The Personal Assistant to Valentin Monakho, entrusted with overseeing ministry operations, ensuring order, coordinating communication, advising team members, and supporting strategic planning and event organization.",
  },
  {
    name: "PRISILA MONAKHO",
    role: "Treasurer and Lead Vocalist",
    image: "/Priscila Monakho_preview_rev_1.png",
    bio: "She is the Treasurer and longest-serving worshipper in Monakho Ministry, a dynamic gospel singer known for her unique, crowd, drawing voice, unwavering zeal, and unquestioning obedience in service to God.",
  },
  {
    name: "BRIAN ISUTSA",
    role: "Music Producer & Band Director",
    image: "/Chekea (1).png",
    bio: "He is the producer of his own music ministry and Band Director in Monakho Ministry,  skillfully shaping sound, including signature snapping elementsreflecting the vision bearer’s creative musical arrangements and Spirit- led worship.",
  },
  {
    name: "ANTHONY KIBASO",
    role: "Secretary and Prayer Cordinator",
    image: "/Emmanuel (1).png",
    bio: "Serves as the Secretary and Prayer Cordinator of Monakho Ministry, carrying an unwavering zeal and a sacred devotion to God's work with radiant excellence.",
  },
  {
    name: "MR THOMAS WILSING",
    role: "Lead Coordinator – Germany and the Entire European Region",
    image: "/Avatar.png",
    bio: "With a heart of reverence and humility, Mr. Thomas Wilsing faithfully serves and worships God through the sacred calling of Monakho Ministry. As the appointed coordinator for Germany and the broader European sphere, he embodies the vision of the God-Driven Worship Movement, advancing the ministry’s mission with excellence, devotion, and unwavering commitment to the glory of God.",
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
    url: "https://chat.whatsapp.com/CTtggWUqWRdHH8Zltqy3Mr",
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

export const featuredAlbums = [
  // TODO: Update the albums with real data
  // The images are just placeholders, you can replace them with actual album cover images
  {
    id: 1,
    title: "Digital Sanctuary",
    artist: "Monakho Worship",
    year: "2023",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Our latest album exploring themes of faith in the digital age.",
    tracks: 12,
    duration: "48:32",
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Acoustic Sessions",
    artist: "Monakho Collective",
    year: "2023",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "Intimate acoustic versions of our most beloved worship songs.",
    tracks: 8,
    duration: "32:15",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Live from the Heart",
    artist: "Monakho Ministry",
    year: "2022",
    image: "/placeholder.svg?height=300&width=300",
    description: "Recorded live during our most powerful worship services.",
    tracks: 10,
    duration: "52:18",
    gradient: "from-pink-500 to-red-500",
  },
];

export const popularTracks = [
  // TODO: Update the tracks with real data
  // The images are just placeholders, you can replace them with actual track cover images
  {
    title: "Future Hope",
    artist: "Monakho Worship",
    duration: "4:23",
    plays: "12.5K",
  },
  {
    title: "Digital Prayers",
    artist: "Sarah Johnson",
    duration: "3:45",
    plays: "8.9K",
  },
  {
    title: "Connected Hearts",
    artist: "Marcus Chen",
    duration: "5:12",
    plays: "15.2K",
  },
  {
    title: "Infinite Grace",
    artist: "Elena Rodriguez",
    duration: "4:01",
    plays: "11.7K",
  },
  {
    title: "Modern Psalms",
    artist: "Monakho Collective",
    duration: "3:58",
    plays: "9.3K",
  },
];

export const liveRecordings = [
  // TODO: Update the recordings with real data
  {
    title: "Sunday Service - December 3, 2023",
    duration: "1:15:32",
    views: "2.1K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    title: "Acoustic Night - November 24, 2023",
    duration: "45:18",
    views: "1.8K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
  {
    title: "Youth Worship - November 18, 2023",
    duration: "52:45",
    views: "3.2K",
    thumbnail: "/placeholder.svg?height=200&width=350",
  },
];

  export const upcomingEvents = [
    {
      id: 1,
      title: "Tehillah Worship Experience",
      date: "Every Monday",
      time: "06:00 PM - 08:30 PM",
      location: "Online via Youtube Live and Tiktok",
      description:
        "Join us for our weekly worship service featuring contemporary music, inspiring messages, and community connection.",
      type: "Weekly Tehillah Worship",
      icon: Heart,
      gradient: "from-blue-500 to-purple-500",
    },
    {
      id: 2,
      title: "Nakuru City Mission fellowship",
      date: "July 13, 2025",
      time: "7:00 AM - 9:00 PM",
      location: "At City Mission Fellowship, Nakuru",
      description: "Nakuru City Mission fellowship – One day God- Driven  Worship Impartation At City Mission Fellowship, Nakuru Town.",
      type: "Special Event",
      icon: Music,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Youth Worship Gathering",
      date: "Saturday, Dec 16",
      time: "6:00 PM - 8:30 PM",
      location: "TBD",
      description:
        "High-energy worship designed for teens and young adults with contemporary music and relevant messages.",
      type: "Youth Event",
      icon: Star,
      gradient: "from-pink-500 to-red-500",
    },
    {
      id: 4,
      title: "Christmas Eve Service",
      date: "Sunday, Dec 24",
      time: "7:00 PM - 8:30 PM",
      location: "TBD",
      description:
        "Celebrate the birth of Christ with a special candlelight service featuring carols, communion, and reflection.",
      type: "Holiday Service",
      icon: Heart,
      gradient: "from-red-500 to-orange-500",
    },
    {
      id: 5,
      title: "New Year Prayer & Worship",
      date: "Wednesday, Dec 31",
      time: "TBD",
      location: "Online & In-Person",
      description: "Welcome the new year with prayer, worship, and setting intentions for the year ahead.",
      type: "Special Service",
      icon: Star,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 6,
      title: "Community Outreach Day",
      date: "Regularly",
      time: "9:00 AM - 3:00 PM",
      location: "Various Locations",
      description: "Join us as we serve our local community through various outreach projects and acts of kindness.",
      type: "Community Service",
      icon: Users,
      gradient: "from-green-500 to-blue-500",
    },
  ]

    export const pastEvents = [
      {
        title: "Overnight Kesha - Prayer  & Worship Experience",
        date: "June 27th 2025",
        description: "Overnight Kesha - Prayer  & Worship Experience, Huruma Ethiopian Church on Friday, June 27, 2025 All Night",
        attendees: 15,
      },
      {
        title: "Street Worship at the Marketplace",
        date: "Saturday , June 28, 2025",
        description: "DECIBEL Shop, Luthuli Avenue - Nairobi, Kenya  From 12:00 Noon.",
        attendees: 30,
      },
      {
        title: "God-Driven Worship Impartation.",
        date: "Wednesday, July 2 – Friday, July 4, 2025",
        description: "God-Driven Worship Impartation Muradi, Embakasi  from Wednesday, July 2 – Friday, July 4, 2025 Time: 5:00 p.m. – 8:30 p.m.",
        attendees: 200,
      },
    ]
  