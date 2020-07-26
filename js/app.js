//Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
//Lista de Cursos en el carrito
const listaCursos = document.querySelector('#lista-carrito tbody');
//Botón Vaciar Carrito
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');



//Listeners

cargarEventListeners();

function cargarEventListeners(){
    //Dispara cuando se presiona "Agregar al Carrito"
    cursos.addEventListener('click', comprarCurso);

    //Cuando se eliminan cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Botón de Vaciar Carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    //Al cargar la página, mostrar Local Storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

//Funciones
//Función que Agregar cursos al carrito
function comprarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;

        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    };
}

//Lee los datos del curso

function leerDatosCurso(curso){

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);

}

//Muestra el curso seleccionado en el carrito

function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td> 
    <img src="${curso.imagen}" width=100>
    </td>
    <td>
    ${curso.titulo}
    </td>
    <td>
    ${curso.precio}
    </td>
    <td>
    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
    </td>
    `;

    listaCursos.appendChild(row);

    //Función para almacenar cursos en LocalStorage
    guardarCursoLocalStorage(curso); 
}

//Elimina el curso del carrito
function eliminarCurso(e){
    e.preventDefault();

    let curso;
    let cursoId;
    if(e.target.classList.contains('borrar-curso') ){
        e.target.parentElement.parentElement.remove();

        curso = e.target.parentElement.parentElement;

        cursoId = curso.querySelector('a').getAttribute('data-id');

    } 

    eliminarCursoLocalStorage(cursoId);
}

//Función para vaciar el carrito

function vaciarCarrito(){
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    //Vaciar local storage
    vaciarLocalStorage();

    return false;

}

//Función para almacenar cursos en el carrito

function guardarCursoLocalStorage(curso){
    let cursos;

    cursos = obtenerCursosLocalStorage();

//El curso seleccionado se agrega al carrito
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos) );

}

//Comprueba que haya elementos en el carrito

function obtenerCursosLocalStorage(){
    let cursosLS;

    if(localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos') );
    }

    return cursosLS;   
}

//Imprime los cursos del local Storage en el carrito

function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        //Construir el template

        const row = document.createElement('tr');
        row.innerHTML = `
        <td> 
        <img src="${curso.imagen}" width=100>
        </td>
        <td>
        ${curso.titulo}
        </td>
        <td>
        ${curso.precio}
        </td>
        <td>
        <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
        `;
    
        listaCursos.appendChild(row); 
    });
}

//Eliminar el curso del Local Storage

function eliminarCursoLocalStorage(curso){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id === curso) {
            cursosLS.splice(index, 1); 
        }

        localStorage.setItem('cursos', JSON.stringify(cursosLS) );
    });
}

//Función de vaciar el Local Storage

function vaciarLocalStorage(){
    localStorage.clear();
}