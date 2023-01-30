
function printPictures(pics) {
  const imgn = document.querySelector('.pictures');
  let str = '';

  for (let pic of pics) {
    let imgstr = `<div class='imgd'>
                    <img src=${pic.download_url}>
                    <p>Автор: ${pic.author}</p>
                  </div>`;
    str += imgstr;
  };
  
  imgn.innerHTML = str;
};


function checkValidInputs(strnum, imglim) {
  const strn = document.querySelector('.info');
  const imgn = document.querySelector('.pictures');
  imgn.innerHTML = '';

  let bothInpIsInvalids = [strnum, imglim].every((inpVal) => {
    return isNaN(inpVal) || inpVal < 1 || inpVal > 10
  });
  if (bothInpIsInvalids) {
    strn.innerHTML = '<p>Номер страницы и лимит вне диапазона от 1 до 10</p>';
    localStorage.removeItem('picJson');
    return false;
  };

  if (isNaN(imglim) || imglim < 1 || imglim > 10) {
    strn.innerHTML = '<p>Лимит вне диапазона от 1 до 10</p>';
    localStorage.removeItem('picJson');
    return false;
  };

  if (isNaN(strnum) || strnum < 1 || strnum > 10) {
    strn.innerHTML = '<p>Номер страницы вне диапазона от 1 до 10</p>';
    localStorage.removeItem('picJson');
    return false;
  };

  strn.innerHTML = '';
  return true;
};


function useRequest(url) {
  return fetch(url)
            .then( response => response.json() )
            .catch( error => console.log(error) );
};


async function getPics() {
  const strnum = Number(document.querySelector('.page-num-inp').value);
  const imglim  = Number(document.querySelector('.limit-inp').value);

  if (!checkValidInputs(strnum, imglim)) { return; };
  
  let json = await useRequest(`https://picsum.photos/v2/list?page=${strnum}&limit=${imglim}`);
  localStorage.setItem('picJson', JSON.stringify(json));

  printPictures(json);
};


window.onload = () => {
  const storageJson = localStorage.getItem('picJson');
  if (storageJson) {
    picsJson = JSON.parse(storageJson)
    printPictures(picsJson);
    console.log('pics loaded from local storage');
  };
};


const btn = document.querySelector('.btn');

btn.addEventListener('click', () => { getPics() });

 