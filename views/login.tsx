const Login = ({ valid }: { valid: "yes" | "no" | null }) => {
  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <h2 className="card-title">Welcome to TodoEr</h2>
        <p>Your Decentralized Todo App.</p>
        {valid == "no" ? (
          <p className="font-medium text-sm my-3 mt-8 text-slate-400 max-w-md">
            Unfortunately, you can not access this application, because you do not own a required NFT. if it is an
            error, please contact support.{" "}
            <a href="/mint" className="link text-accent">
              or mint from here
            </a>
          </p>
        ) : (
          <p className="uppercase font-medium text-sm my-3 text-gray-400">sign in with your wallet</p>
        )}
        <div className="card-actions justify-end">{/* <button className="btn">Buy Now</button> */}</div>
      </div>
    </div>
  );
};

export default Login;
