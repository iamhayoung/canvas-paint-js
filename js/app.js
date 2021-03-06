const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const modeBtn = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");
const pickerContainer = document.getElementById("jsPickerContainer");
const picker = document.getElementById("jsColorPicker");

const INITIAL_COLOR = "#35393c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR; // 선의 색과 스타일
ctx.fillStyle = INITIAL_COLOR; // 면의 색과 스타일
ctx.lineWidth = 2.5; // 선의 굵기

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  if (filling === false) {
    painting = true;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 그림을 그리고 있지 않을 때. 경로를 만든다
    ctx.beginPath(); // 경로 생성
    ctx.moveTo(x, y); // 선을 그리는 시작점 좌표
  } else {
    // 그림을 그리고 있을 때. 그린다
    ctx.lineTo(x, y); // 선을 그리는 마지막 지점 좌표
    ctx.stroke(); // moveTo와 lineTo로 경로가 정해진 지점에서 선을 그리는 역할을 수행
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

  Array.from(colors).forEach((palette) => {
    palette.classList.remove("selected")
  })

  const selectedColor = event.target;
  selectedColor.classList.add("selected");

}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    // 현재는 선 그리기 모드
    filling = false;
    modeBtn.innerText = "Fill"
    canvas.classList.remove("fillCursor");
  } else {
    // 현재는 필 모드
    filling = true;
    modeBtn.innerText = "Paint"
    canvas.classList.add("fillCursor");
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  // image변수: 캔버스에 그린 내용을 데이터URL로 취득함
  const image = canvas.toDataURL("image/png", 0.7);
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]"; // 다운로드 디폴트 파일명
  link.click();
}

function handleResetClick() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function previewColor(e) {
  const pickedColor = e.target.value;
  pickerContainer.style.background = pickedColor;
  return pickedColor;
}

function pickColor(e) {
  const pickedColor = previewColor(e);
  ctx.strokeStyle = pickedColor;
  ctx.fillStyle = pickedColor;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

// 팔레트의 각각의 색상을 가져옴
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (modeBtn) {
  modeBtn.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (resetBtn) {
  resetBtn.addEventListener("click", handleResetClick);
}

if (pickerContainer) {
  pickerContainer.addEventListener("click", () => {
    picker.click();
  })
}

if (picker) {
  picker.addEventListener("input", previewColor);
  picker.addEventListener("change", pickColor);
}