const w = 1200;
const total = $(".carousel .face").length;
const angle = 360 / total;
const tz = Math.ceil(w / 2 / Math.tan(Math.PI / total));
let tr = 0;

$(".carousel").css({ transform: `translateZ(-${tz}px)` });

$(".carousel .face").each(function (idx, item) {
  $(item).css({ transform: `rotateY(${angle * idx}deg) translateZ(${tz}px)` });
});

$(window).on("mousewheel", function (e) {
  const wheel = e.originalEvent.deltaY;
  if (wheel > 0) {
    tr -= angle;
  } else {
    tr += angle;
  }
  gsap.to(".carousel", { rotateY: tr });
});

$(".prev").on("click", function () {
  tr += angle;
  gsap.to(".carousel", { rotateY: tr });
});
$(".next").on("click", function () {
  tr -= angle;
  gsap.to(".carousel", { rotateY: tr });
});
