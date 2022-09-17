import React from "react";
import { FaLinkedinIn, FaTwitter, FaTelegram } from "react-icons/fa";

const socials = [
  { name: "Telegram", Icon: FaTelegram },
  { name: "Twitter", Icon: FaTwitter },
  { name: "LinkedIn", Icon: FaLinkedinIn },
];

const SocialLinks = () => {
  return (
    <nav className="flex gap-x-4 justify-evenly md:justify-start mt-8 md:mt-0">
      {socials.map(({ name, Icon }) => (
        <a
          key={name}
          className="text-3xl text-gray-dark dark:text-gray-400 cursor-pointer hover:text-gray-400 dark:hover:text-gray-100"
        >
          <Icon />
        </a>
      ))}
    </nav>
  );
};

export default SocialLinks;
