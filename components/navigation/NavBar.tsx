import Avatar from "../UI/Avatar";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a>all</a>
            </li>
            <li>
              <a>completed</a>
            </li>
            <li>
              <a>un-completed</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">TodoEr</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>all</a>
          </li>
          <li>
            <a>completed</a>
          </li>
          <li>
            <a>un-completed</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div>
          <Avatar address="0xB8AF7Fa3DBF5D0c557b6b6dC874c3CC85B0E8d95" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
