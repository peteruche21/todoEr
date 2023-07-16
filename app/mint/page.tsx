"use client";
import { TOKEN_CONTRACT_ADDRESS, TOKEN_PINATA_CID } from "@/utils/constants";
import { ethers, parseEther } from "ethers";
import abi from "./abi.json";
import { isHolderOfCollection } from "@/utils/nftApi";
import { useAuth } from "@polybase/react";
import { useEffect, useState } from "react";
import Spinner from "@/components/UI/Loading";
import LoginButton from "@/components/UI/LoginButton";
import { AuthState } from "@polybase/auth";

const Mint = () => {
  const [holder, setHolder] = useState(false);
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, abi, provider);
  const [loading, setLoading] = useState(false);
  const [authState, setAuthState] = useState<AuthState | null>(null);
  const { auth, loading: authLoading } = useAuth();

  const isHolder = async () => {
    if (!authState?.userId) return;
    const _isHolder = await isHolderOfCollection(authState?.userId);
    setHolder(_isHolder);
  };
  async function mint() {
    setLoading(true);
    await contract.mint([authState?.userId, TOKEN_PINATA_CID, 1], { value: parseEther("0.05") });
    setLoading(false);
  }
  async function login() {
    await auth?.signIn();
  }
  useEffect(() => {
    console.log(authState?.userId);
    isHolder();
  }, [authState?.userId]);

  return (
    <div className="card w-96 text-neutral-content m-auto border">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Mint (sepolia)</h2>
        <p>for the purpose of this demo, you are required to pay 0.05 eth to mint.</p>
        {holder ? <p className="text-success">you own an nft</p> : <p className="text-primary">mint one NFT below</p>}
        {!holder && (
          <div className="card-actions justify-end">
            {authState?.userId ? (
              <button className="btn btn-primary" onClick={mint}>
                {loading ? <Spinner /> : "mint"}
              </button>
            ) : authLoading ? (
              <Spinner />
            ) : (
              <LoginButton setAuthState={setAuthState} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mint;
