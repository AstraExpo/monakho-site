import React from "react";
import Image from "next/image";

export function OriginStory() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ministry Journey & Milestones
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Since that early moment, Valentin has:
            </p>
            <ul className="text-gray-300 mb-6 text-md">
              <li className="text-gray-300 mb-6 text-md">
                Written, composed, and produced over{" "}
                <strong>50 audio recordings</strong> and several video projects.
              </li>
              <li className="text-gray-300 mb-6 text-md">
                Performed in <strong>live recording concerts</strong> and
                appeared on numerous <strong>radio and TV stations</strong> in
                Nairobi and Mombasa.
              </li>
              <li className="text-gray-300 mb-6 text-md">
                Served for over <strong>12 years</strong> in the{" "}
                <strong>Coptic Hospital Ministry (2012–2025)</strong>, where
                many have experienced spiritual, emotional, and physical
                healing, and come to faith in Christ.
              </li>
              <li className="text-gray-300 mb-6 text-md">
                Ministered in{" "}
                <strong>
                  churches, streets, prisons, police stations, weddings,
                  birthdays, corporate events, evangelism missions,
                </strong>{" "}
                and <strong>prayer rallies</strong> across Kenya.
              </li>
              <li className="text-gray-300 mb-6 text-md">
                Seen <strong>lives transformed</strong>,{" "}
                <strong>people baptized</strong>, and{" "}
                <strong>miracles, signs, and wonders</strong> manifest through
                his ministry, particularly through worship, guitar playing, and
                songwriting.
              </li>
            </ul>
          </div>
          <div className="relative mb-10">
            <Image
              src="/Monakho.png"
              alt="Ministry Origin"
              width={600}
              height={500}
              className="rounded-lg opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-lg"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Growth into Digital Ministry{" "}
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              The ministry embraced digital platforms in <strong>2022</strong>{" "}
              and officially launched online in <strong>2024</strong>. Current
              digital efforts focus on:
            </p>
            <ul className="text-gray-300 mb-6 text-md">
              <li>
                <strong>YouTube live streaming</strong>
              </li>
              <li>Initial TikTok outreach (2025)</li>
              <li>
                Plans to activate the official website for digital ministry
              </li>
            </ul>
            <p className="text-gray-300 mb-6 text-lg">
              Though major viral reach is yet to be achieved, the goal remains
              to reach a larger audience for the glory of God.
            </p>
          </div>
          <div className="relative mb-10">
            <Image
              src="/Growth.jpeg"
              alt="Ministry Origin"
              width={600}
              height={500}
              className="rounded-lg opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-lg"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ministry Structure & Activities
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Monakho Ministry includes various organized activities such as:
            </p>
            <ul className="text-gray-300 mb-6 text-md">
              <li>Band and sacred music ministry</li>
              <li>Evangelism and preaching the Word</li>
              <li>Prayer, street worship, and street ministry</li>
              <li>Orphan visits, conferences, overnight prayers, missions</li>
              <li>Movie production and creative outreach</li>
            </ul>
            <p className="text-gray-300 mb-6 text-lg">
              The ministry has also formed partnerships with:
            </p>
            <ul className="text-gray-300 mb-6 text-md">
              <li>UBP Ultimate Praise Band</li>
              <li>Action Vijana Na Yesu Campaign</li>
              <li>Decibel Audio</li>
              <li>Other individuals and groups by God’s leading</li>
            </ul>
          </div>
          <div className="relative mb-10">
            <Image
              src="/Ministry Leadership.jpeg"
              alt="Ministry Origin"
              width={600}
              height={500}
              className="rounded-lg opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-lg"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Financial Support
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Valentin attributes his financial support to:
            </p>
            <ul className="text-gray-300 mb-6 text-md">
              <li>
                <strong>
                  God the Father, Jesus Christ, and the Holy Spirit
                </strong>
              </li>
              <li>Income from his personal work and music ministry</li>
              <li>Support from friends and family</li>
            </ul>
          </div>
          <div className="relative mb-10">
            <Image
              src="/Ministry Support.jpeg"
              alt="Ministry Origin"
              width={600}
              height={500}
              className="rounded-lg opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
