const deleteElement = document.querySelectorAll(".delete-element");

const DeleteElement = (evt) => {
	const dataId = +evt.target.getAttribute("data-id");
	const dataName = evt.target.getAttribute("data-name");

	fetch(`/api/${dataName}`,{
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		method: "delete",
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
