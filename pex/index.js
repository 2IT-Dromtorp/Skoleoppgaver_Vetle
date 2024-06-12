const { setupFileWatcher } = require("./filewatcher");

setupFileWatcher("mongodb://localhost:27017", "kantine", "varer", "./new_deliveries");

// ...
