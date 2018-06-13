const deleteElement = document.querySelectorAll(".delete-element, .change-element");
const activeItemMenu = document.querySelectorAll(".menu-item");
const showModalFormButton = document.querySelectorAll(".show-modal-form");
const modalForm = document.querySelector(".modal-form");

const DeleteElement = evt => {
	const dataId = +evt.target.dataset.id;
	const dataApi = evt.target.dataset.api;
	const dataMethod = evt.target.dataset.method;

	fetch(`/api/${dataApi}`,{
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		method: dataMethod,
		body : dataId,
	})
	.then(function (data) {
		console.log("Request success: ", data);
		location.reload();
	})
	.catch(function (error) {
		console.log("Request failure: ", error);
	});
};

deleteElement.forEach(item => {
    item.onclick = DeleteElement;
});

activeItemMenu.forEach(item => {
    let location = window.location.pathname.toLocaleLowerCase();
    let thisItem = item.dataset.name.toLocaleLowerCase();
    location = location.slice(1);
    location === thisItem ? item.classList.add("active") : item.classList.remove("active")
});

showModalFormButton.forEach(item => {
   item.onclick = function () {
       modalForm.classList.toggle("active");
   }
});
