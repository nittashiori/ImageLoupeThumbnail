const zoomArea = document.querySelector(".zoom-area");
const zoomImage = zoomArea.querySelector("img");
const slidesContainer = document.querySelector(".slides-container");
const targetContainer = document.querySelector(".m-lens-container");
const size = slidesContainer.offsetWidth / 2; // 172
const scale = 500 / size;

const lens = targetContainer.querySelector(".m-lens");
let img = targetContainer.querySelector("img");
targetContainer.addEventListener("mouseenter", () => {
  let image = targetContainer.querySelector("img");
  zoomArea.classList.add("active");
  zoomImage.setAttribute("src", image.src);
  zoomImage.style.width = `${image.offsetWidth * scale}px`;
});

targetContainer.addEventListener("mouseleave", () => {
  zoomArea.classList.remove("active");
});

// ズームエリアが画像領域からできないようにする
let xmax = 0;
let ymax = 0;
img.addEventListener("load", () => {
  xmax = img.offsetWidth - size;
  ymax = img.offsetHeight - size;
});

targetContainer.addEventListener("mousemove", (e) => {
  const rect = targetContainer.getBoundingClientRect();
  let mouseX = e.pageX;
  let mouseY = e.pageY;
  const positionX = rect.left + window.pageXOffset;
  const positionY = rect.top + window.pageYOffset;
  let offsetX = mouseX - positionX; /* コンテナの左上からの相対x座標 */
  let offsetY = mouseY - positionY; /* コンテナの左上からの相対y座標 */
  let left = offsetX - size / 2;
  let top = offsetY - size / 2;
  console.log(left, top);

  if (left > xmax) {
    left = xmax;
  }
  if (top > ymax) {
    top = ymax;
  }
  if (left < 0) {
    left = 0;
  }
  if (top < 0) {
    top = 0;
  }

  lens.style.top = top + "px";
  lens.style.left = left + "px";
  zoomImage.style.marginLeft = -(left * scale) + "px";
  zoomImage.style.marginTop = -(top * scale) + "px";
});

// サムネイル選択処理
const thumbnailItems = document.querySelectorAll(".thumbnail-item");

thumbnailItems.forEach((thumbnailItem) => {
  thumbnailItem.addEventListener("click", () => {
    thumbnailItems.forEach((allItem) => {
      allItem.classList.remove("active");
    });
    thumbnailItem.classList.add("active");
    // zoomImage.setAttribute('src', image.src);
    let thumbnailImage = thumbnailItem.querySelector("img");
    img.setAttribute("src", thumbnailImage.src);
  });
});
