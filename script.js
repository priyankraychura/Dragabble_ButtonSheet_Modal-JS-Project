const showModalBtn = document.querySelector(".show-modal");
const bottomSheet = document.querySelector(".bottom-sheet");
const sheetOverlay = document.querySelector(".sheet-overlay");
const sheetContent = document.querySelector(".content");
const dragIcon = document.querySelector(".drag-icon");

// Gobal varibales for tracking events
let isDragging = false, startY, startHeight;

const showBottomSheet = () => {
    bottomSheet.classList.add("show");
    document.body.style.overflowY = "hidden";
    updateSheetHeight(50)
}
const hideBottomSheet = () => {
    bottomSheet.classList.remove("show");
    document.body.style.overflowY = "auto";
}

const updateSheetHeight = (height) => {
    sheetContent.style.height = `${height}vh`; // Updates the height of the sheet content

    // Toggles the fullscreen class to bottomsheet if the height is equal to 100
    bottomSheet.classList.toggle("fullscreen", height === 100);
}

const dragStart = (e) => {
    isDragging = true;
    startY = e.pageY || e.touches?.[0].pageY;
    startHeight = parseInt(sheetContent.style.height);
    bottomSheet.classList.add("dragging");
}

// Calculates  the new height for the sheet content and call the updateSheetHeight function
const dragging = (e) => {
    if(!isDragging) return;
    const delta = startY - (e.pageY || e.touches?.[0].pageY);
    const newHeight = startHeight + delta / window.innerHeight * 100;
    updateSheetHeight(newHeight);
}

// Determines whether to hide, set to fullscreen, or set to default
// Height based on the current height of the sheet content
const dragStop = () => {
    isDragging = false;
    bottomSheet.classList.remove("dragging");
    const sheetHeight = parseInt(sheetContent.style.height);
    sheetHeight < 25 ? hideBottomSheet() : sheetHeight > 75 ? updateSheetHeight(100) : updateSheetHeight(50);
}

document.addEventListener("mouseup", dragStop);
dragIcon.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", dragging);

document.addEventListener("touchend", dragStop);
dragIcon.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", dragging);

showModalBtn.addEventListener('click', showBottomSheet);
sheetOverlay.addEventListener('click', hideBottomSheet);