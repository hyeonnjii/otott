// 장르별 시청순 차트 정보를 반영하는 역할

let genreList = ['romance', 'comedy', 'horror', 'sf', 'history', 'family'];

// 문서의 로드가 완료되었을 때 실행 처리
$(document).ready(function () {
  for (var i = 0; i < 6; i++) {
    // 각 장르별 차트 1~10위까지의 요소 html 자동 삽입
    // 1~10위까지의 요소 내용 로컬 스토리지 기반 자동 반영
    for (var j = 1; j <= 10; j++) {
      var productId = genreList[i] + '-' + j;
      var product = JSON.parse(localStorage.getItem(productId));
      var productInfo = JSON.parse(localStorage.getItem(product.title));
      rankElement = `
    <li class="ranking">
      <a href="product.html" title="${product.title}">
        <div class="ranking-icon">${j}</div>
        <img
          src="${product.imgSrc}"
          alt="${j}th-poster"
        />
        <p>
          ${productInfo.title} <br />
          ${productInfo.detail} <br />
          ${productInfo.rating}
        </p>
      </a>
    </li>`;
      document.getElementsByClassName('ranking-listitem')[i].innerHTML +=
        rankElement;
    }
  }
});
