//외부 api서비스 token 값 발행
//외부 api 데이터를 가져오기 위한 url 생성을 위한 api 사용법 숙지
//해당 api 요청 url로 fetch 함수를 이용하여 데이터를 받은 뒤, 배열값만 출력

//자주 쓰는 문자열 관련 메서드
//문자열.substr(시작문자열순서, 자를 문자열 갯수) : 특정 문자열에서 원하는 위치에서 원하는 글자 개수까지 잘라서 반환
//문자열.split('구분자') : 구분자를 기점으로 문자열을 나눠서 배열로 반환
//배열.join('구분자') : 배열값을 구분자로 이어붙여서 하나의 문자열로 반환
//

//이벤트 위임(event delegate)
//현재 없는 요소에 이벤트를 전달하기 위해서 항상 있는 상위 부모 요소에 이벤트를 위임(이벤트 버블링 활용한 개념)

//e.target vs e.currentTarget
//e.currentTarget : 현재 이벤트 구문상에 선택자로 연결되어 있는 요소를 지칭.
//e.target : 화면상에서 이벤트가 발생한 대상을 지칭



const wrap = document.querySelector('.youtube .wrap');

const key = 'AIzaSyBwWOON8mGaabSZDeDcY0H9G5DqQ6jkwjw';
const list = 'PLw7h_PSATrFsUKd0EJLE9yF8S1NdmrdJK';
const num = 10;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${list}&key=${key}&maxResults=${num}`;



fetch(url)
.then((data)=>data.json())
.then((json) => {
    console.log(json.items);
    let tags = '';

    json.items.forEach(item=> {
        let tit = item.snippet.title;
        let desc = item.snippet.description;
        let date = item.snippet.publishedAt;
        //let vId = item.snippet.resourceId.videoId;
        tags += `
        <article>
            <h2>${tit.length > 50 ? tit.substr(0, 50) + '...' : tit}</h2>
            <div class='txt'>
                <p>${desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>    
                <span>${date.split('T')[0].split('-').join('.')}</span>
            </div>
            <div class='pic' >
                <img src=${item.snippet.thumbnails.standard.url}  alt=${item.snippet.resourceId.videoId}/>    
            </div>
        </article>
        `
    });

    wrap.innerHTML = tags;
    //then 구문 안쪽에서 동기적으로 돔 요소가 동적으로 생성된 이후에만 해당 요소에 접근 가능.
});

// fetch(url)
// .then((data)=>data.json())
// .then((json)=> {
//     console.log(json);
// })

wrap.addEventListener('click', (e)=> {
    console.log('e.currentTarget', e.currentTarget);
    if(e.target.nodeName !=='IMG') return;
    console.log(e.target.getAttribute('alt'));
});



//이벤트 버블링.
//버블처럼 확산이 된다.addEventListener상위에 적는다.addEventListener
//제한을 걸고 대상이 아이엠지 요소일 때만 실행이 되게 한다.
//