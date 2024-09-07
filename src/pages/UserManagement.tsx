import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchUsers, UserType } from "../state/user/userSlice";
import { ArrowDown, ArrowUp } from "lucide-react";

const UserManagement = () => {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sort, setSort] = useState<"nameDesc" | "nameAsc" | undefined>(
    "nameDesc"
  );

  useEffect(() => {
    dispatch(fetchUsers({ name, username, email, phone, sort }));
  }, [name, username, email, phone, sort]);

  const sortUsers = () => {
    let sortedUsers: UserType[] = [...userState.users];

    sort === "nameDesc"
      ? sortedUsers.sort((a, b) => (a.name > b.name ? 1 : -1))
      : sortedUsers.sort((a, b) => (a.name < b.name ? 1 : -1));

    return sortedUsers;
  };

  const debounceFilter = (
    setValue: Dispatch<SetStateAction<string>>,
    value: string
  ) => {
    const timeout = setTimeout(() => {
      setValue(value);
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
                  <button
                    onClick={() => {
                      sort == "nameDesc"
                        ? setSort("nameAsc")
                        : setSort("nameDesc");
                    }}
                  >
                    {sort === "nameDesc" ? <ArrowDown /> : <ArrowUp />}
                  </button>
                  <input
                    type="text"
                    placeholder="Search by Name"
                    onChange={(e) => debounceFilter(setName, e.target.value)}
                  />
                </td>
                <td scope="col">
                  <input
                    type="text"
                    placeholder="Search by Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </td>
                <td scope="col">
                  <input
                    type="text"
                    placeholder="Search by Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </td>
                <td scope="col">
                  <input
                    type="text"
                    placeholder="Search by Phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </td>
              </tr>
            </thead>
            <tbody>
              {userState.users.length !== 0 ? (
                sortUsers().map((user) => (
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
