document.addEventListener("DOMContentLoaded", () => {
  const langFromItems = document.querySelectorAll(".lang-from-item");
  const langToItems = document.querySelectorAll(".lang-to-item");
  const langSwap = document.querySelector(".lang-swap");
  const inputText = document.getElementById("input-text");
  const outputText = document.getElementById("output-text");

  let fromLang = "English";
  let toLang = "Vietnamese";

  const translations = [
    {
      from: "English",
      to: "Vietnamese",
      dict: {
        learn: "học",
        eat: "ăn",
        sleep: "ngủ",
      },
    },
    {
      from: "Vietnamese",
      to: "English",
      dict: {
        học: "learn",
        ăn: "eat",
        ngủ: "sleep",
      },
    },
  ];

  function getTranslationDict(from, to) {
    const entry = translations.find(
      (trans) => trans.from === from && trans.to === to
    );
    return entry ? entry.dict : {};
  }

  function translate(text) {
    const dict = getTranslationDict(fromLang, toLang);
    return dict[text.toLowerCase()] || text;
  }

  function updateTranslation() {
    const translatedText = inputText.value
      .split(" ")
      .map((word) => translate(word))
      .join(" ");
    outputText.value = translatedText;
  }

  function updateLanguageSelection() {
    langFromItems.forEach((item) => {
      item.classList.toggle("selected", item.textContent === fromLang);
    });
    langToItems.forEach((item) => {
      item.classList.toggle("selected", item.textContent === toLang);
    });
  }

  function swapLanguages() {
    [fromLang, toLang] = [toLang, fromLang];
    updateLanguageSelection();
    updateTranslation();
  }

  function setFromLanguage(lang) {
    fromLang = lang;
    toLang = lang === "English" ? "Vietnamese" : "English";
    updateLanguageSelection();
    updateTranslation();
  }

  langFromItems.forEach((item) => {
    item.addEventListener("click", () => {
      setFromLanguage(item.textContent);
    });
  });

  langToItems.forEach((item) => {
    item.addEventListener("click", () => {
      toLang = item.textContent;
      updateLanguageSelection();
      updateTranslation();
    });
  });

  langSwap.addEventListener("click", swapLanguages);

  inputText.addEventListener("input", updateTranslation);

  updateLanguageSelection();
});
