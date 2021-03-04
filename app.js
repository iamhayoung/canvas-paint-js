const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#35393c"; // 선의 색과 스타일
ctx.lineWidth = 2.5; // 선의 굵기

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 그림을 그리고 있지 않을 때. 경로를 만든다
    ctx.beginPath(); // 경로 생성
    ctx.moveTo(x, y); // 선을 그리는 시작점 좌표
    console.log('aaaa')
  } else {
    // 그림을 그리고 있을 때. 그린다
    ctx.lineTo(x, y); // 선을 그리는 마지막 지점 좌표
    ctx.stroke(); // moveTo와 lineTo로 경로가 정해진 지점에서 선을 그리는 역할을 수행
    console.log('bbb')
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))