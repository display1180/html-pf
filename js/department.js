const wrap = document.querySelector('.department .wrap');
/*
fetchDepart();
async function fetchDepart() {
	const result = await fetch('/DB/department.json');
	const data = await result.json();
	console.log(data);
}


외부데이터 가져오는 공식
fetch('데이터 URL')
.then((data)=> data.json()).then((json)=>{
  //데이터가 성공적으로 받아졌을때 실행할 구문
  console.log(json);
})
.catch(err=> {
  //데이터 응답에 실패했을때 실행할 구문
  console.log(err);
})
*/
let tags = '';

fetch('/DB/department.json')
	.then((res) => res.json())
	.then((data) => {
		const memberData = data.members;

		memberData.map((data) => {
			tags += `
        <article>
          <div class='pic'>
            <img src='img/${data.pic}' />
          </div>
          <h2>${data.name}</h2>
          <p>${data.position}</p>
        </article>
      `;
		});
		wrap.innerHTML = tags;
	})
	.catch((err) => {
		console.log(err);
	});
