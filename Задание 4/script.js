
function printPicture(picUrl) {
  const divPicture = document.querySelector('.picture');
  let imgstr = `<div class='imgd'>
                    <img src=${picUrl}>
                  </div>`
  divPicture.innerHTML = imgstr;
};


async function getPicture(callback) {
  let picHeight = Number(document.querySelector('.height-inp').value);
  let picWidth  = Number(document.querySelector('.width-inp').value);

  if (picHeight < 100 || picHeight > 300 || picWidth < 100 || picWidth > 300 ) {
    alert('одно из чисел вне диапазона от 100 до 300');
    return;
  };

  let response = await fetch(`https://picsum.photos/${picWidth}/${picHeight}`);
  callback(response.url);
};

const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {getPicture(printPicture)});

