import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from "react-icons/io";

const Footer = () => {
  return (
    <div className="bg-gray-300 text-gray-600 text-sm text-center py-5 w-full">
      <div className="flex justify-center items-center gap-x-3 mb-3 text-xl">
        <IoLogoFacebook className="cursor-pointer" />
        <IoLogoTwitter className="cursor-pointer" />
        <IoLogoInstagram className="cursor-pointer" />
      </div>
      <p className="font-semibold">
        @Copyright 2024 All rights reserved to
        <a href="https://github.com/probhask" className="ml-1">
          https://github.com/probhask
        </a>
      </p>
    </div>
  );
};

export default Footer;
