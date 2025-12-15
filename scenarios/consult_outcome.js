const visit = async (page) => {
  await page.goto('http://localhost/outcomes', {
      waitUntil: 'networkidle',
  });
  await page.waitForTimeout(10000);
  await page.scrollToEnd();
  await page.waitForNetworkIdle();
  await page.waitForTimeout(7000);
};

module.exports = visit;
