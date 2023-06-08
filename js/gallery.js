const wrap = document.querySelector('.gallery .wrap');

const api_key = 'b6a8ab876282930a394fe90be640af10';
const password = '869efeb15881763d';
const method_interest = 'flickr.interestingness.getList';
const num = 5;
const baseURL = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${num}`;

fetch(baseURL)
.then(res=>res.json())
.then((json)=>{
    const items = json.photos.photo;

    let tags= '';

    items.forEach((item) => {
        tags+=`
            <li class='item'>
                <div>
                    <a href='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'>
                        <img src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' />
                    </a>
                    <p>${item.title}</p>
                </div>
            </li>
        `;
    })

    wrap.innerHTML = tags;
})