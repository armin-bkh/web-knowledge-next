import React from "react";
import { FaLinkedinIn, FaTwitter, FaTelegram } from "react-icons/fa";

import config from "@/global/config";
import { TBlog } from "@/global/types";

const socials = [
  {
    name: "Telegram",
    Icon: FaTelegram,
    url: (postAddress: string, title?: string) =>
      `https://telegram.me/share/url?url=${config.webKnowledgeUrl}/posts/${postAddress}`,
  },
  {
    name: "Twitter",
    Icon: FaTwitter,
    url: (postAddress: string, title?: string) =>
      `https://www.twitter.com/share?text${title}&url=${config.webKnowledgeUrl}/posts/${postAddress}`,
  },
  {
    name: "LinkedIn",
    Icon: FaLinkedinIn,
    url: (postAddress: string, title?: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${config.webKnowledgeUrl}/posts/${postAddress}`,
  },
];

export interface ISocialLinksProps {
  post: TBlog;
}

const SocialLinks = (props: ISocialLinksProps) => {
  const { post } = props;

  return (
    <nav className="flex gap-x-4 justify-evenly md:justify-start mt-8 md:mt-0">
      {socials.map(({ name, Icon, url }) => (
        <a
          key={name}
          target="_blank"
          rel="noreferrer"
          className="text-3xl text-gray-dark dark:text-gray-400 cursor-pointer hover:text-gray-400 dark:hover:text-gray-100"
          href={url(`${post.hashId}/${post.slug}`, post.title)}
        >
          <Icon />
        </a>
      ))}
    </nav>
  );
};

export default SocialLinks;
