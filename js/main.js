// C&J Projects — shared page scripts

// current year in the footer
var yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// mobile nav
var toggle = document.querySelector(".nav-toggle");
var nav = document.querySelector("nav.main");
if (toggle && nav) {
  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
}

// hero background slider (home page)
var slides = document.querySelectorAll(".hero .bg");
var dotsBox = document.querySelector(".hero .dots");
if (slides.length > 1 && dotsBox) {
  var current = 0;
  slides.forEach(function (_, i) {
    var dot = document.createElement("button");
    if (i === 0) dot.className = "on";
    dot.addEventListener("click", function () { goTo(i); });
    dotsBox.appendChild(dot);
  });
  var dots = dotsBox.querySelectorAll("button");
  function goTo(i) {
    slides[current].classList.remove("show");
    dots[current].classList.remove("on");
    current = i;
    slides[current].classList.add("show");
    dots[current].classList.add("on");
  }
  setInterval(function () { goTo((current + 1) % slides.length); }, 6000);
}

// count-up stats (home page)
var counters = document.querySelectorAll("[data-count]");
if (counters.length && "IntersectionObserver" in window) {
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      seen.unobserve(entry.target);
      var el = entry.target;
      var target = parseInt(el.getAttribute("data-count"), 10);
      var start = null;
      function tick(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1200, 1);
        el.textContent = Math.round(target * p);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }, { threshold: .6 });
  counters.forEach(function (el) { seen.observe(el); });
}

// gallery filters (projects page)
var filterBtns = document.querySelectorAll(".filters button");
var tiles = document.querySelectorAll("#gallery .tile");
filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) { b.classList.remove("on"); });
    btn.classList.add("on");
    var want = btn.getAttribute("data-filter");
    tiles.forEach(function (tile) {
      var show = want === "all" || tile.getAttribute("data-cat") === want;
      tile.style.display = show ? "" : "none";
    });
  });
});

// lightbox (projects page)
var lightbox = document.getElementById("lightbox");
if (lightbox) {
  var lbImg = lightbox.querySelector("img");
  var lbCap = lightbox.querySelector(".lb-cap");
  tiles.forEach(function (tile) {
    tile.addEventListener("click", function () {
      var img = tile.querySelector("img");
      var cap = tile.querySelector("figcaption");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCap.textContent = cap ? cap.textContent : "";
      lightbox.classList.add("open");
    });
  });
  lightbox.addEventListener("click", function (e) {
    if (e.target !== lbImg) lightbox.classList.remove("open");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") lightbox.classList.remove("open");
  });
}

// quote form -> WhatsApp (contact page)
var quoteForm = document.querySelector("form.quote");
if (quoteForm) {
  quoteForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("q-name").value.trim();
    var phone = document.getElementById("q-phone").value.trim();
    var service = document.getElementById("q-service").value;
    var msg = document.getElementById("q-msg").value.trim();
    var text =
      "Hi C&J Projects, I would like a quotation.\n" +
      "Name: " + name + "\n" +
      (phone ? "Phone: " + phone + "\n" : "") +
      "Service: " + service +
      (msg ? "\nDetails: " + msg : "");
    window.open("https://wa.me/263784551234?text=" + encodeURIComponent(text), "_blank");
  });
}
