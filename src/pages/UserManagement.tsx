import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { useEffect } from "react";
import { fetchUsers, setFilters, toggleSort } from "../state/user/userSlice";
import { ArrowDown, ArrowUp } from "lucide-react";

const UserManagement = () => {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(
      fetchUsers({
        name: userState.filters.name,
        username: userState.filters.username,
        email: userState.filters.email,
        phone: userState.filters.phone,
      })
    );
  }, [userState.filters]);

  const debounceFilter = (label: string, value: string) => {
    const timeout = setTimeout(() => {
      dispatch(setFilters({ label, value }));
      clearTimeout(timeout);
    }, 300);
  };

  return (
    <>
      <section className="user-management">
        <h2>User Management</h2>
        <div className="content">
          <table>
            <thead>
              <tr>
                <td scope="col">Name</td>
                <td scope="col">Username</td>
                <td scope="col">Email</td>
                <td scope="col">Phone</td>
              </tr>
              <tr>
                <td scope="col">
                  <button onClick={() => dispatch(toggleSort())}>
                    {userState.sort === "nameDesc" ? (
                      <ArrowDown />
                    ) : (
                      <ArrowUp />
                    )}
                  </button>
                  <input
                    type="text"
                    placeholder="Search by Name"
                    onChange={(e) => debounceFilter("name", e.target.value)}
                  />
                </td>
                <td scope="col">
                  <input
                    type="text"
                    placeholder="Search by Username"
                    onChange={(e) => debounceFilter("username", e.target.value)}
                  />
                </td>
                <td scope="col">
                  <input
                    type="text"
                    placeholder="Search by Email"
                    onChange={(e) => debounceFilter("email", e.target.value)}
                  />
                </td>
                <td scope="col">
                  <input
                    type="text"
                    placeholder="Search by Phone"
                    onChange={(e) => debounceFilter("phone", e.target.value)}
                  />
                </td>
              </tr>
            </thead>
            <tbody>
              {userState.users.length !== 0 ? (
                userState.users.map((user) => (
                  <tr>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No Results</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      </section>
    </>
  );
};

export default UserManagement;
