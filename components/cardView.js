const generateCardView = (cat) => {
  return `<div class='cardView-popup'>
  <div class="cardView">
  <div class="cardView-image">
 	<img src=${cat.image !== "" ? cat.image : plug} alt="Картинка котика" /> 
  </div>
	<div class="cardView-content">
		<div class="card-name">Имя: ${cat.name}</div>
		<div class="card-description">Сообщение: ${cat.description}</div>
		<div class="card-age">Возраст: ${cat.age}</div> 
		<div class="card-rate">Рейтинг: ${cat.rate}</div> 
		<button class="cardView-exit"></button>
	</div>
  </div>
 </div>`;
};
