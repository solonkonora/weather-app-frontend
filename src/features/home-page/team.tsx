"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const teamsAvatar = [
  {
    githubUsername: "SolonkoNora",
    role: "role",
  },
];

const getAccountUrl = (username: string, image: boolean = false) =>
  `https://github.com/${username}${image ? ".png" : ""}`;

export default function Team() {
  const [currentImg, setCurrentImg] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImg(index);
  };

  return (
    <main className="w-full bg-primary-color mt-10 gap-4 pt-20 pb-20">
      <div className="flex gap-8 mx-40 items-center">
        <div className="group w-1/2  hover:bg-white hover:shadow-lg hover:border-transparent">
          <Image
            alt="My Icon"
            width={500}
            height={500}
            layout="responsive"
            src={getAccountUrl(teamsAvatar[currentImg].githubUsername, true)}
          />
          <div className="group text-xl items-center p-2 hover:rounded-sm hover:cursor-pointer">
            <Link
              href={getAccountUrl(teamsAvatar[currentImg].githubUsername)}
              className="group-hover:text-primary-color text-transparent "
              target="_blank"
            >
              {getAccountUrl(teamsAvatar[currentImg].githubUsername)}
            </Link>
          </div>
        </div>

        <div className="w-1/2 grid grid-cols-2 gap-4">
          {teamsAvatar.map(
            ({ githubUsername }, index) =>
              index !== currentImg && (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleImageClick(index)}
                >
                  <Image
                    src={getAccountUrl(githubUsername, true)}
                    alt="My Avatar"
                    width={500}
                    height={500}
                  />
                  <Link
                    href={getAccountUrl(githubUsername)}
                    target="_blank"
                    className="text-secondary-color cursor-pointer font-bold hover:bg-sky-700 p-3"
                  >
                    {githubUsername}
                  </Link>
                </div>
              )
          )}
        </div>
      </div>
    </main>
  );
}
