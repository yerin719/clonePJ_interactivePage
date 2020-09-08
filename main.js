const imgElements = document.querySelectorAll(".graphic-item");
const textElements = document.querySelectorAll(".step");
let visibleElement;
let ioIndex;
const io = new IntersectionObserver(handleObserver);

function setIndex() {
  for (let i = 0; i < imgElements.length; i++) {
    io.observe(textElements[i]);
    imgElements[i].dataset.index = i;
    textElements[i].dataset.index = i;
  }
}

function hidingImg() {
  visibleElement.classList.remove("showing");
}

function showingImg(i) {
  visibleElement = imgElements[textElements[i].dataset.index];
  visibleElement.classList.add("showing");
}

function handleScroll() {
  for (let i = ioIndex - 1; i <= ioIndex + 1; i++) {
    if (!textElements[i]) continue;
    console.log(i, textElements.length);
    let rectPosition = textElements[i].getBoundingClientRect().top;
    if (
      rectPosition > window.innerHeight * 0.2 &&
      rectPosition < window.innerHeight * 0.8
    ) {
      console.log(rectPosition);
      hidingImg();
      showingImg(i);
    }
  }
}

function handleObserver(entries, observer) {
  ioIndex = entries[0].target.dataset.index * 1;
}

function handleload() {
  setTimeout(() => scrollTo(0, 0), 100);
}

function init() {
  setIndex();
  showingImg(0);
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleload);
}

init();
