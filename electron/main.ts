import { app, Tray, Menu, nativeImage, shell } from "electron";
import { spawn, ChildProcess } from "child_process";
import path from "path";
import waitOn from "wait-on";

const isDev = process.env.NODE_ENV === "development";
const port = process.env.PORT || 3000;
const url = `http://localhost:${port}`;

let nextServer: ChildProcess | null = null;
let tray: Tray | null = null;

async function startNextServer() {
  return new Promise<void>((resolve, reject) => {
    if (isDev) {
      // In development, start Next.js dev server
      console.log("Starting Next.js dev server...");
      nextServer = spawn("bun", ["run", "dev"], {
        cwd: path.join(__dirname, ".."),
        shell: true,
        stdio: "inherit",
      });

      nextServer.on("error", reject);

      // Wait for dev server to be ready
      waitOn({
        resources: [url],
        timeout: 60000,
      })
        .then(() => {
          console.log("Next.js dev server ready!");
          resolve();
        })
        .catch(reject);
    } else {
      // In production, start standalone server
      console.log("Starting Next.js production server...");
      const standaloneDir = path.join(__dirname, "../.next/standalone");

      nextServer = spawn("node", ["server.js"], {
        cwd: standaloneDir,
        env: {
          ...process.env,
          PORT: String(port),
        },
        stdio: "inherit",
      });

      nextServer.on("error", reject);

      // Wait for production server to be ready
      waitOn({
        resources: [url],
        timeout: 30000,
      })
        .then(() => {
          console.log("Next.js production server ready!");
          resolve();
        })
        .catch(reject);
    }
  });
}

function createSystemTray() {
  // Create tray icon (you'll need to provide icon files)
  const iconPath = isDev
    ? path.join(__dirname, "../public/icons/icon-template.png")
    : path.join(process.resourcesPath, "icons/icon-template.png");

  let image: Electron.NativeImage;

  try {
    image = nativeImage.createFromPath(iconPath);
  } catch {
    // Fallback to a simple icon if file not found
    image = nativeImage.createEmpty();
  }

  tray = new Tray(image);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open Satoshi's Archive",
      click: () => {
        shell.openExternal(url);
      },
    },
    {
      type: "separator",
    },
    {
      label: "About",
      click: () => {
        shell.openExternal("https://github.com/rohenaz/satoshis-archive");
      },
    },
    {
      type: "separator",
    },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip("Satoshi's Archive - Local Server Running");
  tray.setContextMenu(contextMenu);

  // Click tray icon to open app
  tray.on("click", () => {
    shell.openExternal(url);
  });

  console.log("System tray created!");
}

app.on("ready", async () => {
  try {
    console.log("Satoshi's Archive starting...");

    // Start Next.js server
    await startNextServer();

    // Create system tray icon
    createSystemTray();

    console.log(`Application ready! Access at ${url}`);

    // Auto-open browser on first launch
    shell.openExternal(url);
  } catch (error) {
    console.error("Failed to start application:", error);
    app.quit();
  }
});

app.on("will-quit", () => {
  // Clean up: kill Next.js server
  if (nextServer) {
    console.log("Stopping Next.js server...");
    nextServer.kill();
  }
});

app.on("window-all-closed", () => {
  // Don't quit the app when all windows are closed (system tray app)
  // The app keeps running in the background
});

// macOS specific: Prevent app from quitting when closing last window
app.on("activate", () => {
  // On macOS, just open the browser again
  shell.openExternal(url);
});

// Handle unhandled errors
process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
});
