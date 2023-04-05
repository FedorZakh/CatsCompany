const generateCard = (cat) => {
  return `<div class='cat-card'>
  <div class="cat-card-image">
 	<img src=${cat.image !== "" ? cat.image : plug} alt="Картинка котика" /> 
  </div>
	
	<p class="cat-name">${cat.name}</p>
	<p class="cat-description">${cat.description}</p>
	<div class="${cat.favorite ? "cat-favorite activ" : "cat-favorite"}">
		<img src="./images/heart.svg" alt="Любимчик"/>
	</div>
	
	<div class="cat-rate"></div> 	
	<div class="cat-card-btns">
	<button class="cat-card-view" value=${cat.id}>Посмотреть</button>
	<button class="cat-card-update" value=${cat.id}>Редактировать</button>
	<button class="cat-card-delete" value=${cat.id}>Удалить</button>
	</div>
	</div>`;
};
