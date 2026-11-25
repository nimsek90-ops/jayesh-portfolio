async function submit() {
  const host = "jayesh-portfolio-vert.vercel.app";
  const key = "d7e8b9f1a2c34d5e6f7a8b9c0d1e2f3a";
  const keyLocation = `https://${host}/${key}.txt`;

  const urlList = [
    `https://${host}/`,
    `https://${host}/#about`,
    `https://${host}/#skills`,
    `https://${host}/#projects`,
    `https://${host}/#experience`,
    `https://${host}/#education`,
    `https://${host}/#leadership`,
    `https://${host}/#achievements`,
    `https://${host}/#services`,
    `https://${host}/#heritage`,
    `https://${host}/#faq`,
    `https://${host}/#blog`,
    `https://${host}/#resume`,
    `https://${host}/#contact`,
    `https://${host}/#comments`,
  ];

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          host,
          key,
          keyLocation,
          urlList,
        }),
      });
      console.log(`IndexNow [${endpoint}] status:`, res.status);
    } catch (err) {
      console.log(`IndexNow [${endpoint}] error:`, err.message);
    }
  }
}

submit();
