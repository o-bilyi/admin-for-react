const modalForm = document.querySelector('.modal-form');
const activeItemMenu = document.querySelectorAll('.menu-item');
const showImageButton = document.querySelectorAll('.show-image-button');
const showModalFormButton = document.querySelectorAll('.show-modal-form');
const showPreviewImageButton = document.querySelectorAll(
  '.show-preview-button');
const deleteElement = document.querySelectorAll(
  '.delete-element, .change-element');

const DeleteElement = evt => {
  const dataId = evt.target.dataset.id;
  const dataApi = evt.target.dataset.api;
  const dataMethod = evt.target.dataset.method;

  fetch(`/api/${dataApi}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: dataMethod,
    body: JSON.stringify({id: dataId}),
  }).then(function(data) {
    if (data.ok) {
      location.reload();
      console.log('Request success: ', data);
    } else {
      console.log('Request failure: ', data.json());
    }
  });
};

deleteElement.forEach(item => {
  item.onclick = DeleteElement;
});

activeItemMenu.forEach(item => {
  let location = window.location.pathname.toLocaleLowerCase();
  let thisItem = item.dataset.name.toLocaleLowerCase();
  location === thisItem ?
    item.classList.add('active') :
    item.classList.remove('active');
});

showModalFormButton.forEach(item => {
  item.onclick = function() {
    modalForm.classList.toggle('active');
  };
});

if (showImageButton) {

  showImageButton.forEach(item => {
    item.onclick = function() {
      const parent = item.parentNode;

      const imageProject = parent.querySelector('.image-project');
      const previewProject = parent.querySelector('.preview-project');

      const showImage = parent.querySelector('.show-image-button');

      imageProject.classList.toggle('active');
      previewProject.classList.toggle('active');

      this.classList.toggle('active');
      showImage.classList.toggle('active');
    };
  });

  showPreviewImageButton.forEach(item => {
    item.onclick = function() {
      const parent = item.parentNode;

      const imageProject = parent.querySelector('.image-project');
      const previewProject = parent.querySelector('.preview-project');

      const showImage = parent.querySelector('.show-image-button');

      imageProject.classList.toggle('active');
      previewProject.classList.toggle('active');

      this.classList.toggle('active');
      showImage.classList.toggle('active');
    };
  });
}