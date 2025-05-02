import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';

const USERS_JSON_PATH = path.join('users.json');

async function fetchUserData(username) {
  try {
    const response = await axios.get(`https://rocketapi.app/api/user/${username}`);
    return {
      username: username,
      full_name: response.data.user.full_name,
      profile_pic_url: response.data.user.profile_pic_url,
      profile_pic_id: response.data.user.profile_pic_id || 'unknown'
    };
  } catch (error) {
    console.error(`Failed to fetch user ${username}:`, error.message);
    return null;
  }
}

async function updateUsersJson() {
  try {
    const oldUsers = await fs.readJson(USERS_JSON_PATH);
    const updatedUsers = [];

    for (const user of oldUsers) {
      const freshData = await fetchUserData(user.username);
      if (freshData) {
        updatedUsers.push(freshData);
      }
    }

    await fs.writeJson(USERS_JSON_PATH, updatedUsers, { spaces: 2 });
    console.log('✅ users.json updated successfully!');

  } catch (err) {
    console.error('❌ Error updating users.json', err.message);
  }
}

updateUsersJson();
