let fruits = [];
let currentPage = 1;
const rowsPerPage = 5;

function refreshTable() {
  const tableBody = document.querySelector("#fruitTable tbody");
  tableBody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedData = fruits.slice(start, end);

  paginatedData.forEach((fruit, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
                    <td>${start + index + 1}</td>
                    <td>${fruit.name}</td>
                    <td>${fruit.weight} Kg</td>
                    <td><img src="${
                      fruit.image
                    }" alt="Image" style="width: 50px; height: 50px;"></td>
                    <td>
                        <button class="edit" onclick="editData(${
                          start + index
                        })">Edit</button>
                        <button class="delete" onclick="deleteData(${
                          start + index
                        })">Hapus</button>
                    </td>
                `;

    tableBody.appendChild(row);
  });

  renderPagination();
}

function renderPagination() {
  const pagination = document.querySelector("#pagination");
  pagination.innerHTML = "";

  const totalPages = Math.ceil(fruits.length / rowsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.toggle("active", i === currentPage);
    button.onclick = () => {
      currentPage = i;
      refreshTable();
    };
    pagination.appendChild(button);
  }
}

function addData() {
  const nameInput = document.querySelector("#name");
  const weightInput = document.querySelector("#weight");
  const imageInput = document.querySelector("#image");

  fruits.push({
    name: nameInput.value,
    weight: weightInput.value,
    image: imageInput.value,
  });

  nameInput.value = "";
  weightInput.value = "";
  imageInput.value = "";

  currentPage = Math.ceil(fruits.length / rowsPerPage);
  refreshTable();
}

function editData(index) {
  const fruit = fruits[index];

  document.querySelector("#name").value = fruit.name;
  document.querySelector("#weight").value = fruit.weight;
  document.querySelector("#image").value = fruit.image;

  deleteData(index);
}

function deleteData(index) {
  fruits.splice(index, 1);
  if (currentPage > Math.ceil(fruits.length / rowsPerPage)) {
    currentPage--;
  }
  refreshTable();
}
