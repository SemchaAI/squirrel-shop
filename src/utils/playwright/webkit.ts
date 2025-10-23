import { devices, webkit } from "playwright";

(async () => {
  const sizes = [
    { name: "Desktop", width: 1920, height: 1080 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Mobile", device: devices["iPhone 13"] },
  ];

  for (const size of sizes) {
    console.log(`Opening WebKit in ${size.name} mode...`);

    const browser = await webkit.launch({ headless: false });
    const context = size.device
      ? await browser.newContext({
          ...size.device,
          deviceScaleFactor: 4,
        })
      : await browser.newContext({
          viewport: { width: size.width, height: size.height },
        });

    const page = await context.newPage();
    await page.goto(process.env.NEXTAUTH_URL || "http://localhost:3000");

    console.log(`Press ENTER to close ${size.name} window and continue...`);
    await new Promise((resolve) => process.stdin.once("data", resolve));

    await browser.close();
  }

  console.log("All done!");
})();
