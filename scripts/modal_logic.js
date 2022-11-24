$(document).ready(function () {
  // вызываются модальные окна по этому атрибуту. в константу сохраняем все кнопки у которых есть атрибут data-modal
  // const modalCall = $('[data-modal]');
  const modalClose = $('[data-close]');

  // modalCall.on('click', openModal);

  modalClose.on('click', closeModal);

  $('.portfolio__col').on('click', openModal);

  $('.modal').on('click', closeModal);

  $('#project_universal').on('click', closeModal);

  $('.footer__right').on('click', (event) => switchModal(event, 'right'));
  $('.footer__left').on('click', (event) => switchModal(event, 'left'));

  $('.modal__dialog').on('click', function (event) {
    event.stopPropagation();
  });

  $(document).keydown(function (event) {
    if (event.code == 'Escape') closeModal(event);
  });
});

function closeModal(event) {
  event.preventDefault();

  let modalShow = $('.modal.show');
  modalShow.find('.modal__dialog').css({
    transform: 'scale(0)',
  });

  setTimeout(function () {
    modalShow.removeClass('show');
    modalShow.find('.modal__dialog')[0].id = '';
    $('body').removeClass('no-scroll');
  }, 200);
}

function openModal(event) {
  event.preventDefault();

  // console.log(this.id);
  refreshModalContent(this.id);
  let modal = $('#project_universal');
  modal.addClass('show');
  modal.find('.modal__dialog')[0].id = this.id;
  $('body').addClass('no-scroll');

  setTimeout(function () {
    modal.find('.modal__dialog').css({
      transform: 'scale(1)',
    });
  }, 200);
}

function refreshModalContent(id) {
  let modal = $('#project_universal');

  modal.find('.modal__dialog')[0].id = id;
  modal.find('.title')[0].textContent = projects._modals[id].name;
  modal.find('.content__text')[0].textContent = projects._modals[id].p;
  modal.find('.preview__img')[0].src = projects._modals[id].img;
}

function switchModal(event, side) {
  event.preventDefault();

  // $this.data('modal'), nextModal, modal);
  let modal = $('#project_universal');
  const id =
    (Number(modal.find('.modal__dialog')[0].id) +
      (side == 'right' ? 1 : projects._modals.length - 1)) %
    projects._modals.length;

  console.log(
    id,
    modal.find('.modal__dialog')[0].id,
    side,
    projects._modals.length
  );

  refreshModalContent(id);

  // let nextModal = "#project_" + (Number(`${$this.data('modal')}`.replace('#project_','')) + 1)
}

class Modal {
  name;
  img_prev;
  img;
  p;

  constructor(name, paragraph, img_prev, img) {
    this.name = name;
    this.p = paragraph;
    this.img_prev = img_prev;
    this.img = img;
  }
}

// ВНУТРЕННЯЯ БАЗА ДАННЫХ ПРОЕКТОВ!!!
class Modals {
  _modals = [];
  // modal имеет тип класса Modal
  addModal(modal) {
    this._modals.push(modal);
    generateProjectHTML(modal, this._modals.length - 1);
  }
}

// modal имеет тип класса Modal
function generateProjectHTML(modal, id) {
  const portfolio = document.getElementsByClassName('projects__portfolio');

  const portfolio_col = document.createElement('div');
  portfolio_col.classList.add('portfolio__col');
  portfolio_col.id = id;

  const portfolio__works = document.createElement('div');
  portfolio__works.classList.add('portfolio__works');

  const works_item = document.createElement('div');
  works_item.classList.add('works__item');

  // если поменяю ч img  на div в html то  поменять тут
  const works_image = document.createElement('img');
  works_image.classList.add('works__image');
  works_image.src = modal.img_prev;

  const works_content = document.createElement('div');
  works_content.classList.add('works__content');

  const works_title = document.createElement('div');
  works_title.classList.add('works__title');
  works_title.append(modal.name);

  portfolio_col.append(portfolio__works);
  portfolio__works.appendChild(works_item);
  works_item.appendChild(works_image);
  works_item.appendChild(works_content);
  works_content.appendChild(works_title);
  portfolio[0].appendChild(portfolio_col);
}

const projects = new Modals();
