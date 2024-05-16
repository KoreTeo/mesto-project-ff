//функция открытия попапа
function openModal (popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', handleCloseOverlay)
  document.addEventListener('keydown', handleEscapeButton);
}

//функция закрытия попапа
function closeModal (popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', handleCloseOverlay)
  document.removeEventListener('keydown', handleEscapeButton)
}

//функция-обработчик закрытия попапа по оверлею
function handleCloseOverlay (evt) {
    if (evt.currentTarget === evt.target) {
      closeModal(evt.target);
    }
}

//функция-обработчик закрытия попапа через Esc
function handleEscapeButton(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closeModal(popupOpened);
  };
}

export {openModal, closeModal}