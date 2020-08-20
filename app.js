const cafeList = document.querySelector("#cafe-list");
const addForm = document.querySelector("#add-cafe-form");

//create element & render cafes
function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);
  cafeList.appendChild(li);
}

// GET ALL data
db.collection("cafes")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderCafe(doc);
    });
  });

// POST data
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("cafes").add({
    name: addForm.name.value,
    city: addForm.city.value,
  });
  addForm.name.value = "";
  addForm.city.value = "";
});
