chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "fixKeyboard",
    title: "Fix Keyboard Layout",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "fixKeyboard") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: convertText,
    });
  }
});

function convertText() {
  const layoutMap = {
    q: "/",
    w: "'",
    e: "ק",
    r: "ר",
    t: "א",
    y: "ט",
    u: "ו",
    i: "ן",
    o: "ם",
    p: "פ",
    a: "ש",
    s: "ד",
    d: "ג",
    f: "כ",
    g: "ע",
    h: "י",
    j: "ח",
    k: "ל",
    l: "ך",
    ";": "ף",
    z: "ז",
    x: "ס",
    c: "ב",
    v: "ה",
    b: "נ",
    n: "מ",
    m: "צ",
    ",": "ת",
    ".": "ץ",
  };

  let selection = window.getSelection().toString();
  let convertedText = selection
    .split("")
    .map((char) => layoutMap[char] || char)
    .join("");

  navigator.clipboard.writeText(convertedText).then(() => {
    alert("Converted text copied to clipboard:\n " + convertedText);
  });
}
