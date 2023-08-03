$(document).ready(function() {
  // Función para mostrar todos los amigos al hacer clic en el botón
  $("#btn").click(function() {
    $.get("http://localhost:5000/amigos", function(data) {
      const lista = $("#lista");
      lista.empty(); // Limpiamos la lista antes de agregar los amigos

      data.forEach(function(amigo) {
        lista.append("<li>" + amigo.name + " - Edad: " + amigo.age + " - Email: " + amigo.email + "</li>");
      });
    });
  });

  // Función para buscar un amigo por su ID al hacer clic en el botón "Buscar"
  $("#search").click(function() {
    const amigoId = $("#input").val();

    if (amigoId) {
      $.get("http://localhost:5000/amigos/" + amigoId, function(data) {
        const amigoEncontrado = $("#amigo");
        amigoEncontrado.empty(); // Limpiamos el contenido antes de mostrar el amigo

        if (data) {
          amigoEncontrado.text("Amigo encontrado: " + data.name);
        } else {
          amigoEncontrado.text("No se encontró un amigo con el ID proporcionado.");
        }
      });
    }
  });

  // Función para borrar un amigo por su ID al hacer clic en el botón "Delete"
  $("#delete").click(function() {
    const amigoIdBorrar = $("#inputDelete").val();

    if (amigoIdBorrar) {
      $.ajax({
        url: "http://localhost:5000/amigos/" + amigoIdBorrar,
        type: "DELETE",
        success: function() {
          $("#success").text("Amigo borrado correctamente.");
        },
        error: function() {
          $("#success").text("No se pudo borrar el amigo. Verifica el ID proporcionado.");
        }
      });
    }
  });
});





