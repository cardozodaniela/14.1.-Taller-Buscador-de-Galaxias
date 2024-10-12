let getJSONData = function(url) {
    let result = {};
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            return result;
        });
}

function mostrarImagen(galaxyArray) {
    let htmlContentToAppend = "";

    for (let i = 0; i < galaxyArray.length; i++) {
        let galaxy = galaxyArray[i];

        if (galaxy.data.length > 0 && galaxy.links.length > 0) {
            htmlContentToAppend += `
            <div id="card" class="col-lg-4">
                <div class="card mb-4 custom-card">
                    <img id="imagen" class="bd-placeholder-img card-img" src="${galaxy.links[0].href}" alt="Imagen representativa">
                    <div class="card-body">
                        <h4>${galaxy.data[0].title}</h4>
                        <p class="description">${galaxy.data[0].description || "Descripción no disponible."}</p>
                        <p>${galaxy.data[0].date_created || "Fecha no disponible."}</p>
                    </div>
                </div>
            </div>`;
        }
    }

    document.getElementById("contenedor").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function() {

    let galaxyArray = []; 

    // Evento para el botón de búsqueda
    document.getElementById("btnBuscar").addEventListener("click", function() {
        let inputBuscar = document.getElementById('inputBuscar').value;
        let searchQuery = encodeURIComponent(inputBuscar.trim());
        const NASA_URL = `https://images-api.nasa.gov/search?q=${searchQuery}`; // Construye la URL

        getJSONData(NASA_URL).then(function(resultObj) {
            if (resultObj.status === "ok") {
                galaxyArray = resultObj.data.collection.items; 
                mostrarImagen(galaxyArray);
            } else {
                alert("No se encontraron resultados para la búsqueda.");
            }
        });
    });
});