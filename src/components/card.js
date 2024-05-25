import { deleteCard, addLike, deleteLike } from './api.js'

// функция создания карточки
function createCard(card, removeCard, handleImageClick, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card');
  const cardElementClone = cardElement.cloneNode(true);
  const cardImage = cardElementClone.querySelector('.card__image');
  const cardTitle = cardElementClone.querySelector('.card__title');
  const cardDeleteButton = cardElementClone.querySelector('.card__delete-button');
  const cardLikeButton = cardElementClone.querySelector('.card__like-button');
  const cardLikeCounter = cardElementClone.querySelector('.card__like-counter');

  if (card.owner._id !== userId) {
    cardDeleteButton.disabled = true;
    cardDeleteButton.classList.add('card__delete-button_hidden');
  }

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;
  cardLikeCounter.textContent = card.likes.length;

  if (card.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardDeleteButton.addEventListener('click', () => removeCard(card._id, cardElementClone));
  cardImage.addEventListener('click', () => handleImageClick(card))
  cardLikeButton.addEventListener('click', (evt) => handleLikeButton(evt, cardLikeButton, card, cardLikeCounter));

  return cardElementClone;
}

// функция удаления элемента карточки
function removeCard(cardId, card) {
  deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.log(err))
}

// функция-обработчик лайка
function handleLikeButton(evt, cardLikeButton, card, cardLikeCounter) {
  if (cardLikeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(card._id)
      .then((res) => {
        cardLikeCounter.textContent = res.likes.length;
        likeCard(evt)
      })
      .catch((err) => console.log(err))
  }
  else {
    addLike(card._id)
      .then((res) => {
        cardLikeCounter.textContent = res.likes.length;
        likeCard(evt)
      })
      .catch((err) => console.log(err))
  }
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { createCard, removeCard }