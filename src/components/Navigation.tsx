import { House, Menu, UserCog } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  className: string;
  expaneded: boolean;
}

const Navigation = ({ className, expaneded }: Props) => {
  const [isExpanded, setIsExpanded] = useState(expaneded);

  return (
    <nav className={`${className} ${isExpanded ? "expanded" : ""}`}>
      <header>
        <a href="" className="logo">
          SMART
        </a>
        <button
          className="expand-collapse-btn"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <Menu />
        </button>
      </header>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          <House /> Home
        </Link>
        <Link to="/user-management" className="nav-link">
          <UserCog /> User Management
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
