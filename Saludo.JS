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
