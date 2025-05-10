import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import Header from "./components/Header";

const API_URL = "https://v1.rocketapi.io/instagram/user/search";
const API_TOKEN = process.env.REACT_APP_ROCKET_API_TOKEN;

function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 12;

  const searchUsers = async () => {
    if (!query.trim()) return;
    try {
      setLoading(true);

      const response = await axios.post(
        API_URL,
        { query },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${API_TOKEN}`,
          },
        }
      );

      // ⛑ SAFE ACCESS: check if structure exists before digging inside
      const usersFound = response.data?.response?.body?.users || [];
      setUsers(usersFound);
      setCurrentPage(1);

      // ✍️ Also call saving only if users are found
      if (usersFound.length > 0) {
        await saveUsersToServer(usersFound);
      }
    } catch (error) {
      console.error("API Error", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveUsersToServer = async (usersToSave) => {
    try {
      const minimalUsers = usersToSave.map((user) => ({
        username: user.username,
        full_name: user.full_name,
        profile_pic_url: user.profile_pic_url,
        profile_pic_id: user.profile_pic_id,
      }));

      await axios.post("http://localhost:3001/save-users", minimalUsers);
      console.log("✅ Users saved successfully to users.json");
    } catch (error) {
      console.error("❌ Failed to save users.json:", error.message);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <Header />

      <div className="search-container">
        <SearchBar query={query} setQuery={setQuery} onSearch={searchUsers} />
        <button className="search-button" onClick={searchUsers}>
          Search
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          <div className="grid">
            {currentUsers.map((user) => (
              <UserCard key={user.pk} user={user} />
            ))}
          </div>

          {/* Pagination buttons */}
          {users.length > usersPerPage && (
            <div className="pagination">
              {Array.from(
                { length: Math.ceil(users.length / usersPerPage) },
                (_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => paginate(idx + 1)}
                    className={currentPage === idx + 1 ? "active" : ""}
                  >
                    {idx + 1}
                  </button>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
