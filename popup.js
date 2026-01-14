document.getElementById("freeBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    const currentUrl = tabs[0].url;

    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        func: () => {
          return document.documentElement.innerHTML.toLowerCase();
        }
      },
      (results) => {
        if (chrome.runtime.lastError) {
          alert("لا يمكن قراءة محتوى الصفحة");
          return;
        }

        const pageSource = results[0].result;

        // 🔍 التحقق من وجود medium.com في السورس
        if (!pageSource.includes("medium.com")) {
          alert("❌ هذا الموقع غير تابع إلى Medium");
          return;
        }

        const newUrl = "https://freedium-mirror.cfd/" + currentUrl;
        chrome.tabs.create({ url: newUrl });
      }
    );
  });
});
