document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const codigo529Input = document.getElementById("codigo529");
  const codigo530Input = document.getElementById("codigo530");
  const codigo409Input = document.getElementById("codigo409");
  const ingresarPropuestaBtn = document.getElementById("ingresarPropuestaBtn");
  const borrarDatosBtn = document.getElementById("borrarDatosBtn");
  const guardarDatosBtn = document.getElementById("guardarDatosBtn");
  const validarBtn = document.getElementById("validarBtn");
  const enviarBtn = document.getElementById("enviarBtn");
  const formularioCompletoBtn = document.getElementById(
    "formularioCompletoBtn"
  );
  const alert529 = document.getElementById("alert529");
  const alert530 = document.getElementById("alert530");
  const modal = document.getElementById("validationModal");
  const closeModal = document.querySelector(".close");
  const validationTableBody = document.getElementById("validationTableBody");

  // Constantes
  const VECTOR_A = 1000000; // Valor conocido para Código 529
  const VECTOR_B = 500000; // Valor conocido para Código 530
  const VALOR_MAXIMO = 999999999;

  // Función para formatear un número con separador de miles
  function formatearNumero(numero) {
    return numero.toLocaleString("es-CL"); // Formato chileno (punto como separador de miles)
  }

  // Función para convertir un número formateado a un valor numérico
  function convertirANumero(valorFormateado) {
    return parseFloat(valorFormateado.replace(/\./g, "")); // Elimina los puntos y convierte a número
  }

  // Función para aplicar formato a un campo de entrada
  function aplicarFormato(input) {
    const valor = input.value.replace(/\./g, ""); // Elimina los puntos existentes
    if (!isNaN(valor)) {
      const numero = parseFloat(valor);
      input.value = formatearNumero(numero); // Aplica el formato
    }
  }

  // Función para validar números
  function validarNumero(input, alertElement, vector) {
    const valor = convertirANumero(input.value);
    if (isNaN(valor)) {
      alertElement.textContent = "Ingrese solo números al campo.";
      alertElement.style.display = "block";
      return false;
    }
    if (valor < 0) {
      alertElement.textContent = "El valor debe ser igual o mayor que 0.";
      alertElement.style.display = "block";
      return false;
    }
    if (valor > VALOR_MAXIMO) {
      if (
        confirm(
          "El valor ingresado es superior a 999,999,999. ¿Está seguro que no es error de tipeo?"
        )
      ) {
        return true;
      } else {
        input.value = "";
        return false;
      }
    }
    if (vector && valor > vector * 1.3) {
      alertElement.textContent =
        "El valor ingresado es superior al valor conocido por el SII. ¿Está seguro de ingresar este valor?";
      alertElement.style.display = "block";
      return true;
    }
    alertElement.style.display = "none";
    return true;
  }

  // Función para calcular el IVA
  function calcularIVA() {
    const ventas = convertirANumero(codigo529Input.value);
    const credito = convertirANumero(codigo530Input.value);
    if (!isNaN(ventas) && !isNaN(credito)) {
      const iva = (ventas / 1.19) * 0.19 - credito;
      codigo409Input.value = formatearNumero(iva); // Formatea el resultado
    }
  }

  // Habilitar botón de validar
  function habilitarValidar() {
    if (codigo529Input.value && codigo530Input.value) {
      validarBtn.disabled = false;
    } else {
      validarBtn.disabled = true;
    }
  }

  // Eventos para los campos de entrada
  codigo529Input.addEventListener("input", function () {
    aplicarFormato(codigo529Input);
    if (validarNumero(codigo529Input, alert529, VECTOR_A)) {
      calcularIVA();
      habilitarValidar();
    }
  });

  codigo530Input.addEventListener("input", function () {
    aplicarFormato(codigo530Input);
    if (validarNumero(codigo530Input, alert530, VECTOR_B)) {
      calcularIVA();
      habilitarValidar();
    }
  });

  // Botón Ingresar Propuesta
  ingresarPropuestaBtn.addEventListener("click", function () {
    codigo529Input.value = formatearNumero(VECTOR_A);
    codigo530Input.value = formatearNumero(VECTOR_B);
    calcularIVA();
    habilitarValidar();
  });

  // Botón Borrar Datos
  borrarDatosBtn.addEventListener("click", function () {
    codigo529Input.value = "";
    codigo530Input.value = "";
    codigo409Input.value = "";
    alert529.style.display = "none";
    alert530.style.display = "none";
    validarBtn.disabled = true;
  });

  // Botón Guardar Datos
  guardarDatosBtn.addEventListener("click", function () {
    const ventas = convertirANumero(codigo529Input.value);
    const credito = convertirANumero(codigo530Input.value);
    const iva = convertirANumero(codigo409Input.value);

    if (!isNaN(ventas) && !isNaN(credito) && !isNaN(iva)) {
      alert("Datos guardados correctamente.");
    } else {
      alert("Por favor, complete todos los campos correctamente.");
    }
  });

  // Botón Validar
  validarBtn.addEventListener("click", function () {
    const ventas = convertirANumero(codigo529Input.value);
    const credito = convertirANumero(codigo530Input.value);

    // Generar la tabla con valores formateados
    validationTableBody.innerHTML = `
            <tr>
                <td>Código 529</td>
                <td>${formatearNumero(ventas)}</td>
                <td>${formatearNumero(VECTOR_A)}</td>
                <td>${formatearNumero(ventas - VECTOR_A)}</td>
            </tr>
            <tr>
                <td>Código 530</td>
                <td>${formatearNumero(credito)}</td>
                <td>${formatearNumero(VECTOR_B)}</td>
                <td>${formatearNumero(credito - VECTOR_B)}</td>
            </tr>
        `;

    // Mostrar el modal
    modal.style.display = "flex";
  });

  // Cerrar el modal
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Botón Enviar
  enviarBtn.addEventListener("click", function () {
    alert("Formulario enviado.");
  });

  // Botón Ir a formulario completo
  formularioCompletoBtn.addEventListener("click", function () {
    alert("Redirigiendo al formulario completo.");
  });
});
