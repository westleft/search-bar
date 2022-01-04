const input = document.querySelector('input');
let detail = document.querySelector('.detail');
let data;

input.addEventListener('keyup',()=>{
    data.forEach(item => {
        detail.innerHTML += `
            <p class="result">${item.title}</p>
        `
    });
})


fetch('data.php', {})
  .then((response) => {
    // 這裡會得到一個 ReadableStream 的物件
    console.log(response);
    // 可以透過 blob(), json(), text() 轉成可用的資訊
    return response.json(); 
  }).then((jsonData) => {
    console.log(jsonData);
    data = jsonData;
  }).catch((err) => {
    console.log('錯誤:', err);
});