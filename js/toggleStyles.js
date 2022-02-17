const themeOneBtn = document.getElementById("1");
const themeTwoBtn = document.getElementById("2");
const themeThreeBtn = document.getElementById("3");
const container = document.querySelector(".container");
const switcher = document.querySelector(".theme__switcher");


switcher.addEventListener("click", applyTheme);


function applyTheme () {
  //clears all theme classes
  container.className = "container";
  //selects a theme class based on the checked radio button
  if(themeOneBtn.checked) {
    container.classList.add("theme1");
  }
  else if(themeTwoBtn.checked) {
    container.classList.add("theme2");
  }
  else if(themeThreeBtn.checked) {
    container.classList.add("theme3");
  }
}