"use client";
import { formatAddress } from "@/utils/addresses";
import Image from "next/image";
import { useEffect, useState } from "react";

const Avatar = ({ address }: { address: string }) => {
  const [avatar, setAvatar] = useState<string>("");
  const [name, setName] = useState<string>("");
  const getAvatar = async () => {
    setAvatar((await formatAddress(address, true)).avatar);
  };

  useEffect(() => {
    getAvatar();
  }, [address]);

  return (
    <div className="inline-flex gap-2">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-7 rounded-full">
          <Image src={avatar || "/metamask.png"} width={30} height={30} alt="" />
        </div>
      </label>
      {name && <p className="text-center">{name}</p>}
    </div>
  );
};

export default Avatar;
