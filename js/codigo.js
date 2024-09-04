document.addEventListener("DOMContentLoaded", function() {
    const botonBuscar = document.querySelector("button[type='button']:not(#btn-borrar)");
    const botonBorrar = document.getElementById("btn-borrar");
    const campoBusqueda = document.getElementById("buscar");

    function realizarBusqueda() {
        const consulta = campoBusqueda.value.trim().toLowerCase();
        const encabezados = document.querySelectorAll("h2");
        let encontrado = false;

        encabezados.forEach(encabezado => {
            const lista = encabezado.nextElementSibling;
            let tieneCoincidencia = false;

            if (lista && lista.tagName === "UL") {
                const recetas = lista.querySelectorAll("li");

                recetas.forEach(receta => {
                    const tituloReceta = receta.querySelector("h3").textContent.toLowerCase();

                    if (tituloReceta.includes(consulta)) {
                        receta.style.display = "list-item";
                        tieneCoincidencia = true;
                        encontrado = true;
                    } else {
                        receta.style.display = "none";
                    }
                });

                if (tieneCoincidencia) {
                    encabezado.style.display = "block";
                    lista.style.display = "block";
                } else {
                    encabezado.style.display = "none";
                    lista.style.display = "none";
                }
            }
        });

        if (!encontrado && consulta) {
            alert("No se encontraron recetas que coincidan con tu búsqueda.");
        }
    }

    botonBuscar.addEventListener("click", realizarBusqueda);

    botonBorrar.addEventListener("click", function() {
        // Restablece el buscador
        campoBusqueda.value = "";

        const encabezados = document.querySelectorAll("h2");
        encabezados.forEach(encabezado => {
            const lista = encabezado.nextElementSibling;
            if (lista && lista.tagName === "UL") {
                const recetas = lista.querySelectorAll("li");
                recetas.forEach(receta => {
                    receta.style.display = "list-item";
                });
                encabezado.style.display = "block";
                lista.style.display = "block";
            }
        });
    });

    // Eliminamos el evento que dispara la búsqueda al escribir en el campo
    // campoBusqueda.removeEventListener("input", realizarBusqueda);

    campoBusqueda.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita el comportamiento por defecto del formulario
            realizarBusqueda();
        }
    });
});
