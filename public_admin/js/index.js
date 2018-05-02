const deleteElement = document.querySelectorAll(".delete-element");
const changeElement = document.querySelectorAll(".change-element");

const DeleteElement = evt => {
	const dataId = +evt.target.getAttribute("data-id");
	const dataApi = evt.target.getAttribute("data-api");
	const dataMethod = evt.target.getAttribute("data-method");

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

deleteElement.forEach((item) => {
    item.onclick = DeleteElement;
});

changeElement.forEach((item) => {
    item.onclick = DeleteElement;
});
