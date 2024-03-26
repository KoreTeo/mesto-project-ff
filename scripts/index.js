const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');

function createCard(imageLink, title, removeCard){
  const cardElementClone = cardElement.cloneNode(true);
  const cardImage = cardElementClone.querySelector('.card__image');
  const cardTitle = cardElementClone.querySelector('.card__title');
  const cardDeleteButton = cardElementClone.querySelector('.card__delete-button');
  
  cardImage.src = imageLink;
  cardTitle.textContent = title;
  cardDeleteButton.addEventListener('click', removeCard);

  return cardElementClone;
}

function removeCard(event) {
  const cardElement = event.target.closest('.card')
  cardElement.remove();
}

initialCards.forEach(item => cardList.append(createCard(item.link, item.name, removeCard)));