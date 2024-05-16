//функция создания карточки
function createCard(imageLink, title, removeCard, handleImageClick, likeCard){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card');
  const cardElementClone = cardElement.cloneNode(true);
  const cardImage = cardElementClone.querySelector('.card__image');
  const cardTitle = cardElementClone.querySelector('.card__title');
  const cardDeleteButton = cardElementClone.querySelector('.card__delete-button');
  const cardLikeButton = cardElementClone.querySelector('.card__like-button');
  
  cardImage.src = imageLink;
  cardImage.alt = title;
  cardTitle.textContent = title;

  cardDeleteButton.addEventListener('click', () => removeCard(cardElementClone));
  cardImage.addEventListener('click', () => handleImageClick(imageLink, title))
  cardLikeButton.addEventListener('click', likeCard);

  return cardElementClone;
}

//функция удаления элемента карточки
function removeCard(card) {
  card.remove();
}

//функция лайка карточки
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export {createCard, removeCard, likeCard}