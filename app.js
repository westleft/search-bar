const input = document.querySelector("input");
let detail = document.querySelector(".detail");
let data;
let results;

input.addEventListener("keyup", () => {
  getData();
});

const getData = () => {
  fetch(`data.php?search=${input.value}`, {}) // 傳參數到data.php
    .then((response) => {
      // 這裡會得到一個 ReadableStream 的物件
      //   console.log(response);
      // 可以透過 blob(), json(), text() 轉成可用的資訊
      return response.json();
    })
    .then((jsonData) => {
      detail.innerHTML = "";
      data = jsonData;
      data.forEach((item) => {
        detail.innerHTML += `<p class="result">${item.title}</p>`;
        results = [...document.querySelectorAll(".result")];
        changeText(results);
      });
    })
    .catch((err) => {
      console.log("錯誤:", err);
    });
};

const changeText = (element) => {
  element.forEach((item) => {
    item.addEventListener("click", () => {
      input.value = item.textContent;
      getData();
    });
  });
};