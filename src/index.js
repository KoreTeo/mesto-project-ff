import './pages/index.css';
import { createCard, removeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, patchUserInfo, addCard, updateAvatar } from './components/api.js'

// используемые DOM-элементы
const cardList = document.querySelector('.places__list');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup__image');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageCaption = document.querySelector('.popup__caption');
const popupAvatar = document.querySelector('.popup_type_avatar-edit');
const addNewCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const editAvatarButton = document.querySelector('.profile__avatar-button');
const profileImage = document.querySelector('.profile__image');
const popupCloseButtonList = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const editProfileNameInput = editProfileForm.elements.name;
const editProfileDescriptionInput = editProfileForm.elements.description;
const addNewCardForm = document.forms['new-place'];
const newCardName = addNewCardForm.elements['place-name'];
const newCardUrl = addNewCardForm.elements.link;
const editAvatarForm = document.forms['edit-avatar'];
const avatarInput = editAvatarForm.avatar;

// открытие модальных окон
addNewCardButton.addEventListener('click', () => {
  openModal(popupNewCard);
  addNewCardForm.reset();
  clearValidation(addNewCardForm, validationConfig)
})

editProfileButton.addEventListener('click', () => {
  openModal(popupEditProfile);
  fillProfileInputs();
  clearValidation(editProfileForm, validationConfig);
})

editAvatarButton.addEventListener('click', () => {
  openModal(popupAvatar);
  editAvatarForm.reset();
  clearValidation(editAvatarForm, validationConfig);
})

// функция обработчик отправки формы добавления карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.submitter, true);

  addCard({
    name: newCardName.value,
    link: newCardUrl.value,
  })
    .then((card) => {
      cardList.prepend(createCard(card, removeCard, handleImageClick, card.owner._id));
      closeModal(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(evt.submitter, false);
    })
}

addNewCardForm.addEventListener('submit', handleNewCardFormSubmit)

// функция обработчик отправки формы изменения профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.submitter, true)

  patchUserInfo({
    name: editProfileNameInput.value,
    description: editProfileDescriptionInput.value
  })
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDescription.textContent = user.about;
      closeModal(popupEditProfile);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(evt.submitter, false);
    })
}

// Заполнение полей формы редактирования профиля
function fillProfileInputs() {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

//функция обработчик добавления картинки в попап
function handleImageClick(card) {
  openModal(popupTypeImage);

  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageCaption.textContent = card.name;
};

// функция-обработчик отправки формы изменения аватара 
function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(evt.submitter, true);

  updateAvatar(avatarInput.value)
    .then((user) => {
      profileImage.style = `background-image: url(${user.avatar})`;
      closeModal(popupAvatar)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      renderLoading(evt.submitter, false);
    }
    )
}

editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit)

// закрытие модальных окон по крестику
popupCloseButtonList.forEach(popupCloseButton => {
  const popup = popupCloseButton.closest('.popup');
  popupCloseButton.addEventListener('click', () => closeModal(popup))
}
)

// валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig);

function renderLoading(buttonElement, isLoading) {
  buttonElement.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

// загрузка карточек и данных пользователя
Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, user]) => {
    cards.forEach(card => cardList.append(createCard(card, removeCard, handleImageClick, user._id)));
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style = `background-image: url(${user.avatar})`
  })
  .catch((err) => console.log(err))