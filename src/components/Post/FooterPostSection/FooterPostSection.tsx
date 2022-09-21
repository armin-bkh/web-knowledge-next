import React, { useCallback, useMemo, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/outline";

import Hr from "@/common/Hr/Hr";
import Slug from "@/common/Slug/Slug";
import Spacer from "@/common/Spacer/Spacer";
import PostInteraction from "@/common/PostInteraction/PostInteraction";
import SocialLinks from "@/components/Post/SocialLinks/SocialLinks";
import { TBlog } from "@/global/types";
import config from "@/global/config";

export interface IFooterPostSection {
  post: TBlog;
}

const FooterPostSection = (props: IFooterPostSection) => {
  const { post } = props;

  const [copied, setCopied] = useState(false);

  const handleCopied = useCallback(() => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  const CopyIcon = useMemo(
    () => (copied ? CheckIcon : ClipboardIcon),
    [copied]
  );

  return (
    <footer className="w-full">
      <nav className="flex items-center mb-8">
        <Slug
          category={post.category}
          className="bg-white border text-gray-400 border-gray-300 hover:bg-gray-400 dark:bg-gray-400 dark:text-white dark:hover:bg-white dark:hover:text-gray-500"
        />
      </nav>
      <div className="flex flex-col md:flex-row justify-between">
        <PostInteraction post={post} containerClassName="gap-x-7" />
        <div className="flex justify-between md:flex-col items-end md:items-center gap-1">
          <SocialLinks post={post} />
          <CopyToClipboard
            onCopy={handleCopied}
            text={`${config.webKnowledgeUrl}/posts/${post.hashId}/${post.slug}`}
          >
            <button
              className={`flex ${
                copied
                  ? "bg-blue-500 text-white border-white"
                  : "bg-gray-300 text-gray-500 border-gray-400"
              } px-2 py-1 rounded-full border  text-sm`}
            >
              {copied ? <span>Copied to clipboard</span> : "Copy to clipboard"}
              <CopyIcon className="ml-2" width={20} />
            </button>
          </CopyToClipboard>
        </div>
      </div>
      <Hr styles={{ margin: "24px 0" }} />
      <div className="flex items-center">
        <img
          className="rounded-full w-20 h-20"
          src="https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-personal-information-icon-image_1144468.jpg"
        />
        <div className="ml-2">
          <p className="dark:text-light font-black text-lg">
            {post.author.name}
          </p>
          <Spacer times={2} />
          <p className="dark:text-light text-sm my-1">
            {post.author.biography}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPostSection;
