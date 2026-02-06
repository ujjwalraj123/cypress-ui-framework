
const fs = require("fs");
const path = require("path");

const CONFIG = {
  title: "UR",
  faviconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTE1IiBoZWlnaHQ9IjExNSIgdmlld0JveD0iMCAwIDExNSAxMTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik00Ny41NDcgNS42ODc4NEM0Ny4xMjQ2IDIuNjgxNzggNDkuNDg3MiAwIDUyLjU1NzkgMEg2Mi40MzgyQzY1LjUwODkgMCA2Ny44NzE1IDIuNjgxNzggNjcuNDQ5IDUuNjg3ODRMNjIuNTMwNiA0MC42ODc4QzYyLjE4MzIgNDMuMTU5OCA2MC4wMjMxIDQ1IDU3LjQ5OCA0NUM1NC45NzMgNDUgNTIuODEyOSA0My4xNTk4IDUyLjQ2NTUgNDAuNjg3OEw0Ny41NDcgNS42ODc4NFoiIGZpbGw9IiM3RkJERkYiLz4KPHBhdGggZD0iTTY3LjQ0OSAxMDkuMzEyQzY3Ljg3MTUgMTEyLjMxOCA2NS41MDg5IDExNSA2Mi40MzgyIDExNUg1Mi41NTc5QzQ5LjQ4NzIgMTE1IDQ3LjEyNDYgMTEyLjMxOCA0Ny41NDcxIDEwOS4zMTJMNTIuNDY1NSA3NC4zMTIyQzUyLjgxMjkgNzEuODQwMiA1NC45NzMgNzAgNTcuNDk4IDcwQzYwLjAyMzEgNzAgNjIuMTgzMiA3MS44NDAyIDYyLjUzMDYgNzQuMzEyMkw2Ny40NDkgMTA5LjMxMloiIGZpbGw9IiMwMTdBRkYiLz4KPHBhdGggZD0iTTIyLjM2OTkgMTAxLjg3OEMyMS4xNjk1IDEwMy40NyAxOC44MjU4IDEwMy42MTkgMTcuMzk5MSAxMDIuMTkyTDEyLjgwODUgOTcuNjAxNUMxMS4zODE4IDk2LjE3NDggMTEuNTMwMSA5My44MzEgMTMuMTIzIDkyLjYzMDZMMzEuNjcgNzguNjU0MUMzMi45Nzk5IDc3LjY2NyAzNC44Mzg1IDc3LjgxNTYgMzYuMDExNyA3OC45ODg4QzM3LjE4NDkgODAuMTYyIDM3LjMzMzYgODIuMDIwNyAzNi4zNDY0IDgzLjMzMDZMMjIuMzY5OSAxMDEuODc4WiIgZmlsbD0iIzdGQkRGRiIvPgo8cGF0aCBkPSJNOTIuNjMyIDEzLjEyMDVDOTMuODMyNCAxMS41Mjc2IDk2LjE3NjIgMTEuMzc5MyA5Ny42MDI5IDEyLjgwNkwxMDIuMTkzIDE3LjM5NjZDMTAzLjYyIDE4LjgyMzMgMTAzLjQ3MiAyMS4xNjcgMTAxLjg3OSAyMi4zNjc0TDgzLjMzMiAzNi4zNDM5QzgyLjAyMjEgMzcuMzMxMSA4MC4xNjM0IDM3LjE4MjQgNzguOTkwMiAzNi4wMDkyQzc3LjgxNyAzNC44MzYgNzcuNjY4NCAzMi45Nzc0IDc4LjY1NTUgMzEuNjY3NUw5Mi42MzIgMTMuMTIwNVoiIGZpbGw9IiM3RkJERkYiLz4KPHBhdGggZD0iTTEzLjEyNDQgMjIuMzY5OUMxMS41MzE1IDIxLjE2OTUgMTEuMzgzMiAxOC44MjU4IDEyLjgwOTkgMTcuMzk5MUwxNy40MDA0IDEyLjgwODVDMTguODI3MSAxMS4zODE4IDIxLjE3MDkgMTEuNTMwMSAyMi4zNzEzIDEzLjEyMzFMMzYuMzQ3NyAzMS42Njk5QzM3LjMzNDggMzIuOTc5OCAzNy4xODYyIDM0LjgzODQgMzYuMDEzIDM2LjAxMTZDMzQuODM5OCAzNy4xODQ4IDMyLjk4MTIgMzcuMzMzNSAzMS42NzEzIDM2LjM0NjRMMTMuMTI0NCAyMi4zNjk5WiIgZmlsbD0iIzdGQkRGRiIvPgo8cGF0aCBkPSJNMTAxLjg3OSA5Mi42MzJDMTAzLjQ3MiA5My44MzI0IDEwMy42MjEgOTYuMTc2MiAxMDIuMTk0IDk3LjYwMjlMOTcuNjAzNSAxMDIuMTkzQzk2LjE3NjggMTAzLjYyIDkzLjgzMyAxMDMuNDcyIDkyLjYzMjYgMTAxLjg3OUw3OC42NTYyIDgzLjMzMkM3Ny42NjkxIDgyLjAyMjEgNzcuODE3NyA4MC4xNjM1IDc4Ljk5MDkgNzguOTkwM0M4MC4xNjQxIDc3LjgxNzEgODIuMDIyOCA3Ny42Njg1IDgzLjMzMjYgNzguNjU1NkwxMDEuODc5IDkyLjYzMloiIGZpbGw9IiM3RkJERkYiLz4KPHBhdGggZD0iTTUuNjg3ODQgNjcuNDUxQzIuNjgxNzggNjcuODczNCAtOC42OTQ5ZS0wOCA2NS41MTA4IC0yLjIxMTc0ZS0wNyA2Mi40NDAxTC02LjUzMDU0ZS0wNyA1Mi41NTk5Qy03Ljg3Mjc5ZS0wNyA0OS40ODkyIDIuNjgxNzggNDcuMTI2NiA1LjY4Nzg0IDQ3LjU0OUw0MC42ODc4IDUyLjQ2NzRDNDMuMTU5OCA1Mi44MTQ4IDQ1IDU0Ljk3NDkgNDUgNTcuNUM0NSA2MC4wMjUxIDQzLjE1OTggNjIuMTg1MiA0MC42ODc4IDYyLjUzMjZMNS42ODc4NCA2Ny40NTFaIiBmaWxsPSIjMDE3QUZGIi8+CjxwYXRoIGQ9Ik0xMDkuMzEyIDQ3LjU0OUMxMTIuMzE4IDQ3LjEyNjYgMTE1IDQ5LjQ4OTIgMTE1IDUyLjU1OTlMMTE1IDYyLjQ0MDFDMTE1IDY1LjUxMDggMTEyLjMxOCA2Ny44NzM0IDEwOS4zMTIgNjcuNDUxTDc0LjMxMjIgNjIuNTMyNkM3MS44NDAyIDYyLjE4NTIgNzAgNjAuMDI1MSA3MCA1Ny41QzcwIDU0Ljk3NDkgNzEuODQwMiA1Mi44MTQ4IDc0LjMxMjIgNTIuNDY3NEwxMDkuMzEyIDQ3LjU0OVoiIGZpbGw9IiMwMTdBRkYiLz4KPC9zdmc+Cg==",
  allureimage:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3NiIgaGVpZ2h0PSI3NiIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0idXJsKCNhKSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNTIuOCAxMS4wNzFhOC41NSA4LjU1IDAgMCAxIDEyLjA5Mi4wODRjNi43OCA2Ljg3NCAxMS4wNzEgMTYuMzUzIDExLjA3MSAyNi44MjZhOC41NSA4LjU1IDAgMSAxLTE3LjEgMGMwLTUuNzE0LTIuMzMtMTAuOTUtNi4xNDYtMTQuODE4YTguNTUgOC41NSAwIDAgMSAuMDg0LTEyLjA5MiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PHBhdGggZmlsbD0idXJsKCNiKSIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNMjkuNDMyIDguNTVBOC41NSA4LjU1IDAgMCAxIDM3Ljk4MiAwYzEwLjQ3MyAwIDE5Ljk1MiA0LjI5MSAyNi44MjYgMTEuMDcxQTguNTUgOC41NSAwIDAgMSA1Mi44IDIzLjI0NmMtMy44NjgtMy44MTUtOS4xMDQtNi4xNDYtMTQuODE4LTYuMTQ2YTguNTUgOC41NSAwIDAgMS04LjU1LTguNTUiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGZpbGw9InVybCgjYykiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzcuOTgxQzAgMTcgMTYuOTk5IDAgMzcuOTgxIDBhOC41NSA4LjU1IDAgMCAxIDAgMTcuMUMyNi40NDMgMTcuMSAxNy4xIDI2LjQ0MyAxNy4xIDM3Ljk4MWMwIDUuNzE0IDIuMzMgMTAuOTUgNi4xNDYgMTQuODJhOC41NSA4LjU1IDAgMCAxLTEyLjE3NSAxMi4wMDdDNC4yOTEgNTcuOTM0IDAgNDguNDU1IDAgMzcuOTgxIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBmaWxsPSJ1cmwoI2QpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS4wNzEgNTIuOGE4LjU1IDguNTUgMCAwIDEgMTIuMDkxLS4wODNjMy44NjkgMy44MTUgOS4xMDUgNi4xNDYgMTQuODIgNi4xNDZhOC41NSA4LjU1IDAgMCAxIDAgMTcuMWMtMTAuNDc0IDAtMTkuOTUzLTQuMjkxLTI2LjgyNy0xMS4wNzFBOC41NSA4LjU1IDAgMCAxIDExLjA3IDUyLjgiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGZpbGw9InVybCgjZSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTY3LjQxMyAyOS40MzFhOC41NSA4LjU1IDAgMCAxIDguNTUgOC41NWMwIDIwLjk4My0xNi45OTggMzcuOTgyLTM3Ljk4MSAzNy45ODJhOC41NSA4LjU1IDAgMCAxIDAtMTcuMWMxMS41MzggMCAyMC44ODEtOS4zNDMgMjAuODgxLTIwLjg4MmE4LjU1IDguNTUgMCAwIDEgOC41NS04LjU1IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBmaWxsPSJ1cmwoI2YpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02Ny40MTMgMjkuNDMxYTguNTUgOC41NSAwIDAgMSA4LjU1IDguNTV2MjkuNDMyYTguNTUgOC41NSAwIDAgMS0xNy4xIDBWMzcuOThhOC41NSA4LjU1IDAgMCAxIDguNTUtOC41NSIgY2xpcC1ydWxlPSJldmVub2RkIi8+PGcgY2xpcC1wYXRoPSJ1cmwoI2cpIj48cGF0aCBmaWxsPSJ1cmwoI2gpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01Mi44IDExLjA3MWE4LjU1IDguNTUgMCAwIDEgMTIuMDkyLjA4NGM2Ljc4IDYuODc0IDExLjA3MSAxNi4zNTMgMTEuMDcxIDI2LjgyNmE4LjU1IDguNTUgMCAxIDEtMTcuMSAwYzAtNS43MTQtMi4zMy0xMC45NS02LjE0Ni0xNC44MThhOC41NSA4LjU1IDAgMCAxIC4wODQtMTIuMDkyIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iNjIuNyIgeDI9IjY4LjQiIHkxPSIyMi44IiB5Mj0iMzUuNjI1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iIzdFMjJDRSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzhCNUNGNiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iNjMuNjUiIHgyPSI0Mi4yNzUiIHkxPSIyMi4zMjUiIHkyPSI4LjU1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0VGNDQ0NCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0RDMjYyNiIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjIiB4MT0iOC41NSIgeDI9IjEyLjgyNSIgeTE9IjMzLjI1IiB5Mj0iNTguOSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiMyMkM1NUUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMxNTgwM0QiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZCIgeDE9IjExLjQiIHgyPSIzNC4yIiB5MT0iNTIuNzI1IiB5Mj0iNjkuMzUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjOTRBM0I4Ii8+PHN0b3Agb2Zmc2V0PSIuOTU4IiBzdG9wLWNvbG9yPSIjNjQ3NDhCIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNjQ3NDhCIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImUiIHgxPSI2Ny40NSIgeDI9IjUyLjY5NyIgeTE9IjUyLjY2IiB5Mj0iNjcuNDEzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI0Q5NzcwNiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZCQkYyNCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJmIiB4MT0iNjkuMzUiIHgyPSI3Mi43MzUiIHkxPSIxMjkuMiIgeTI9IjEyOC44NTgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjRkJCRjI0Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkJCRjI0Ii8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImgiIHgxPSI2Mi43IiB4Mj0iNjguNCIgeTE9IjIyLjgiIHkyPSIzNS42MjUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjN0UyMkNFIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+PC9saW5lYXJHcmFkaWVudD48Y2xpcFBhdGggaWQ9ImciPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik01OC45IDI4LjVINzZ2MTlINTguOXoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=",
};

const ALLURE_REPORT_DIR = path.join(process.cwd(), "allure-report");

function customizeIndexHtml() {
  const indexPath = path.join(ALLURE_REPORT_DIR, "index.html");

  if (!fs.existsSync(indexPath)) {
    console.error(" Error: index.html not found at", indexPath);
    return false;
  }

  try {
    let content = fs.readFileSync(indexPath, "utf8");

    // Replace title
    content = content.replace(
      /<title>.*?<\/title>/i,
      `<title>UR-ui-Report</title>`
    );

    // Replace or add favicon
    const faviconRegex = /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*>/gi;
    const newFavicon = `<link rel="icon" href="${CONFIG.faviconUrl}">`;

    if (faviconRegex.test(content)) {
      content = content.replace(faviconRegex, newFavicon);
    } else {
      // Add favicon in head if not exists
      content = content.replace("</head>", `  ${newFavicon}\n</head>`);
    }

    fs.writeFileSync(indexPath, content, "utf8");
    console.log(" index.html customized successfully");
    return true;
  } catch (error) {
    console.error(" Error customizing index.html:", error.message);
    return false;
  }
}

function customizeStylesCss() {
  const stylesPath = path.join(ALLURE_REPORT_DIR, "styles.css");
  if (!fs.existsSync(stylesPath)) {
    console.error("Error: styles.css not found at", stylesPath);
    return false;
  }
  try {
    let content = fs.readFileSync(stylesPath, "utf8");
    const alureImage = CONFIG.allureimage;
    const ttpImage = CONFIG.faviconUrl;

    // Replace image URL
    if (content.includes(alureImage)) {
      content = content.split(alureImage).join(ttpImage);
      console.log("Allure image replaced successfully");
    } else {
      console.warn("Could not find the Allure Image");
    }

    // Replace side-nav styles
    const sideNavRegex = /\.side-nav\s*\{[^}]*\}/g;
    const sideNavHeadRegex = /\.side-nav__head\s*\{[^}]*\}/g;

    const newSideNavStyles = `.side-nav {
  background: #636481ff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  width: 180px;
}`;

    const newSideNavHeadStyles = `.side-nav__head {
  border-bottom: 1px solid #636481ff;
  margin: 16px 0;
  padding-bottom: 5px;
}`;

    if (sideNavRegex.test(content)) {
      content = content.replace(sideNavRegex, newSideNavStyles);
      console.log(".side-nav styles replaced successfully");
    }

    if (sideNavHeadRegex.test(content)) {
      content = content.replace(sideNavHeadRegex, newSideNavHeadStyles);
      console.log(".side-nav__head styles replaced successfully");
    }

    fs.writeFileSync(stylesPath, content, "utf8");
    return true;
  } catch (error) {
    console.error("Error customizing styles.css:", error.message);
    return false;
  }
}

function customizeAppJs() {
  const appJsPath = path.join(ALLURE_REPORT_DIR, "app.js");

  if (!fs.existsSync(appJsPath)) {
    console.error("Error: app.js not found at", appJsPath);
    return false;
  }

  try {
    let content = fs.readFileSync(appJsPath, "utf8");

    const ttpPattern = "Allure";
    const replacement = CONFIG.title;

    if (content.includes(ttpPattern)) {
      content = content.split(ttpPattern).join(replacement);
      fs.writeFileSync(appJsPath, content, "utf8");
      console.log("app.js customized successfully");
      return true;
    } else {
      console.warn("Warning: Could not find allure text pattern in app.js");
      return false;
    }
  } catch (error) {
    console.error("Error customizing app.js:", error.message);
    return false;
  }
}

function customizeSummary() {
  const summjsonPath = path.join(ALLURE_REPORT_DIR, "widgets/summary.json");

  if (!fs.existsSync(summjsonPath)) {
    console.error("Error: summary.json not found at", summjsonPath);
    return false;
  }

  try {
    let content = fs.readFileSync(summjsonPath, "utf-8");

    const target = "Allure";
    const replacement = CONFIG.title;

    if (content.includes(target)) {
      const updated = content.replace(new RegExp(target, "g"), replacement);
      fs.writeFileSync(summjsonPath, updated, "utf-8");

      console.log("summary.json customised successfully");
      return true;
    } else {
      console.warn("Warning: Could not find text 'Allure' in summary.json");
      return false;
    }
  } catch (err) {
    console.error("Error customizing summary.json:", err.message);
    return false;
  }
}

function main() {
  console.log("\nStarting Allure Report Customization...\n");

  // Check if allure-report directory exists
  if (!fs.existsSync(ALLURE_REPORT_DIR)) {
    console.error(" Error: allure-report directory not found!");
    console.log(
      'Please run "npx allure generate allure-results --clean" first.\n'
    );
    process.exit(1);
  }

  const results = {
    indexHtml: customizeIndexHtml(),
    stylesCss: customizeStylesCss(),
    appJs: customizeAppJs(),
    summaryjs: customizeSummary(),
  };

  console.log("\nCustomization Summary:");
  console.log("─────────────────────────");
  console.log(`index.html: ${results.indexHtml ? " Success" : " Failed"}`);
  console.log(`styles.css: ${results.stylesCss ? " Success" : " Failed"}`);
  console.log(`app.js:     ${results.appJs ? " Success" : "Partial"}`);
  console.log(`summary.json:${results.summaryjs ? " Success" : "Partial"}`);
  console.log("─────────────────────────\n");

  if (results.indexHtml && results.stylesCss) {
    console.log(
      "Customization completed! Open allure-report/index.html to view.\n"
    );
  } else {
    console.log("Some customizations failed. Check the errors above.\n");
    process.exit(1);
  }
}

// Run the script
main();
 
