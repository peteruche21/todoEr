"use client";
import { formatAddress } from "@/utils/addresses";
import Image from "next/image";
import { useEffect, useState } from "react";

const Avatar = ({ address }: { address: string }) => {
  const [avatar, setAvatar] = useState<string>("");
  const getAvatar = async () => {
    setAvatar((await formatAddress(address, false)).avatar);
  };

  useEffect(() => {
    getAvatar();
  }, [address]);

  return (
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-7 rounded-full">
        <Image src={avatar || "/metamask.png"} width={30} height={30} alt="" />
      </div>
    </label>
  );
};

export default Avatar;
