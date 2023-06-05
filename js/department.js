const wrap = document.querySelector('.department .wrap');

let tags = '';

fetch('/DB/department.json').then((res)=> {
    return res.json();
})
.then((data) => {
    const memberData = data.members;
    memberData.map((data) => {
        tags += `
            <article>
                <div class='pic'>
                    <img src='img/${data.pic}'}>
                </div>
                <h2>${data.name}</h2>
                <p>${data.position}</p>
            </article>
        `
    })
    wrap.innerHTML = tags;

}).catch((err) => {
    console.log(err);
})



// async function fetchDepart() {
//     const result = await fetch('/DB/department.json');
//     const data = await result.json();
//     console.log(data);
// }