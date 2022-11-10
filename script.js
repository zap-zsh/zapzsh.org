const codeBlock = document.querySelector(".codeblock");
codeBlock.addEventListener("click", copy);
function copy() {
  navigator.clipboard.writeText(
    "sh <(curl -s https://raw.githubusercontent.com/zap-zsh/zap/master/install.sh)"
  ).then(() => {
      document.getElementById("test").style.display = "flex";
      setTimeout(function () {
        document.getElementById("test").style.display = "none";
      }, 2000);
    })
}
