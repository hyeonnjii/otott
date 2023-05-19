const { Builder, By, until } = require('selenium-webdriver'); //모듈 불러오기
const { Navigation } = require('selenium-webdriver/lib/webdriver');

// 시스템 잠시 멈추는 함수
function wait(sec) {
  let start = Date.now(),
    now = start;
  while (now - start < sec * 1000) {
    now = Date.now();
  }
}

// 해당 요소를 찾을 때까지 기다렸다가 반환
function find(driver, css) {
  return driver.wait(until.elementLocated(By.css(css)));
}
// 해당 요소를 모두 찾을 때까지 기다렸다가 반환
function findAll(driver, css) {
  return driver.wait(until.elementsLocated(By.css(css)));
}

const watcha = 'https://pedia.watcha.com/ko-KR';

(async function myFunction() {
  let driver = await new Builder().forBrowser('chrome').build(); //가상 브라우저 빌드
  try {
    // await driver.get(kinolights);
    // await driver.executeScript('window.open()');

    // var tabs = await driver.getAllWindowHandles(); // 탭리스트 가져오기
    // await driver.switchTo().window(tabs[1]);
    // await new Navigation(driver).to(watcha);

    await driver.get(watcha);

    // #### 검색바 ####
    var search = await driver.findElement(By.name('searchKeyword'));
    await search.sendKeys('시그널');
    await search.submit();

    // #### 검색한 첫 번째 작품 ####
    var product = find(
      driver,
      '#root > div > div.css-1xm32e0 > section > section > div.css-ipmqep-StyledTabContentContainer.e1szkzar3 > div.css-12hxjcc-StyledHideableBlock.e1pww8ij0 > section > section.css-1s4ow07 > div > div.css-awu20a > div > ul > li:nth-child(1)'
    );
    await product.click();

    // #### 작품 상단 제목 ####
    var title = await find(
      driver,
      '#root > div > div.css-1xm32e0 > section > div > div.css-10ofaaw > div > section > div.css-1p7n6er-Pane.e1svyhwg15 > div > div > div > div > h1'
    ).getText();
    console.log(title);

    // #### 작품 상단 정보 ####
    var detail = await find(
      driver,
      '#root > div > div.css-1xm32e0 > section > div > div.css-10ofaaw > div > section > div.css-1p7n6er-Pane.e1svyhwg15 > div > div > div > div > div.css-11h0kfd-Detail.e1svyhwg18'
    ).getText();
    console.log(detail);

    // #### 작품 상단 평점 ####
    var rating = await find(
      driver,
      '#root > div > div.css-1xm32e0 > section > div > div.css-10ofaaw > div > section > div.css-1p7n6er-Pane.e1svyhwg15 > div > div > div > div > div.css-og1gu8-ContentRatings.e1svyhwg20'
    ).getText();
    console.log(rating);

    // #### 작품 상세 정보 ####
    var infoTitle = await find(driver, '.css-wvh1uf-Summary').getText();
    console.log(infoTitle);

    // #### 더보기 버튼 클릭 ####
    var showInfo = await find(driver, '.css-1ugqy9j');
    await showInfo.click();

    // #### 작품 내용 ####
    var info = await find(driver, '.css-17t919k-SummaryDetail').getText();
    console.log(info);
    await new Navigation(driver).back();

    // #### 감상 가능한 곳 ####
    var ottList = [];
    var externalServiceTitles = await driver.findElements(
      By.className('externalServiceTitles')
    );
    for (var i = 0; i < externalServiceTitles.length; i++) {
      ottList.push(
        await externalServiceTitles[i].findElement(By.css('div')).getText()
      );
    }
    // 빈 문자열 제거
    ottList = ottList.filter(function (element) {
      return element !== '';
    });
    console.log(ottList);
  } finally {
    // 가상 브라우저 종료
    await driver.quit();
  }
})();
