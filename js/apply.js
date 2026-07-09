/* 3 Block — grant application form: validation + submission */

(function () {
  "use strict";

  // Paste your deployed Google Apps Script web app URL here.
  // Setup instructions: docs/readme.md
  var SCRIPT_URL = "https://script.google.com/a/macros/portfolio.sc/s/AKfycbxkclyFODaclGvQJkDF4OloZd7uS0PqyA-Uz0mo0QHscihpGvGoKhfaTEBBif46QXaxRQ/exec";

  var form = document.getElementById("grant-form");
  if (!form) return;

  var successView = document.getElementById("form-success");
  var failureView = document.getElementById("form-failure");
  var retryBtn = document.getElementById("retry-btn");
  var formError = document.getElementById("form-error");
  var submitBtn = form.querySelector('[data-action="submit"]');

  var submitting = false;

  /* ---------------- validation ---------------- */

  var validators = {
    email: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    }
  };

  function setError(field, message) {
    var errorEl = field.querySelector(".field-error");
    if (errorEl) errorEl.textContent = message;
    field.classList.toggle("has-error", message !== "");
  }

  // Returns true if valid. `field` is a .field div or .field-choice fieldset.
  function validateField(field) {
    var message = "";

    if (field.dataset.choice !== undefined) {
      if (
        field.hasAttribute("data-required") &&
        !field.querySelector("input[type=radio]:checked")
      ) {
        message = field.dataset.errorEmpty || "Pick one.";
      }
    } else {
      var input = field.querySelector(".field-input");
      if (!input) return true;
      var value = input.value.trim();

      if (input.hasAttribute("data-required") && value === "") {
        message = input.dataset.errorEmpty || "This one's required.";
      } else if (value !== "" && input.dataset.type && validators[input.dataset.type]) {
        if (!validators[input.dataset.type](value)) {
          message = input.dataset.errorInvalid || "That doesn't look right.";
        }
      }
    }

    setError(field, message);
    return message === "";
  }

  function focusField(field) {
    var target =
      field.querySelector(".field-input") ||
      field.querySelector("input[type=radio]");
    if (target) target.focus();
    field.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  /* ---------------- submission ---------------- */

  function collectData() {
    var data = new URLSearchParams();
    form.querySelectorAll(".field-input").forEach(function (input) {
      data.append(input.name, input.value.trim());
    });
    form.querySelectorAll(".field-choice").forEach(function (fieldset) {
      var checked = fieldset.querySelector("input[type=radio]:checked");
      data.append(fieldset.dataset.choice, checked ? checked.value : "");
    });
    return data;
  }

  function showResult(ok) {
    form.hidden = true;
    successView.hidden = !ok;
    failureView.hidden = ok;
    (ok ? successView : failureView).scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  }

  function submit() {
    if (submitting) return;

    var fields = Array.prototype.slice.call(form.querySelectorAll(".field"));
    var firstInvalid = null;
    fields.forEach(function (field) {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      formError.textContent = "A few answers need another look — see above.";
      focusField(firstInvalid);
      return;
    }
    formError.textContent = "";

    submitting = true;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    function done(ok) {
      submitting = false;
      submitBtn.disabled = false;
      submitBtn.textContent = "Send application";
      showResult(ok);
    }

    if (SCRIPT_URL.indexOf("PASTE_") === 0) {
      console.warn(
        "3 Block: no Apps Script URL configured in js/apply.js — " +
          "showing the success screen without sending. See docs/readme.md."
      );
      window.setTimeout(function () { done(true); }, 800);
      return;
    }

    fetch(SCRIPT_URL, { method: "POST", body: collectData() })
      .then(function (res) {
        done(res.ok);
      })
      .catch(function () {
        done(false);
      });
  }

  /* ---------------- events ---------------- */

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    submit();
  });

  // clear a field's error as soon as it's edited
  form.addEventListener("input", function (e) {
    var field = e.target.closest(".field");
    if (field) setError(field, "");
    formError.textContent = "";
  });

  if (retryBtn) {
    retryBtn.addEventListener("click", function () {
      failureView.hidden = true;
      form.hidden = false;
      submitBtn.focus();
    });
  }
})();
