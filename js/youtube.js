//외부 api서비스 token 값 발행
//외부 api 데이터를 가져오기 위한 url 생성을 위한 api 사용법 숙지
//해당 api 요청 url로 fetch 함수를 이용하여 데이터를 받은 뒤, 배열값만 출력

const wrap = document.querySelector('.youtube .wrap');

const key = 'AIzaSyBwWOON8mGaabSZDeDcY0H9G5DqQ6jkwjw';
const list = 'PLw7h_PSATrFtbEgq6bMkkF1mRodGkZ9c6';
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

fetch(url)
.then((data)=>data.json())
.then((json) => {
    console.log(json.items);
    let tags = '';

    json.items.forEach(item=> {
        tags += `
        <article>
            <h2>${item.snippet.title}</h2>
            <img src=${item.snippet.thumbnails.standard.url} />
            <p>${item.snippet.description}</p>
            <span>${item.snippet.publishedAt}</span>
        </article>
        `
    });

    wrap.innerHTML = tags;
});

// fetch(url)
// .then((data)=>data.json())
// .then((json)=> {
//     console.log(json);
// })