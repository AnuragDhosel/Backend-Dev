const os = require("os");
const fs = require("fs");

function logSystemInfo() {
  const cpu = os.cpus()[0].model;
  const totalMemory = (os.totalmem() / (1024 * 1024)).toFixed(2); // MB
  const freeMemory = (os.freemem() / (1024 * 1024)).toFixed(2);   // MB
  const platform = os.platform();

  const log = `
Time: ${new Date().toLocaleString()}
Platform: ${platform}
CPU: ${cpu}
Total Memory: ${totalMemory} MB
Free Memory: ${freeMemory} MB
-----------------------------------
`;

  fs.appendFile("systemLog.txt", log, (err) => {
    if (err) console.log("Error writing log:", err);
    else console.log("✅ Logged system info");
  });
}

// every 5 seconds
setInterval(logSystemInfo, 5000);
