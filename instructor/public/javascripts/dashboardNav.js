var dropdownClass = document.getElementsByClassName("dropdown-btn-class");
var i;

for (i = 0; i< dropdownClass.length; i++) {
  dropdownClass[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    }
    else {
      dropdownContent.style.display = "block";
    }
  });
}
