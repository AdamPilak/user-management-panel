import { House, Menu, UserCog } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  className: string;
  expaneded: boolean;
  type: "Desktop" | "Mobile";
};

const Navigation = ({ className, expaneded, type }: Props) => {
  const [isExpanded, setIsExpanded] = useState(expaneded);
  const location = useLocation();

  return (
    <nav className={`${className} ${isExpanded ? "expanded" : ""}`}>
      <header>
        <Link to="/" className="logo">
          SMART
        </Link>
        <button
          className="expand-collapse-btn"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <Menu />
        </button>
      </header>

      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "selected" : ""}`}
          onClick={type === "Mobile" ? () => setIsExpanded(false) : undefined}
        >
          <House /> Home
        </Link>
        <Link
          to="/user-management"
          className={`nav-link ${
            location.pathname === "/user-management" ? "selected" : ""
          }`}
          onClick={type === "Mobile" ? () => setIsExpanded(false) : undefined}
        >
          <UserCog /> User Management
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
