// API
const API_ENDPOINT = 'https://yesno.wtf/api';
// Función que maneja la tecla Enter en el campo de entrada
function handleKeyEnter(event) {
    if (event.key === 'Enter') { // Si se presiona la tecla Enter
      fetchAnswer(); // Llama a la función fetchAnswer
    }
  }
  
  // Función que deshabilita o habilita el botón dependiendo del valor del input
  function toggleButtonState() {
    const inputField = document.getElementById('input'); // Campo de entrada
    const button = document.getElementById('button'); // Botón
    // Si el campo de entrada está vacío, deshabilita el botón, si no, lo habilita
    button.disabled = !inputField.value.trim(); // Deshabilitar el botón si está vacío
  }

// Función que maneja la tecla Enter en el campo de entrada
function handleKeyEnter(event) {
  if (event.key === 'Enter') { // Si se presiona la tecla Enter
    fetchAnswer(); // Llama a la función fetchAnswer
  }
}

// Función principal para obtener la respuesta del API
async function fetchAnswer() {
  // Obtener las referencias a los elementos del DOM
  const inputField = document.getElementById('input'); // Referencia al campo de entrada
  const question = inputField.value.trim(); // Obtiene la pregunta, eliminando los espacios innecesarios
  const answerDiv = document.getElementById('answer'); // Div donde se mostrará la respuesta
  const errorField = document.getElementById('error'); // Referencia al campo donde se muestra el error

  // Verificar si el campo de entrada está vacío
  if (!question) {
    errorField.textContent = 'Please enter a question!'; // Si está vacío, muestra un mensaje de error
    return; // Detiene la ejecución si no hay pregunta
  }

  // Limpiar los posibles mensajes de error y mostrar un mensaje de carga
  errorField.textContent = ''; // Limpiar cualquier mensaje de error previo
  answerDiv.textContent = 'Cargando...'; // Mostrar el estado de carga mientras se espera la respuesta del API

  try {
    // Realizar la petición al API
    const response = await fetch(API_ENDPOINT); // Hacer la solicitud a la API
    const data = await response.json(); // Convertir la respuesta a formato JSON

    // Mostrar la respuesta obtenida del API en el div con id 'answer'
    answerDiv.innerHTML = `
      <p>${data.answer.toUpperCase()}</p> <!-- Mostrar la respuesta (Yes, No, etc.) en mayúsculas -->
    `;

    // Limpiar la pregunta y la respuesta después de 3 segundos
    setTimeout(() => {
      inputField.value = ''; // Limpiar el campo de entrada
      answerDiv.innerHTML = ''; // Limpiar la respuesta mostrada
    }, 5000); // 5000 milisegundos = 5 segundos
  } catch (error) {
    // Manejo de errores en caso de fallo en la llamada al API
    console.error('Error al obtener la respuesta:', error); // Mostrar el error en la consola
    errorField.textContent = 'Error fetching the answer. Please try again!'; // Mostrar un mensaje de error al usuario
  }
}

// Añadir un event listener al botón para que ejecute fetchAnswer al hacer clic
document.getElementById('button').addEventListener('click', fetchAnswer);

// Permitir disparar fetchAnswer al presionar Enter en el campo de entrada
document.getElementById('input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') { // Detectar si la tecla presionada es Enter
    fetchAnswer(); // Llamar a la función fetchAnswer
  }
});

// Agregar un event listener para cuando el input cambia para verificar si el botón debe ser habilitado o no
document.getElementById('input').addEventListener('input', toggleButtonState);

// Llamar a toggleButtonState al cargar la página para asegurarse de que el estado del botón sea correcto
toggleButtonState();


/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */
