const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

function findTestFiles(directory) {
  const testFiles = [];

  function traverse(dir) {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith(".cy.js")) {
        testFiles.push(fullPath);
      }
    });
  }

  traverse(directory);
  return testFiles;
}

function splitIntoGroups(files, numGroups) {
  const groups = Array.from({ length: numGroups }, () => []);

  files.forEach((file, index) => {
    groups[index % numGroups].push(file);
  });

  return groups;
}

function runGroup(group, groupNumber) {
  return new Promise((resolve, reject) => {
    const specFiles = group.map((file) => file.replace(/\\/g, "/")).join(",");
    const command = `npx cypress run --spec "${specFiles}"`;

    console.log(`\n=== Starting Group ${groupNumber} ===`);
    console.log(`Files: ${group.length}`);

    const child = spawn(command, {
      shell: true,
      stdio: "inherit",
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log(`✓ Group ${groupNumber} completed successfully`);
        resolve();
      } else {
        console.log(`✗ Group ${groupNumber} failed with code ${code}`);
        reject(new Error(`Group ${groupNumber} failed`));
      }
    });
  });
}

async function main() {
  // Get command line arguments
  const numGroups = parseInt(process.argv[2]) || 2;
  const testDir = process.argv[3] || "cypress/e2e";

  console.log(`Finding test files in ${testDir}...`);
  const testFiles = findTestFiles(testDir);

  if (testFiles.length === 0) {
    console.log("No test files found!");
    process.exit(0);
  }

  console.log(`Found ${testFiles.length} test files`);
  console.log(`Splitting into ${numGroups} groups...`);

  const groups = splitIntoGroups(testFiles, numGroups);

  groups.forEach((group, index) => {
    console.log(`\nGroup ${index + 1} (${group.length} files):`);
    group.forEach((file) => {
      console.log(`  ${path.relative(".", file)}`);
    });
  });

  console.log("\n" + "=".repeat(50));
  console.log("Starting parallel test execution...\n");

  const promises = groups.map((group, index) => runGroup(group, index + 1));

  try {
    await Promise.all(promises);
    console.log("\n" + "=".repeat(50));
    console.log("All test groups completed successfully!");
  } catch (error) {
    console.error("\n" + "=".repeat(50));
    console.error("Some test groups failed!");
    process.exit(1);
  }
}

main().catch(console.error);
