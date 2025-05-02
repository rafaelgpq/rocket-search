import axios from 'axios';
import fs from 'fs-extra';
import path from 'path';
import cron from 'node-cron';
import pLimit from 'p-limit';

const TEMP_FOLDER = path.join('public', 'temp');

const limit = pLimit(20);

async function loadUsers() {
  try {
    const data = await fs.readFile('users.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error reading users.json', error.message);
    return [];
  }
}

async function downloadImage(user) {
  if (!user.profile_pic_url || !user.username) return;
  try {
    const idPart = user.profile_pic_id || 'unknown';
    const filename = `${user.username}_${idPart}.jpg`;
    const filepath = path.join(TEMP_FOLDER, filename);

    const response = await axios.get(user.profile_pic_url, {
      responseType: 'stream'
    });

    await fs.ensureDir(TEMP_FOLDER);
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    console.log(`✅ Downloaded: ${filename}`);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

  } catch (err) {
    console.error(`❌ Error downloading image for ${user.username}:`, err.message);
  }
}

async function fetchAllImages() {
  const users = await loadUsers();
  if (users.length === 0) {
    console.log('No users found in users.json');
    return;
  }

  console.log(`🚀 Fetching images for ${users.length} users with up to 5 concurrent downloads...`);

  await Promise.all(
    users.map(user => limit(() => downloadImage(user)))
  );
}

fetchAllImages();

cron.schedule('*/2 * * * * *', () => {
  console.log('⏰ Scheduled Fetch: Fetching images again...');
  fetchAllImages();
});
