const codeBlock = document.querySelector(".codeblock");
codeBlock.addEventListener("click", copy);
function copy() {
  navigator.clipboard.writeText(
    "sh <(curl -s https://raw.githubusercontent.com/zap-zsh/zap/master/install.sh)"
  );
  document.getElementById("test").style.display = "block";
  setTimeout(function () {
    document.getElementById("test").style.display = "none";
  }, 2000);
}
