
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
        operator: "Car",
        startTime: "8",
        endTime: "12",
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
    },
    {
        date: "2024-06-12",
        operator: "Pedro",
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
    <td>${newElement.date}</td>
    <td>${newElement.operator}</td>
    <td>${newElement.startTime}</td>
    <td>${newElement.endTime}</td>
    <td>${newElement.endTime - newElement.startTime}</td>
    <td><button class="btnDelete">Eliminar</button></td> `;

    tbody.appendChild(contentTable);
    deleteRow(contentTable);
    filterName(newElements);
    // if(newElement){
    //     writeNamePerPerson();
    // }
}

//GUARDAR ELEMENTOS NUEVOS EN EL ARRAY (pasarlo a un DB a futuro)
function addElementoToArray(data) {
    newElements.push(data);
}

// BINDEO EVENT CON BOTON 
let btnSave = document.querySelectorAll(".btnSave");
if (btnSave) {
    btnSave.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("se hizo click en el boton");

            let date = document.querySelector(".inputDate").value;
            let operator = document.querySelector(".operator").value.charAt(0).toUpperCase() + document.querySelector(".operator").value.slice(1);
            let startTime = document.querySelector(".start-time").value;
            let endTime = document.querySelector(".end-time").value;
            let totalDay = endTime - startTime;

            let newElementToAdd = { date, operator, startTime, endTime, totalDay };

            addElementoToArray(newElementToAdd);
            createContentTable(newElementToAdd);

            document.querySelector(".inputDate").value = ""
            document.querySelector(".operator").value = "";
            document.querySelector(".start-time").value = "";
            document.querySelector(".end-time").value = "";
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
                    <td class="arrayToFilterOperator">${element.operator}</td>
                    <td>${element.startTime}</td>
                    <td>${element.endTime}</td>
                    <td>${element.totalDay}</td>
                    <td><button class="btnDelete">Eliminar</button></td>
                </tr>
            `
            deleteRow(contentTable);

            tbody.appendChild(contentTable);
        }
        console.log("elementos cargados correctamente", newElements)
    }
}

// funcion para el btn eliminar de la fila (confirma la seleccion y elimina)

function deleteRow(contentToDelete) {
    let btnDelete = document.querySelectorAll(".btnDelete");
    btnDelete.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (confirm("Estas seguro que deseas borrar este registro?") == true) {
                console.log("su seleccion fue aceptar");
                contentToDelete.remove();
            } else {
                console.log("su seleccion fue cancelar");
            }
        });
    });
}

// funcion para filtrar nombres(operadores) repetidos
// modificarlo para que cuando se agrega uno nuevo desde el input tambien se sume a la tabla.

function filterName(arrayToFilterOperator) {
    let nameCounts = {};
    // let arrayNameOperator = Array.from(arrayToFilterOperator);
    let arrayNameOperator = arrayToFilterOperator;

    arrayNameOperator.forEach(element => {
        let name = element.operator; // Toma el valor o texto del nodo
        nameCounts[name] = (nameCounts[name] || 0) + 1;
    })

    console.log("Array para recorrer:", Array.from(arrayToFilterOperator).map(el => el.operator));
    console.log(Object.keys(nameCounts));

    const repeatedNames = Object.keys(nameCounts).filter(name => nameCounts[name] > 0);
    return repeatedNames;
}

// Usar la función filterName()
let repeatedNames = filterName(newElements);
console.log("Nombres repetidos o unicos:", repeatedNames);

let tBodyTotal = document.querySelector(".tBodyTotal");

// dibujar en la tabla los nombres(operadores) de la primer tabla para despues calcular el total
function writeNamePerPerson() {
    if (repeatedNames) {
        for (let i = 0; i < repeatedNames.length; i++) {
            const element = repeatedNames[i];
            let contentTableTotal = document.createElement('tr');
            contentTableTotal.className = "trResume";
            contentTableTotal.innerHTML =
                ` 
                 <td class="tdNameOperator">${element}</td>
                 <td class="totalPerPerson"></td>
                `
            tBodyTotal.appendChild(contentTableTotal);
        }
        console.log("nombre cargados correctamente", repeatedNames)
    }
}

writeNamePerPerson();