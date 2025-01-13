function tratarFormulario(event) {
    event.preventDefault();
    let form = new FormData(event.target); 
    let userRating = form.get("rating"); 
    let finalTemplate = `
        <div class="final-container">
            <img src="./img/illustration-thank-you.svg">
            <p class="final-message">seleccionaste ${userRating} de 5</p>
            <p class="highlighted-message">¡Gracias!</p>
            <p>Agradecemos que te hayas tomado el tiempo de dar una calificación.</p>
            <p>Si alguna vez necesitas más ayuda, no dudes en volver a ponerte en contacto con nosotros. </p>
        </div>
    `;

    
    document.querySelector("main").innerHTML = finalTemplate;
}

document.querySelector("form").addEventListener("submit", (event) => tratarFormulario(event));