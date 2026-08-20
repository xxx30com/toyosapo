// 電話番号はスクレイパー対策のためHTMLソースに直接書かず、ここで組み立てる。
// data-tel を持つ a要素に href を設定し、.js-tel-num に表示用番号を差し込む。
// 番号を変更するときは下の反転文字列を書き換える（表示したい番号を逆順にした文字列）。
document.addEventListener('DOMContentLoaded', function () {
  var disp = '1214-9257-090'.split('').reverse().join('');
  var raw = disp.replace(/-/g, '');
  document.querySelectorAll('a[data-tel]').forEach(function (a) {
    a.setAttribute('href', 'tel:' + raw);
  });
  document.querySelectorAll('.js-tel-num').forEach(function (el) {
    el.textContent = disp;
  });
});
