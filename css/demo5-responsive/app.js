require('./index.scss');
let htmlDOM = document.getElementsByTagName('html')[0];
function resetHtmlFontSize() {
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    htmlDOM.style.fontSize = htmlWidth / 10 + 'px';
}
resetHtmlFontSize();

window.addEventListener('resize', resetHtmlFontSize);