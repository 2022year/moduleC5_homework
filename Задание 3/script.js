
function printPictures(response) {
  const divPics = document.querySelector('.pictures');
  let pics = '';

  for (let pic of response) {
    html = `<div class='imgd'>
              <img src=${pic.download_url}>
              <p>${pic.author}</p>
            </div>`
    pics += html;
  };
  divPics.innerHTML = pics;
};


function getPictures(callback) {
  let pLimit = Number(document.querySelector('.numInp').value);

  if (pLimit < 1 || pLimit > 10) {
    alert('число вне диапазона от 1 до 10');
    return;
  };

  let xhr = new XMLHttpRequest();
  xhr.open('GET', `https://picsum.photos/v2/list?limit=${pLimit}`);
  xhr.onload = () => {
    if (xhr.status != 200) {
      console.log(`Статус ответа: ${xhr.status}`);
    } else {
      callback(JSON.parse(xhr.response));
    };
  };
  xhr.oneerror = () => {
    console.log(`Ошибка: ${xhr.status}`);
  };
  xhr.send();
};

const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {getPictures(printPictures)});

