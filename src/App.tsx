import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import Navigation from "./components/Navigation";

const App = () => {
  return (
    <>
      <Navigation className="desktop-nav" expaneded={true} />
      <Navigation className="mobile-nav" expaneded={false} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-management" element={<UserManagement />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
