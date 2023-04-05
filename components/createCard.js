const createCard = () => {
  return `<div class="create-edit-modal-form">
  			<h2 class="create-edit-modal-title">Добавление</h2>
				<form action="/target/" class="modal-form">
					<label for="name">Имя</label>  <br />
					<input id="name" name="name" placeholder="Имя" required /> <br />
					<label for="image">Ссылка на изображение</label> <br />
					<input id="image" name="image" placeholder="Ссылка на изображение"/><br />
					<label for="age">Возраст</label>  <br />
					<input id="age" name="age" type="number" placeholder="Возраст" /> <br />
					<label for="rate">Рейтинг</label>  <br />
					<input id="rate" name="rate" type="number" placeholder="Рейтинг" > <br />
					<label for="favorite">Любимчик</label>
					<input type="checkbox" id="favorite" name="favorite"/><br />
					<label>Сообщение</label>  <br />
					<textarea id="description" name="description" rows="3" placeholder="Описание"></textarea><br/>
					<button type="submit" class="button-form-submit">Ok</button>
					<button type="reset" class="button-form-close"></button>
				</form>
		</div>`;
};
