const cube = $(".cube");

$(".pagination li").on("click", function () {
  if ($(this).hasClass("on")) return;
  $(this).addClass("on").siblings("li").removeClass("on");

  const tx = $(this).data("rotationX");
  const ty = $(this).data("rotationY");

  gsap.to(cube, { rotateX: tx, rotateY: ty, ease: "back.inOut", duration: 1 });
});

const w = 1200;
const total = $(".carousel .face").length;
console.log(total);
const angle = 360 / total;
const tz = Math.ceil(w / 2 / Math.tan(Math.PI / total));

$(".carousel").css({ transform: `translateZ(-${tz}px)` });

$(".carousel .face").each(function (idx, item) {
  $(item).css({ transform: `rotateY(${angle * idx}deg) translateZ(${tz}px)` });
});
