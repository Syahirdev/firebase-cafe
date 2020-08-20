const cafeList = document.querySelector("#cafe-list");
const addForm = document.querySelector("#add-cafe-form");

//create element & render cafes
function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  cafeList.appendChild(li);

  //DELETE data
  cross.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  });
}

// GET ALL data
// db.collection("cafes")
//   .orderBy("name")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });

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

//Real-time listener
db.collection("cafes")
  .orderBy("name")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderCafe(change.doc);
      } else if (change.type == "removed") {
        let li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
        cafeList.removeChild(li);
      }
    });
  });
