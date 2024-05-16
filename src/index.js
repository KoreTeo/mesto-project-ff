import './pages/index.css';
import { initialCards } from './components/cards.js';
import { createCard, removeCard, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js'

// используемые DOM-элементы
const cardList = document.querySelector('.places__list');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup__image');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageCaption = document.querySelector('.popup__caption');
const addNewCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const popupCloseButtonList = document.querySelectorAll('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const editProfileNameInput = editProfileForm.elements.name;
const editProfileDescriptionInput = editProfileForm.elements.description;
const addNewCardForm = document.forms['new-place'];
const newCardName = addNewCardForm.elements['place-name'];
const newCardUrl = addNewCardForm.elements.link;

// открытие модальных окон
addNewCardButton.addEventListener('click', () => {
  openModal(popupNewCard);
})

editProfileButton.addEventListener('click', () => {
  openModal(popupEditProfile);
  fillProfileInputs();
})

// функция обработчик отправки формы добавления карточки
function handleNewCardFormSubmit (evt) {
  evt.preventDefault();
  cardList.prepend(createCard(newCardUrl.value, newCardName.value, removeCard, handleImageClick, likeCard))
  closeModal(popupNewCard);
  newCardUrl.value = ''
  newCardName.value = ''
}

addNewCardForm.addEventListener('submit', handleNewCardFormSubmit)

// функция обработчик отправки формы изменения профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  closeModal(popupEditProfile);
}

function fillProfileInputs () {
  editProfileNameInput.value = profileTitle.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);

//функция обработчик добавления картинки в попап
function handleImageClick(imageLink, title) {
  openModal(popupTypeImage);

  popupImage.src = imageLink;
  popupImage.alt = title;
  popupImageCaption.textContent = title;
};

// закрытие модальных окон по крестику
popupCloseButtonList.forEach(popupCloseButton => {
  const popup = popupCloseButton.closest('.popup');
  popupCloseButton.addEventListener('click', () =>
    closeModal(popup))
}
)

// добавление готовых карточек
initialCards.forEach(item => cardList.append(createCard(item.link, item.name, removeCard, handleImageClick, likeCard)));