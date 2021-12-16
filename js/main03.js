let cubeTotal = 0;
const cubeBox = $("#main #cubeBox");
const paginationUl = $(".pagination ul");
let random = 0;
let oldrandom = random;
const cube = `<div class="scene">
<div class="cube">
<div class="face front">B</div>
<div class="face back">E</div>
<div class="face top">T</div>
<div class="face bottom">T</div>
<div class="face left">E</div>
<div class="face right">R</div>
</div>
</div>`;

const famousList = [
  "No pain, No gain",
  "A friend is a second myself",
  "The will of man is his happiness",
  "Only I can change my life, no one can do it for me",
  "This too shall pass away",
  "When in doubt, choose change",
  "Time is flying never to return",
  "Life is all about timing",
  "Don't take your parents for granted",
  "He can do, she can do, why not me?",
  "Don't judge a book by its cover",
];

cubeTotal = 60;

const rotationArray = [
  { tx: 0, ty: 0 },
  { tx: 0, ty: -90 },
  { tx: 0, ty: -180 },
  { tx: 0, ty: 90 },
  { tx: -90, ty: 0 },
  { tx: 90, ty: 0 },
];

function makeCube() {
  let output = "";
  for (let i = 0; i < cubeTotal; i++) {
    // cubeBox.append(cube);
    output += cube;
  }
  cubeBox.html(output);
}

function showTxt(selected) {
  $("#cubeBox .scene").show();
  for (i = 0; i < cubeTotal; i++) {
    if (random === 0) {
      $("#cubeBox .scene").eq(i).find(".front").text(famousList[selected].charAt(i));
    } else if (random === 1) {
      $("#cubeBox .scene").eq(i).find(".right").text(famousList[selected].charAt(i));
    } else if (random === 2) {
      $("#cubeBox .scene").eq(i).find(".back").text(famousList[selected].charAt(i));
    } else if (random === 3) {
      $("#cubeBox .scene").eq(i).find(".left").text(famousList[selected].charAt(i));
    } else if (random === 4) {
      $("#cubeBox .scene").eq(i).find(".top").text(famousList[selected].charAt(i));
    } else if (random === 5) {
      $("#cubeBox .scene").eq(i).find(".bottom").text(famousList[selected].charAt(i));
    }
    if (i >= famousList[selected].length) {
      $("#cubeBox .scene").eq(i).hide();
    }
    // if (i >= famousList[1].length) {
    //   $("#cubeBox .scene").eq(i).hide();
    // }
  }
}

function makePaginationItem() {
  const total = famousList.length;
  let output = "";
  for (let i = 0; i < total; i++) {
    if (i === 0) {
      output += `<li class="on">${i + 1}</li>`;
    } else {
      output += `<li>${i + 1}</li>`;
    }
  }
  paginationUl.html(output);
}

function clickPaginationItem() {
  paginationUl.on("click", "li", function () {
    autoNum = $(this).index();
    if ($(this).hasClass("on")) return;
    $(this).addClass("on").siblings("li").removeClass("on");
    random = Math.floor(Math.random() * 6);
    if (random === oldrandom) {
      random = (random + 1) % 6;
    }
    showTxt($(this).index());
    gsap.to("#cubeBox .scene .cube", {
      rotateY: rotationArray[random].ty,
      rotateX: rotationArray[random].tx,
      z: -40,
      ease: "back.inOut",
      stagger: {
        from: "random",
        each: 0.01,
      },
    });
    oldrandom = random;
  });
}

/*
$.each(famousList, function (idx, item) {
  console.log(item);
  const length = item.length;
  console.log(Math.max(length));
  cubeTotal = Math.max(item.length);
});
console.log(cubeTotal);
*/

function autoAndPause() {
  let clearId;
  $(".auto").on("click", function () {
    $(this).hide().siblings(".pause").show().css({ display: "flex" });
    // display: block or inline-block
    // autoPlay();
    paginationUl.addClass("off");
    clearId = setInterval(autoPlay02, 3000);
    // 3초 뒤에 자동으로 플레이
  });
  $(".pause").on("click", function () {
    $(this).hide().siblings(".auto").show().css({ display: "flex" });
    // display: block or inline-block
    paginationUl.removeClass("off");
    clearInterval(clearId);
  });
}

let autoNum = 0;

function autoPlay() {
  const total = famousList.length;
  autoNum++;
  autoNum = autoNum % total;
  random = Math.floor(Math.random() * 6);
  $(".pagination li").eq(autoNum).addClass("on").siblings("li").removeClass("on");
  if (random === oldrandom) {
    random = (random + 1) % 6;
  }
  showTxt(autoNum);
  gsap.to("#cubeBox .scene .cube", {
    rotateY: rotationArray[random].ty,
    rotateX: rotationArray[random].tx,
    z: -40,
    ease: "back.inOut",
    stagger: {
      from: "random",
      each: 0.01,
    },
  });
  oldrandom = random;
}

function autoPlay02() {
  const total = famousList.length;
  autoNum++;
  autoNum = autoNum % total;
  $(".pagination li").eq(autoNum).trigger("click");
}

makeCube();
showTxt(0);
makePaginationItem();
clickPaginationItem();
autoAndPause();
