let selectedCell; // Variable para almacenar la celda seleccionada

document.addEventListener("DOMContentLoaded", function() {
    updateCalendar();
    setInterval(updateCalendar, 60000); 
});

function updateCalendar() {
    const table = document.getElementById("calendar-table");
    table.innerHTML = ""; // Limpiar tabla antes de actualizar

    const currentDate = new Date();
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    // Encabezado de días
    const headerRow = table.insertRow();
    headerRow.insertCell(); // Celda vacía para la esquina superior izquierda
    for (let i = 0; i < 7; i++) {
        const dayCell = headerRow.insertCell();
        const date = new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000);
        dayCell.textContent = `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
    }

    // Horas
    for (let hour = 8; hour <= 22; hour++) {
        const row = table.insertRow();
        const hourCell = row.insertCell();
        hourCell.textContent = `${hour}:00 - ${hour + 1}:00`;
        hourCell.classList.add("hour-block");

        for (let i = 0; i < 7; i++) {
            const dayCell = row.insertCell();
            dayCell.classList.add("hour-block");
            dayCell.setAttribute("data-hour", hour);
            dayCell.setAttribute("data-day", i);
            dayCell.addEventListener("click", openPopup);
            dayCell.textContent = ""; // Vaciar contenido de la celda
        }
    }
}

function openPopup(event) {
    selectedCell = event.target;
    const hour = selectedCell.getAttribute("data-hour");
    const day = selectedCell.getAttribute("data-day");
    const dayName = selectedCell.parentElement.cells[1].textContent;
    const date = new Date();
    date.setDate(date.getDate() + parseInt(day));
    const dateString = `${dayName} ${date.getDate()}/${date.getMonth() + 1} ${hour}:00 - ${parseInt(hour) + 1}:00`;
    document.getElementById("popup").style.display = "block";
    document.getElementById("popup").querySelector("h2").textContent = `Reservar turno para el dia ${dateString}`;
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.getElementById("reservation-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario
    const name = document.getElementById("name").value;
    selectedCell.textContent = name; // Actualizar contenido de la celda seleccionada con el nombre del usuario
    closePopup(); // Cerrar el popup después de reservar
});