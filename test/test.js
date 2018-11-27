process.chdir("./test");
const { Client } = require("../src");
const assert = require("assert");
const client = new Client();
const fs = require("fs");

describe("Attempt a login and ensure it's successful", () => {
  it("Run a login attempt", async () => {
    await client.login(process.env.PANDORA_USERNAME || fs.readFileSync("./username").toString(), process.env.PANDORA_PASSWORD || fs.readFileSync("./password").toString());
  });

  it("Check for tokens", () => {
    if (!client.rest.getCSRFToken()) assert.fail("CSRF token is unavailabe!");
    if (!client.user || !client.user.token) assert.fail("User token is unavailable!");
  });
});

describe("Attempt to fetch stations", () => {
  it("Run a station fetch", async () => {
    await client.user.getStations();
  });

  it("Check for required station", () => {
    const station = client.user.stations.first();
    if (!station) assert.fail("The user does not have any stations!");
    if (station.name != "Thumbprint Radio") assert.fail("First station is not Thumbprint Radio!");
  });
});