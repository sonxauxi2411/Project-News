"use strict";

const newsContainer = document.getElementById("news-container");
const nextBtn = document.getElementById("btn-next");
const prevBtn = document.getElementById("btn-prev");
const pageNum = document.getElementById("page-num");

//khai bào hàm để lấy api news với tham số là country và page
const newsData = async function (country, page = 10) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&page=${page}&pageSize=${currentUser.pageSize}&apiKey=59c9820e9daf45fa8ce818709a42f2a3`
    );
    const data = await res.json();
    //hàm với tham số data để lấy giá trị của nó
    displayNew(data);
  } catch (err) {
    //thông báo lỗi
    alert("err", err.message);
  }
};

newsData("us", 1);

//sự kiện click next qua trang mới
//pageNum.textContent : số trang
nextBtn.addEventListener("click", function () {
  //gán page = ++pageNum.textContent, click vào tăng lên 1
  newsData("us", ++pageNum.textContent);
});
//sự kiện click prev
prevBtn.addEventListener("click", function () {
  newsData("us", --pageNum.textContent);
});

//xoá  prev khi trang 1
//ko cần so sánh bản chất của nó nên dùng ==
const checkPrev = function () {
  if (pageNum.textContent == 1) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }
};

//xoá next khi max
const checkNext = function () {
  //hàm checkNext nằm trong displayNew nên có thể lấy giá trị từ data
  console.log(totalResults);
  //sự dụng Math.ceil lấy giá trị nguyên gần nhất
  let maxPage = Math.ceil(totalResults / currentUser.pageSize);

  //khi có giá trị maxPage xem có = với pageNum ko
  if (maxPage == pageNum.textContent) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
};
//khai báo biến ngoài để lấy giá trị trong data
let totalResults;
//displayNew lấy tham số data
function displayNew(data) {
  totalResults = data?.totalResults;
  checkPrev();
  checkNext();
  let html = "";
  //vòng lập for với data.articles để lấy ra từng bản tin
  //với items từng bản tin
  data?.articles?.forEach((items) => {
    //lấy items gán vào html
    html += `<div class= 'py-2' style="width:100%">
    <div class="row p-2 border">
    <div class="col-md-4 "  >
      <img
        src="${items?.urlToImage ? items?.urlToImage : null}"
        alt=""
        width="100%"
      />
    </div>
    <div class="col-md-8  ">
      <h5>${items?.title}</h5>
      <p>${items?.description ? items?.description : ""}</p>
      <a href="${items.url}" target="_blank" class="btn btn-primary">view</a>
    </div>
  </div>
    </div>`;
    //đưa html vào newsContainer để hiện bản tin
    newsContainer.innerHTML = html;
  });
}
