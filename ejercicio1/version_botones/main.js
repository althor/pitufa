function selectRating(value) {
  const buttons = document.querySelectorAll(".rating-item button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
  });

document.querySelector("#rating" + value).classList.add("selected");
document.querySelector(".ratingInput").value = value;
}

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

const buttons = document.querySelectorAll(".rating-item button");

buttons.forEach((button) => {button.addEventListener("click", () => {selectRating(button.innerHTML)})}
)

document.querySelector("form").addEventListener("submit", (event) => tratarFormulario(event));