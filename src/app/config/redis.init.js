const { createClient } = require("redis");
const client = createClient({
  url: "redis://:kSaRNoWEuHyaGPcGboSxlNOot73FWkEE@redis-13568.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:13568",
});

client.on("error", (err) => {
  console.log("Redis Client Error", err);
});
(async () => {
  await client.connect();
})();

module.exports = client;
