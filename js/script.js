let tbody = document.getElementById('tbody');

let newElements = [
    {
        date: "2025-01-22",
        operator: "Car",
        startTime: "8",
        endTime: "16",
        get totalDay() {
            return this.endTime - this.startTime
        }
    },
    {
        date: "2024-06-12",
        operator: "Juan",
        startTime: "8",
        endTime: "12",
        get totalDay() {
            return this.endTime - this.startTime
        }
    }
];

loadData();

function createContentTable(newElement) {

    let contentTable = document.createElement('tr');
    console.log('product', newElement);
    contentTable.innerHTML = `
    <td><input type="date" class="date" value="${newElement.date}"></td>
    <td><input type="text" class="operator" value="${newElement.operator}"></td>
    <td><input type="number" class="start-time" value="${newElement.startTime}"></td>
    <td><input type="number" class="end-time" value="${newElement.endTime}"></td>
    <td>${newElement.endTime - newElement.startTime}</td>
    <td>
        <button class="btn-save">Guardar</button>
    </td>
    `;

    tbody.appendChild(contentTable);
}

//GUARDAR ELEMENTOS NUEVOS EN EL ARRAY
function addElementoToArray(data) {
    newElements.push(data);
    console.log("elementos agregados, ", data.totalDay);
    console.log("newelements, ", newElements);

}

// BINDEO EVENT CON BOTON 
let btnSave = document.querySelectorAll(".btn-save");
if (btnSave) {
    btnSave.forEach(btn => {
        tbody.addEventListener("click", () => {
            console.log("se hizo click en el boton");

            let date = document.querySelector(".date").value;
            let operator = document.querySelector(".operator").value;
            let startTime = document.querySelector(".start-time").value;
            let endTime = document.querySelector(".end-time").value;
            let totalDay = endTime - startTime;

            let newElementToAdd = { date, operator, startTime, endTime, totalDay };

            addElementoToArray(newElementToAdd);
            createContentTable(newElementToAdd);
        })
    });
}

//CARGAR DATOS EXISTENTES EN EL INICIO DE LA PAGINA (pasarlo a un DB a futuro)
function loadData() {
    if (newElements) {
        for (let i = 0; i < newElements.length; i++) {
            const element = newElements[i];
            let contentTable = document.createElement('tr');
            contentTable.innerHTML = `
                <tr>
                    <td>${element.date}</td>
                    <td>${element.operator}</td>
                    <td>${element.startTime}</td>
                    <td>${element.endTime}</td>
                    <td>${element.totalDay}</td>
                </tr>
            `
            tbody.appendChild(contentTable);
            // createContentTable(element);

        }
        console.log("elementos cargados correctamente", newElements)
    }
}