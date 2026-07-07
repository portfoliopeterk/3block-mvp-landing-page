/* 3 Block — Typeform-style application form engine */

(function () {
  "use strict";

  // Paste your deployed Google Apps Script web app URL here.
  // Setup instructions: docs/readme.md
  var SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";

  var form = document.getElementById("grant-form");
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll(".step"));
  var flowSteps = steps.filter(function (s) {
    return s.dataset.step !== "success" && s.dataset.step !== "failure";
  });
  var fieldSteps = flowSteps.filter(function (s) {
    return s.dataset.field;
  });
  var successStep = form.querySelector('[data-step="success"]');
  var failureStep = form.querySelector('[data-step="failure"]');

  var dotsWrap = document.getElementById("form-dots");
  var srCounter = document.getElementById("form-sr-counter");
  var nav = document.getElementById("form-nav");
  var prevBtn = nav.querySelector('[data-action="prev"]');
  var fwdBtn = nav.querySelector('[data-action="fwd"]');

  var current = 0; // index into flowSteps
  var finished = false;
  var submitting = false;

  var dots = fieldSteps.map(function () {
    var d = document.createElement("span");
    d.className = "dot";
    dotsWrap.appendChild(d);
    return d;
  });

  /* ---------------- validation ---------------- */

  var validators = {
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    },
    phone: function (v) {
      var digits = v.replace(/\D/g, "");
      return digits.length >= 7 && digits.length <= 15;
    },
    amount: function (v) {
      var n = Number(v);
      return Number.isFinite(n) && n >= 1 && n <= 250;
    }
  };

  function validateStep(step) {
    var input = step.querySelector(".step-input");
    if (!input) return true;

    var value = input.value.trim();
    var errorEl = step.querySelector(".step-error");
    var message = "";

    if (input.hasAttribute("data-required") && value === "") {
      message = input.dataset.errorEmpty || "This one's required.";
    } else if (value !== "" && input.dataset.type && validators[input.dataset.type]) {
      if (!validators[input.dataset.type](value)) {
        message = input.dataset.errorInvalid || "That doesn't look right.";
      }
    }

    if (message) {
      errorEl.textContent = message;
      step.classList.remove("is-error");
      // restart the shake animation
      void step.offsetWidth;
      step.classList.add("is-error");
      input.focus();
      return false;
    }

    errorEl.textContent = "";
    step.classList.remove("is-error");
    return true;
  }

  /* ---------------- rendering ---------------- */

  function render() {
    flowSteps.forEach(function (step, i) {
      step.classList.toggle("is-active", !finished && i === current);
      step.classList.toggle("is-above", finished || i < current);
    });
    successStep.classList.remove("is-active");
    failureStep.classList.remove("is-active");

    updateChrome();
  }

  function updateChrome() {
    var step = flowSteps[current];

    // index of the current field, -1 on intro
    var idx = step.dataset.field ? fieldSteps.indexOf(step) : -1;

    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-done", finished || i < idx);
      dot.classList.toggle("is-current", !finished && i === idx);
    });

    srCounter.textContent =
      !finished && idx >= 0 && idx < fieldSteps.length
        ? "Question " + (idx + 1) + " of " + fieldSteps.length
        : "";

    prevBtn.disabled = finished || current === 0;
    fwdBtn.disabled = finished || current === flowSteps.length - 1;
    nav.style.display = finished ? "none" : "";
    dotsWrap.style.display = finished ? "none" : "";
  }

  function focusStep() {
    var input = flowSteps[current] && flowSteps[current].querySelector(".step-input");
    if (input) {
      window.setTimeout(function () {
        input.focus({ preventScroll: true });
      }, 60);
    }
  }

  /* ---------------- navigation ---------------- */

  function goNext() {
    if (finished || submitting) return;
    var step = flowSteps[current];
    if (step.dataset.field && !validateStep(step)) return;
    if (current >= flowSteps.length - 1) return;

    current += 1;
    render();
    focusStep();
  }

  function goPrev() {
    if (finished || submitting || current === 0) return;
    current -= 1;
    render();
    focusStep();
  }

  function showFinal(step) {
    finished = true;
    render();
    step.classList.add("is-active");
  }

  /* ---------------- submission ---------------- */

  function submit() {
    if (submitting || finished) return;

    // belt and braces: re-validate everything before sending
    for (var i = 0; i < fieldSteps.length; i++) {
      if (!validateStep(fieldSteps[i])) {
        current = flowSteps.indexOf(fieldSteps[i]);
        render();
        focusStep();
        return;
      }
    }

    var submitBtn = form.querySelector('[data-action="submit"]');
    submitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    function done(ok) {
      submitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Send application";
      showFinal(ok ? successStep : failureStep);
    }

    if (SCRIPT_URL.indexOf("PASTE_") === 0) {
      console.warn(
        "3 Block: no Apps Script URL configured in js/apply.js — " +
          "showing the success screen without sending. See docs/readme.md."
      );
      window.setTimeout(function () { done(true); }, 800);
      return;
    }

    var data = new URLSearchParams();
    fieldSteps.forEach(function (step) {
      var input = step.querySelector(".step-input");
      data.append(step.dataset.field, input.value.trim());
    });

    fetch(SCRIPT_URL, { method: "POST", body: data })
      .then(function (res) {
        done(res.ok);
      })
      .catch(function () {
        done(false);
      });
  }

  function retry() {
    finished = false;
    current = flowSteps.length - 1; // back to the last question
    render();
    focusStep();
  }

  /* ---------------- events ---------------- */

  form.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.dataset.action;
    if (action === "start" || action === "next") goNext();
    if (action === "retry") retry();
    // "submit" buttons trigger the form submit event below
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submit();
  });

  nav.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn || btn.disabled) return;
    if (btn.dataset.action === "prev") goPrev();
    if (btn.dataset.action === "fwd") goNext();
  });

  form.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || finished || submitting) return;

    var inTextarea = e.target.tagName === "TEXTAREA";
    if (inTextarea && !(e.metaKey || e.ctrlKey)) return; // plain Enter = newline

    // on the last question, let Enter submit the form naturally
    if (current === flowSteps.length - 1) return;

    e.preventDefault();
    goNext();
  });

  // live progress as people type
  form.addEventListener("input", function (e) {
    if (e.target.classList.contains("step-input")) {
      var step = e.target.closest(".step");
      var errorEl = step.querySelector(".step-error");
      if (errorEl) errorEl.textContent = "";
      updateChrome();
    }
  });

  render();
})();
