const login = ({ valid }: { valid: "yes" | "no" | null }) => {
  return (
    <div className="flex flex-col justify-around px-4 h-[90vh] pt-[15vh] pb-[35vh]">
      <div className="m-auto">
        <h1 className="text-4xl font-semibold text-secondary">Welcome to TodoEr.</h1>
        <h1 className="text-4xl font-semibold">Your Decentralized Todo App.</h1>
        {valid == "yes" ? (
          <h2 className="uppercase font-medium text-sm my-3 text-gray-400">you are connected</h2>
        ) : valid == "no" ? (
          <h2 className="font-medium text-sm my-3 mt-8 text-accent max-w-md">
            Unfortunately, you can not access this application, because you do not own a pass NFT required to access
            this space. if it is an error, please contact your project manager.
            <a href="/mint" className="link">
              or mint from here
            </a>
          </h2>
        ) : (
          <h2 className="uppercase font-medium text-sm my-3 text-gray-400">sign in with your wallet</h2>
        )}
      </div>
      {/* <ConnectButton /> */}
    </div>
  );
};

export default login;
