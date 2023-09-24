document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.querySelector('.ityped');
    
    new Typed(textElement, {
        strings: ['Bienvenidos', 'Les Saluda', 'Hotel Nuevo Milenio'],
        typeSpeed: 100, // Velocidad de escritura
        backSpeed: 90, // Velocidad de borrado
        startDelay: 500, // Retardo antes de comenzar
        backDelay: 1000, // Retardo antes de borrar completamente (incrementado a 2000)
        loop: true, // Repetir la animación
        showCursor: true // Mostrar el cursor
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".image-slider img");
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add("active");
            } else {
                img.classList.remove("active");
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    // Mostrar la primera imagen
    showImage(currentIndex);

    // Cambiar de imagen cada 3 segundos (ajusta el tiempo según tus necesidades)
    setInterval(nextImage, 3000);
});
