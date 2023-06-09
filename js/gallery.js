const wrap = document.querySelector('.gallery .wrap');
const loading = document.querySelector('.gallery .loading');
const api_key = 'ae5dbef0587895ed38171fcda4afb648';
const num = 50;
const myId = '198560836@N08';
const baseURL = `https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&api_key=${api_key}&per_page=${num}&method=`;
const method_interest = 'flickr.interestingness.getList';
const method_user = 'flickr.people.getPhotos';
const interest_url = `${baseURL}${method_interest}`;
const user_url = `${baseURL}${method_user}&user_id=${myId}`;

fetch(user_url)
	.then((res) => res.json())
	.then((json) => {
		const items = json.photos.photo;

		let tags = '';

		items.forEach((item) => {
			tags += `
        <li class='item'>
          <div>
            <a href='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg'>
              <img class="thumb" src='https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg' />
            </a>
            <p>${item.title === '' ? 'Have a good day!!' : item.title}</p>

			<article class="profile">
				<img src="http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg" />
				<span>${item.owner}</span>
			</article>
          </div>
        </li>
      `;
		});

		wrap.innerHTML = tags;

		const imgs = wrap.querySelectorAll('img');
		let count = 0;

		for (const el of imgs) {
			el.onerror = () => {
				el.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif');
			};
			el.onload = () => {
				count++;
				count === imgs.length && isoLayout();
			};

		}
	});

function isoLayout() {
	new Isotope(wrap, {
		itemSelector: '.item',
		transitionDuration: '0.5s',
	});
	wrap.classList.add('on');
	loading.classList.add('off');
}