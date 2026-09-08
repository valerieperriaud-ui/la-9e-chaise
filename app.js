(() => {
  "use strict";

  const data = window.content;
  if (!data) return;

  const $ = (selector) => document.querySelector(selector);
  const screens = {
    intro: $("#intro-screen"),
    conversation: $("#conversation-screen"),
    feedback: $("#feedback-screen"),
    final: $("#final-screen")
  };

  const state = {
    step: 0,
    answers: [],
    feedback: "",
    inReaction: false,
    analyticsReady: false,
    completionTracked: false
  };

  const consentKey = "la-9e-chaise-analytics-consent";

  const setText = (selector, value) => {
    const element = $(selector);
    if (element) element.textContent = value;
  };

  function setScreen(name) {
    Object.entries(screens).forEach(([key, screen]) => {
      screen.hidden = key !== name;
      screen.classList.remove("is-entering");
    });
    const active = screens[name];
    requestAnimationFrame(() => active.classList.add("is-entering"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function portraitStyle(element, characterKey) {
    const character = data.characters[characterKey];
    element.style.backgroundImage = `url("${character.image}")`;
    element.style.backgroundPosition = "center";
    element.setAttribute("aria-label", `Portrait de ${character.name}`);
  }

  function makeButton(label, className, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = label;
    button.addEventListener("click", onClick);
    return button;
  }

  function loadAnalytics() {
    const measurementId = data.analytics?.measurementId;
    if (!measurementId || state.analyticsReady) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
    state.analyticsReady = true;
  }

  function trackEvent(name) {
    if (!state.analyticsReady || typeof window.gtag !== "function") return;
    window.gtag("event", name);
  }

  function renderAnalyticsConsent() {
    const panel = $("#analytics-consent");
    if (!panel || !data.analytics?.measurementId) return;

    setText("#analytics-consent-title", data.analytics.title);
    setText("#analytics-consent-text", data.analytics.text);
    setText("#analytics-accept", data.analytics.accept);
    setText("#analytics-refuse", data.analytics.refuse);

    const consent = localStorage.getItem(consentKey);
    if (consent === "granted") {
      loadAnalytics();
      return;
    }
    if (consent !== "denied") panel.hidden = false;
  }

  function setAnalyticsConsent(value) {
    localStorage.setItem(consentKey, value);
    $("#analytics-consent").hidden = true;
    if (value === "granted") loadAnalytics();
  }

  function renderIntro() {
    setText("#app-name", data.intro.appName);
    setText("#intro-title", data.intro.title);
    setText("#intro-text", data.intro.text);
    setText("#start-button", data.intro.button);
    setText("#privacy-note", data.intro.privacy);
    $("#start-button").addEventListener("click", () => {
      state.step = 0;
      state.answers = [];
      state.feedback = "";
      state.inReaction = false;
      state.completionTracked = false;
      trackEvent("experience_start");
      renderStep();
      setScreen("conversation");
      setTimeout(() => $("#choices button")?.focus(), 150);
    });
  }

  function updateBackButton() {
    const backButton = $("#back-button");
    backButton.hidden = !state.inReaction && state.step === 0;
    setText("#back-button", data.controls.back);
  }

  function renderStep() {
    const step = data.steps[state.step];
    const character = data.characters[step.speaker];
    const choices = $("#choices");

    state.inReaction = false;
    $("#reaction-panel").hidden = true;
    $("#dialogue-panel").hidden = false;
    $("#custom-answer").hidden = true;
    choices.hidden = false;
    choices.replaceChildren();

    portraitStyle($("#speaker-portrait"), step.speaker);
    setText("#speaker-name", character.name);
    setText("#progress", `${state.step + 1} / ${data.steps.length}`);
    setText("#speaker-line", step.line);
    setText("#speaker-question", step.question);

    step.answers.forEach((answer) => {
      choices.append(makeButton(
        answer.text,
        "pebble-button pebble-button--choice",
        () => chooseAnswer(answer)
      ));
    });

    choices.append(makeButton(
      data.controls.customAnswer,
      "text-button text-button--custom",
      openCustomAnswer
    ));

    updateBackButton();
  }

  function openCustomAnswer() {
    const step = data.steps[state.step];
    $("#choices").hidden = true;
    $("#custom-answer").hidden = false;
    setText("#custom-label", step.custom.label);
    $("#custom-text").placeholder = step.custom.placeholder;
    $("#custom-text").value = "";
    setText("#custom-submit", data.controls.customSubmit);
    setText("#custom-cancel", data.controls.customCancel);
    $("#custom-submit").disabled = true;
    $("#custom-text").focus();
  }

  function closeCustomAnswer() {
    $("#custom-answer").hidden = true;
    $("#choices").hidden = false;
    $("#choices button").focus();
  }

  function chooseAnswer(answer) {
    rememberAnswer(answer.text);
    showReaction(answer.reaction);
  }

  function submitCustomAnswer() {
    const text = $("#custom-text").value.trim();
    if (!text) return;
    rememberAnswer(text);
    showReaction(data.steps[state.step].custom.reaction);
  }

  function rememberAnswer(answer) {
    const step = data.steps[state.step];
    state.answers[state.step] = {
      name: data.characters[step.speaker].name,
      question: step.question,
      answer
    };
  }

  function showReaction(reaction) {
    const character = data.characters[reaction.speaker];
    state.inReaction = true;
    $("#dialogue-panel").hidden = true;
    $("#reaction-panel").hidden = false;
    portraitStyle($("#reaction-portrait"), reaction.speaker);
    setText("#reaction-name", character.name);
    setText("#reaction-text", reaction.text);
    setText(
      "#continue-button",
      state.step === data.steps.length - 1 ? data.controls.finish : data.controls.continue
    );
    updateBackButton();
    setTimeout(() => $("#continue-button").focus(), 100);
  }

  function goBackInConversation() {
    if (state.inReaction) {
      renderStep();
      setTimeout(() => $("#choices button")?.focus(), 100);
      return;
    }

    if (state.step > 0) {
      state.step -= 1;
      renderStep();
      setTimeout(() => $("#choices button")?.focus(), 100);
    }
  }

  function returnToLastQuestion() {
    state.step = data.steps.length - 1;
    renderStep();
    setScreen("conversation");
    setTimeout(() => $("#choices button")?.focus(), 150);
  }

  function continueConversation() {
    if (state.step < data.steps.length - 1) {
      state.step += 1;
      renderStep();
      $("#conversation-screen").classList.remove("is-entering");
      requestAnimationFrame(() => $("#conversation-screen").classList.add("is-entering"));
      setTimeout(() => $("#choices button").focus(), 140);
      return;
    }
    renderFeedback();
    setScreen("feedback");
    setTimeout(() => $("#feedback-text").focus(), 180);
  }

  function renderFeedback() {
    setText("#feedback-eyebrow", data.feedback.eyebrow);
    setText("#feedback-name", data.feedback.name);
    setText("#feedback-question", data.feedback.question);
    setText("#feedback-label", data.feedback.label);
    setText("#feedback-privacy", data.feedback.privacy);
    setText("#feedback-send", data.feedback.send);
    setText("#feedback-skip", data.feedback.skip);
    setText("#feedback-back", data.controls.feedbackBack);
    $("#feedback-text").placeholder = data.feedback.placeholder;
    $("#feedback-text").value = state.feedback;
    $("#feedback-send").disabled = state.feedback.trim().length === 0;
  }

  function showFinalScreen() {
    if (!state.completionTracked) {
      trackEvent("experience_complete");
      state.completionTracked = true;
    }
    renderFinal();
    setScreen("final");
    setTimeout(() => $("#final-actions a, #final-actions button")?.focus(), 180);
  }

  function buildFeedbackEmail() {
    const answers = state.answers.map((item, index) => [
      `${index + 1}. ${item.name}`,
      item.question,
      `Réponse : ${item.answer}`
    ].join("\n"));

    return [
      "Bonjour Valérie,",
      "",
      "Voici mes réponses à l’expérience La 9e chaise :",
      "",
      answers.join("\n\n"),
      "",
      `9. ${data.feedback.name}`,
      data.feedback.question,
      `Réponse : ${state.feedback}`
    ].join("\n");
  }

  function sendFeedbackEmail() {
    const feedback = $("#feedback-text").value.trim();
    if (!feedback) return;
    state.feedback = feedback;
    const mailto = `mailto:${data.feedback.email}?subject=${encodeURIComponent(data.feedback.subject)}&body=${encodeURIComponent(buildFeedbackEmail())}`;
    showFinalScreen();
    window.location.href = mailto;
  }

  function renderFinal() {
    setText("#final-eyebrow", data.final.eyebrow);
    setText("#final-title", data.final.title);
    setText("#final-reflection", data.final.text);
    setText("#review-questions", data.controls.review);
    setText("#share-title", data.share.title);
    renderFinalActions();
    renderShareActions();
  }

  function renderFinalActions() {
    const container = $("#final-actions");
    container.replaceChildren();

    data.final.actions.forEach((action) => {
      const href = data.links[action.link];
      const className = `pebble-button final-action final-action--${action.style}`;
      if (href) {
        const link = document.createElement("a");
        link.className = className;
        link.href = href;
        if (!href.startsWith("mailto:")) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        if (action.link === "amazon") {
          link.addEventListener("click", () => trackEvent("amazon_click"));
        }
        link.textContent = action.label;
        container.append(link);
      } else {
        container.append(makeButton(action.label, className, () => showStatus(data.share.missingLink)));
      }
    });
  }

  function renderShareActions() {
    const container = $("#share-actions");
    const pageUrl = data.links.public;
    const shareText = data.share.text;
    container.replaceChildren();

    const pointerRow = document.createElement("div");
    pointerRow.className = "share-pointer-row";
    const pointer = document.createElement("span");
    pointer.className = "share-pointer";
    pointer.textContent = data.share.native;
    pointerRow.append(pointer);
    container.append(pointerRow);

    const whatsapp = document.createElement("a");
    whatsapp.className = "share-button share-button--whatsapp";
    whatsapp.href = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${pageUrl}`)}`;
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener noreferrer";
    whatsapp.textContent = data.share.whatsapp;
    container.append(whatsapp);

    const facebook = document.createElement("a");
    facebook.className = "share-button share-button--facebook";
    facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    facebook.target = "_blank";
    facebook.rel = "noopener noreferrer";
    facebook.textContent = data.share.facebook;
    container.append(facebook);

    container.append(makeButton(
      data.share.tiktok,
      "share-button share-button--tiktok",
      () => copyForNetwork(data.share.tiktok)
    ));

    container.append(makeButton(
      data.share.instagram,
      "share-button share-button--instagram",
      () => copyForNetwork(data.share.instagram)
    ));

    container.append(makeButton(data.share.copy, "share-button", copyPageLink));
  }

  async function copyForNetwork(network) {
    try {
      await navigator.clipboard.writeText(`${data.share.text} ${data.links.public}`);
      showStatus(data.share.copiedForNetwork.replace("{network}", network));
    } catch {
      showStatus(data.share.copyFailed);
    }
  }

  async function copyPageLink() {
    try {
      await navigator.clipboard.writeText(data.links.public);
      showStatus(data.share.copied);
    } catch {
      showStatus(data.share.copyFailed);
    }
  }

  function showStatus(message) {
    setText("#status-message", message);
    window.setTimeout(() => setText("#status-message", ""), 4000);
  }

  $("#custom-text").addEventListener("input", (event) => {
    $("#custom-submit").disabled = event.target.value.trim().length === 0;
  });
  $("#custom-cancel").addEventListener("click", closeCustomAnswer);
  $("#custom-submit").addEventListener("click", submitCustomAnswer);
  $("#back-button").addEventListener("click", goBackInConversation);
  $("#continue-button").addEventListener("click", continueConversation);
  $("#feedback-text").addEventListener("input", (event) => {
    state.feedback = event.target.value;
    $("#feedback-send").disabled = state.feedback.trim().length === 0;
  });
  $("#feedback-send").addEventListener("click", sendFeedbackEmail);
  $("#feedback-skip").addEventListener("click", showFinalScreen);
  $("#feedback-back").addEventListener("click", returnToLastQuestion);
  $("#review-questions").addEventListener("click", returnToLastQuestion);
  $("#analytics-accept").addEventListener("click", () => setAnalyticsConsent("granted"));
  $("#analytics-refuse").addEventListener("click", () => setAnalyticsConsent("denied"));

  renderIntro();
  renderAnalyticsConsent();
  setScreen("intro");
})();
