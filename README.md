# 🚀 Rocket Search App
### Developed by Rafael Padron

---

## 📋 Project Overview

This ReactJS application allows users to search for Instagram profiles using RocketAPI.

The app includes:
- Input field restricted to **alphanumeric characters** (A-Z, a-z, 0-9)
- Maximum input length of 30 characters
- Pasting is blocked inside the search field
- Dynamic search integration with RocketAPI
- Results displayed as a grid of user cards
- Each card shows username, full name, and profile picture
- Profile images are cached locally to improve speed and avoid access issues
- Pagination implemented: 12 users per page

This project fully satisfies the AAALife Frontend Interview assignment requirements.

---

## 📋 Project Structure

rocket-search/
├── public/ # Static public assets 
│   ├── temp/                             # Cached profile images
│   src/
│   ├── components/                       # Reusable React components
│   │   ├── Header.jsx                    # Header component
│   │   ├── Header.css                    # Header styling
│   │   ├── SearchBar.jsx                 # Search input component
│   │   ├── SearchBar.css                 # Search styling
│   │   ├── UserCard.jsx                  # User card display component
│   │   ├── UserCard.css                  # User card styling
│   ├── App.jsx                           # Main React app
│   ├── App.css                           # Application styling
│   ├── index.html                        # Main HTML entry point
│   ├── package.json                      # Frontend project dependencies
├── server.js                             # Express server (saving users and caching images)
├── users.json                            # Stored user data (after RocketAPI search)
├── package.json                          # Project-level dependencies
├── README.md                             # Main project instructions (updated)
├── AAALife_Frontend_Assignment.docx      # Detailed technical environment and steps
├── rocket-search-docs/
│   ├── postman_get_user_search.json      # Postman Collection Request
│   ├── AAALife_Frontend_Interview_Assignment_Rafael_Padron.docx

---

## ⚙️ How to Setup and Run the Project

### 1. Install all dependencies

At the root of the project, run:
```bash
npm install
```

### 2. Run the Application

Run backend and frontend together (Recommended)

At the root, run:
```bash
npm run dev
```

### 3. Open the Application

Frontend will be available at:
http://localhost:5173

Backend API server will be available at:
http://localhost:3001

### QUICK START EXAMPLE
```bash
npm install
npm run dev
```

---

### 📢 Important Notes
* ⚡ Known Behavior:
After searching for a new user, if profile images start flickering, click any pagination button to refresh the view and stabilize the grid.

* 🖼️ Image Caching:
User profile pictures are downloaded and cached inside /public/temp/ to ensure faster loading and avoid external access problems.

* 📄 users.json:
The file users.json saves a snapshot of the last users retrieved.
The server uses it to download corresponding images automatically.

* ⏰ Automatic Refresh:
The backend server schedules a background task every 2 seconds to re-check and re-download profile pictures from users.json.
(Adjustable in server.js using node-cron.)

---

## 📬 API Testing (Postman Collection)

The `rocket-search-docs/` folder includes a Postman collection to manually test the backend API.

### Included Postman File:
- `postman_get_user_search.json` — POST request to test the `/save-users` endpoint.

### How to Import and Use:

1. Open Postman application.
2. Click **Import** ➔ **Upload Files**.
3. Select the file:
   rocket-search-docs/postman_get_user_search.json
4. The collection will appear in your Postman workspace.

### How to Test:

- Send a `POST` request to:
    http://localhost:3001/save-users

- Set the request **Body** to `raw` ➔ `JSON` format, with example content like:

Postman JSON request body (on Body: raw + JSON):
```json
[
  {
    "username": "rafaelpadron",
    "full_name": "Rafael Padron",
    "profile_pic_url": "https://example.com/profile.jpg",
    "profile_pic_id": "1234567890"
  }
]
```

✅ If the server responds with 200 OK, your users.json will be updated successfully with the posted users' data.

---

## 🛠 Design Decisions

### 📦 Pagination

Originally, when displaying many users at once, the page would become extremely long, slow, and difficult to navigate.  
To provide a better user experience:
- Pagination was implemented.
- Only 12 user cards are displayed per page.
- Users can easily navigate pages using page buttons.

This results in a faster, cleaner, and more structured user interface.

---

### 🖼 Image Caching

Instagram images are externally hosted, which could cause:
- 403 Forbidden errors
- Slow loading
- Broken images

To fix this:
- Profile images are downloaded by the server.
- Cached locally inside `/public/temp/`.
- React displays images directly from the local `/temp/` folder.

✅ This ensures faster loading, avoids external image issues, and provides a smoother UX.

---

### 🧹 Simplified Backend

Instead of processing images dynamically during user search,  
the backend provides a clean `/save-users` endpoint to:
- Save user data into `users.json`
- Handle caching separately if needed

✅ Keeps backend minimal, robust, and easy to maintain.

---

### 🛠️ Technologies Used
* ReactJS (Vite + Babel)

* ExpressJS (Backend API server)

* Node.js (Server and file system handling)

* Axios (HTTP requests for RocketAPI and image downloads)

* p-limit (Control concurrency of downloads)

* node-cron (Schedule periodic background tasks)

* fs-extra (Enhanced file system operations)

* Postman (API testing)

---

### 🧹 Future Improvements
* Replace 2-second cron refresh with a more optimized scheduler (e.g., every 30 seconds).

* resolve the flicking image bug.

* Handle large users.json datasets with batch download processing.

* Add error UI feedback when image downloads fail (e.g., placeholder image).

* Implement lazy loading for user profile images.

* Add unit and integration tests with Jest and React Testing Library.

---

## 🔐 Environment Variables

Before running the app, create a `.env` file in the root directory. Use `.env.example` as a guide:

```bash
cp .env.example .env
```

---

## 🎯 Conclusion

This project was carefully designed and developed to meet all the requirements of the AAALife Frontend Interview Assignment:

- Dynamic search using RocketAPI
- Alphanumeric-only search input validation (30 character max, no paste allowed)
- Responsive grid layout of user cards
- Pagination with 12 users per page
- Local caching of profile images to ensure consistent display
- Backend server to store user data (`users.json`)
- Full API testing with Postman
- Clean project structure and professional documentation

Thank you for reviewing this project!

---

### 👨‍💻 Developed by:  
Rafael Padron

🔗 [LinkedIn Profile](https://www.linkedin.com/in/rafael-padron-66b3b635/)
