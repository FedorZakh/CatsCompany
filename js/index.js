const homepage = document.getElementById("homepage");

const content = document.querySelector(".content");
const headerBtns = document.querySelector(".header-btns");
let store = window.localStorage;
let plug = "!!!!!";

const refreshCatsAndContent = () => {
  content.innerHTML = "";
  api.getAllCats().then((res) => {
    store.setItem("cats", JSON.stringify(res));
    const cards = JSON.parse(store.getItem("cats")).reduce(
      (acc, el) => (acc += generateCard(el)),
      ""
    );
    content.insertAdjacentHTML("afterbegin", cards);
  });
};

refreshCatsAndContent();

headerBtns.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    switch (event.target.className) {
      case "add-btn":
        const evt = event.target.value;

        const createCardForm = createCard();

        content.insertAdjacentHTML("afterbegin", createCardForm);

        const modalWin = document.querySelector(".create-edit-modal-form");

        modalWin.classList.add("active");

        const modForm = document.querySelector("form");

        const modBtnOk = modForm.querySelector(".button-form-submit");

        const modBtnClose = modForm.querySelector(".button-form-close");

        modBtnOk.addEventListener("click", (evt) => {
          const forms = document.forms[0];

          event.preventDefault();

          const formData = new FormData(forms);

          const catObject = Object.fromEntries(formData);

          const cat = { id: getNewIdOfCat(), ...catObject };
          console.log(cat);
          const favorite = cat.favorite
            ? (cat.favorite = true)
            : (cat.favorite = false);
          api
            .addCat({
              ...catObject,
              favorite: favorite,
              id: getNewIdOfCat(),
            })
            .then((res) => {
              console.log(res);
              refreshCatsAndContent();
            });
          modalWin.classList.toggle("active");
          forms.reset();
          modalWin.remove();
        });
        modBtnClose.addEventListener(
          "click",
          (evt) => {
            modalWin.remove();
          },
          { once: true }
        );
        break;
      case "update-btn":
        refreshCatsAndContent();
        break;
    }
  }
});

content.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    switch (event.target.className) {
      case "cat-card-view":
        console.log(event.target.value);
        let catView = getViewCardInLocal(event.target.value);
        const cardViewPopup = generateCardView(catView);
        content.insertAdjacentHTML("afterbegin", cardViewPopup);
        const modalView = document.querySelector(".cardView-popup");

        const modalViewBtn = modalView.querySelector("button");
        modalViewBtn.addEventListener(
          "click",
          (evt) => {
            modalView.remove();
          },
          { once: true }
        );
        break;
      case "cat-card-update":
        const createCardForm = createCard();

        content.insertAdjacentHTML("afterbegin", createCardForm);

        const mod = document.querySelector(".create-edit-modal-form");

        const popupTitle = document.querySelector(".create-edit-modal-title");

        popupTitle.textContent = "Редактирование";

        mod.classList.toggle("active");

        const modForm = document.querySelector("form");

        const modBtn = modForm.querySelector("button");

        const modBtnClose = modForm.querySelector(".button-form-close");

        const catUpdate = getViewCardInLocal(event.target.value);

        const forms = document.forms[0];

        const formElements = document.forms[0].elements;

        formElements.name.value = catUpdate.name;

        formElements.image.value = catUpdate.image;

        formElements.age.value = catUpdate.age;

        formElements.rate.value = catUpdate.rate;
        if (catUpdate.favorite) {
          formElements.favorite.setAttribute("checked", "checked");
        }
        formElements.description.value = catUpdate.description;

        modBtn.addEventListener("click", (evt) => {
          forms.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(forms);
            const catObj = Object.fromEntries(formData);
            const cat = { id: catUpdate.id, ...catObj };
            console.log(cat);
            const favorite = cat.favorite
              ? (cat.favorite = true)
              : (cat.favorite = false);
            api.updateCat({ ...cat, favorite: favorite }).then((res) => {
              console.log(res);
              refreshCatsAndContent();
            });
            mod.classList.toggle("active");
            forms.reset();
          });
        });

        modBtnClose.addEventListener("click", (evt) => {
          mod.remove();
        });
        break;
      case "cat-card-delete":
        api.getDeleteCat(event.target.value).then((res) => {
          console.log(res);
          refreshCatsAndContent();
        });
        break;
    }
  }
});

const getViewCardInLocal = (id) => {
  let view = JSON.parse(store.getItem("cats"));
  let viewCard = view.find((el) => el["id"] == id);
  return viewCard;
};

const getNewIdOfCat = () => {
  let res = JSON.parse(store.getItem("cats"));
  if (res.length) {
    return Math.max(...res.map((el) => el.id)) + 1;
  } else {
    return 1;
  }
};
