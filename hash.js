const bcrypt = require('bcrypt');

// sync, genSaltSync

//async. Get promise, await, then get salt. Needs to be wrapped in async function
async function run() {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash('1234', salt);
  console.log('\n', salt);
  console.log('\n', hashed);
}
run();