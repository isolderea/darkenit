chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "activate") {
      // Execute your activation script (appOn.js)
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const activeTab = tabs[0];
          const targetTabId = activeTab.id;
          chrome.scripting.executeScript({
            target: { tabId: targetTabId },
            function: () => {
              // Your activation script content (e.g., invert colors)
              document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";
              let media = document.querySelectorAll("img, picture, video");
              media.forEach((mediaItem) => {
                mediaItem.style.filter = "invert(1) hue-rotate(180deg)";
              });
            },
          });
        }
      });
    } else if (message.action === "deactivate") {
      // Execute your deactivation script (super_script.js)
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          const activeTab = tabs[0];
          const targetTabId = activeTab.id;
          chrome.scripting.executeScript({
            target: { tabId: targetTabId },
            function: () => {
              // Your deactivation script content
              document.querySelector("html").style.filter = "invert(0) hue-rotate(0deg)";
              let media = document.querySelectorAll("img, picture, video");
              media.forEach((mediaItem) => {
                  mediaItem.style.filter = "invert(0) hue-rotate(0deg)"
              });
            },
          });
        }
      });
    }
  });
  