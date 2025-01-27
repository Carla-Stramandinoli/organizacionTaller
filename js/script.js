
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
    updateSummaryTable();
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

// function filterName(arrayToFilterOperator) {
//     let nameCounts = {};

//     arrayToFilterOperator.forEach(element => {
//         let name = element.operator; // Toma el valor o texto del nodo
//         nameCounts[name] = (nameCounts[name] || 0) + 1;
//     })

//     console.log("Array para recorrer:", Array.from(arrayToFilterOperator).map(el => el.operator && el.totalDay));
//     console.log(Object.keys(nameCounts));

//     const repeatedNames = Object.keys(nameCounts).filter(name => nameCounts[name] > 0);
//     return repeatedNames;
// }

// // Usar la función filterName()
// let repeatedNames = filterName(newElements);
// console.log("Nombres repetidos o unicos:", repeatedNames);


let tBodyTotal = document.querySelector(".tBodyTotal");

// dibujar la tabla resumen (nombre y horas totales)
function writeNamePerPerson() {
    if (allOperators) {
        for (let i = 0; i < allOperators.length; i++) {
            const element = allOperators[i];
            let contentTableTotal = document.createElement('tr');
            contentTableTotal.className = "trResume";
            contentTableTotal.innerHTML =
                ` 
                 <td class="tdNameOperator">${element.operator}</td>
                 <td class="totalPerPerson">${element.totalHours}</td>
                `
            tBodyTotal.appendChild(contentTableTotal);
        }
        console.log("nombre cargados correctamente", allOperators)
    }
}

// calcular las horas totales por operadores
function getOperatorHoursSummary(elements) {
    let operatorData = {};
    // Agrupar por operador y sumar las horas totales
    elements.forEach(element => {
        let operator = element.operator;
        let hours = element.totalDay;

        if (!operatorData[operator]) {
            operatorData[operator] = {
                count: 0,      // Cantidad de ocurrencias
                totalHours: 0  // Total de horas trabajadas
            };
        }
        operatorData[operator].count += 1;
        operatorData[operator].totalHours += hours;
    });

    // Extraer todos los operadores y sus horas totales
    let allOperators = Object.entries(operatorData).map(([operator, data]) => ({
        operator,
        totalHours: data.totalHours
    }));

    return allOperators;
}

// Usar la función
let  allOperators = getOperatorHoursSummary(newElements);
// Resultados
console.log("Todos los operadores con horas totales:", allOperators);

// usar funcion para hacer el resumen
writeNamePerPerson();


// Actualizar la tabla de resumen
function updateSummaryTable() {
    let allOperators = getOperatorHoursSummary(newElements);
    tBodyTotal.innerHTML = ""; // Limpiar la tabla de resumen

    allOperators.forEach(operatorData => {
        let summaryRow = document.createElement('tr');
        summaryRow.innerHTML = `
        <td>${operatorData.operator}</td>
        <td>${operatorData.totalHours}</td>`;
        tBodyTotal.appendChild(summaryRow);
    });
}