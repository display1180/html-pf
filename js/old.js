const wrap = document.querySelector('.youtube .wrap');

fetchData();

wrap.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'IMG') return;
    console.log(e.target.getAttribute('alt'));
})

//데이터 fetching 함수
async function fetchData(){
    const key = 'AIzaSyBwWOON8mGaabSZDeDcY0H9G5DqQ6jkwjw';
    const list = 'PLw7h_PSATrFsUKd0EJLE9yF8S1NdmrdJK';
    const num = 10;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;

    const data = await fetch(url);
    const json = await data.json();
    console.log(json.items);
    createList(json.items);
}

//동적으로 목록 생성 함수
function createList(arr) {
    let tags = '';
    arr.forEach((item)=> {
        let tit = item.snippet.title;
        let desc = item.snippet.description;
        let date = item.snippet.publishedAt;
        tags +=`
        <article>
            <h2>
                ${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}
            </h2>
            <div class='txt'>
                <p>${desc.length > 200 ? desc.substr(0,200) + '...' : desc}</p>
                <span>${date.split('T')[0].split('-').join('.')}</span>
            </div>
            <div class='pic'>
                <img src=${item.snippet.thumbnails.standard.url} alt=${
                    item.snippet.resourceId.videoId
                } />
            </div>
        </article>
        `;
    });
    wrap.innerHTML = tags;
}