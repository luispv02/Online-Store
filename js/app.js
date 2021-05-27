//VARIABLES

//Mostrar Tabla
const iconoCarrito = document.querySelector('#icono-carrito');
let oculto = true;

//Filtrar articulos
const listaProductos = document.querySelector('.lista-productos')

//Tipo
const playeras = document.querySelector('#playeras')
const camisas = document.querySelector('#camisas')
const pantalones = document.querySelector('#pantalones')
const sudaderas = document.querySelector('#sudaderas')
const vestidos = document.querySelector('#vestidos')
const zapatos = document.querySelector('#zapatos')

//Filtrar por
const genero = document.querySelector('#genero')
const marca = document.querySelector('#marca')
const talla = document.querySelector('#talla')
const color = document.querySelector('#color')

//Btn agregar
const btnAgregar = document.querySelector('.lista-productos');
const tbody =  document.querySelector('tbody')

let carrito = []


const infoArticulo = {
    tipo: '',
    genero: '',
    marca: '',
    talla:'',
    color:'',
}

//EVENTOS
window.addEventListener('DOMContentLoaded', () => {
    mostrarEnHTML(articulos)//Mostrar articulos en el HTML

    //Mostrar los articulos de LocalStorage en el carrito HTML
    carrito = JSON.parse(localStorage.getItem('articulo')) || []
    mostrarCarritoHTML();
})

iconoCarrito.addEventListener('click', mostrarListaArticulos)//Mostrar Tabla de articulos agregados al carrito
btnAgregar.addEventListener('click', agregarCarrito);
tbody.addEventListener('click', borrarArticulo);
//Eventos filtrar por
genero.addEventListener('change',(e) => {
    infoArticulo.genero = e.target.value;
    filtrarResultados()
})
marca.addEventListener('change',(e) => {
    infoArticulo.marca = e.target.value;
    filtrarResultados()
})

talla.addEventListener('change',(e) => {
    infoArticulo.talla = e.target.value;
    filtrarResultados()
})
color.addEventListener('change',(e) => {
    infoArticulo.color = e.target.value;
    filtrarResultados()
})

playeras.addEventListener('click', (e) => {
    infoArticulo.tipo = e.target.value;
    filtrarResultados();
})
camisas.addEventListener('click', (e) => {
    infoArticulo.tipo = e.target.value
    filtrarResultados();
})
pantalones.addEventListener('click', (e) => {
    infoArticulo.tipo = e.target.value
    filtrarResultados();
})
sudaderas.addEventListener('click', (e) => {
    infoArticulo.tipo = e.target.value
    filtrarResultados();
})
vestidos.addEventListener('click', (e) => {
    infoArticulo.tipo = e.target.value
    filtrarResultados();
})
zapatos.addEventListener('click', (e) => {
    infoArticulo.tipo = e.target.value
    filtrarResultados();
})


//FUNCIONES
//Mostrar la tabla de lista de articulos
function mostrarListaArticulos(){
    const listaCarrito  = document.querySelector('.lista-carrito');
    if(oculto){
        listaCarrito.style.display = 'block'
        oculto = false;
    }else{
        listaCarrito.style.display = 'none'
        oculto = true
    }

}

//Mostrar articulos en html
function mostrarEnHTML(articulos){

    //Limpiar HTML con elementos que no necesitamos
    limpiarHTML();

    articulos.forEach(articulo => {
    
        const card = document.createElement('div');
        card.classList.add('card', 'col-12', 'mx-md-3', 'col-xl-4');
    
        const {imagen, caracteristicas, marca, talla, precio,id, genero } = articulo
    
        card.innerHTML = `
            <img src="${imagen}">
            <div class="card-body">
                <h5 class="card-title caracteristica">${caracteristicas}</h5>  
                <span class="marca">Marca:<b>${marca}</b></span>
                <p>Talla: <b>${talla}</b></p>
                <span class="precio"><b>$${precio}</b></span>
                <p class="genero"><b>${genero}</b></p>
                
                <a class="mt-2">
                    <button type="button" class="btn btn-primary w-100 btn-agregar"  id="${id}" >Agregar</button>
                </a>
            </div>
        `
        listaProductos.appendChild(card)
    })
}

function limpiarHTML(){
    while(listaProductos.firstChild){
        listaProductos.removeChild(listaProductos.firstChild)
    }
}


function filtrarResultados(){
    
    alert('Se han filtrado los resultados')
    const resultadoFilter = articulos.filter(filtrarTipo).filter(filtrarGenero).filter(filtrarMarca).filter(filtrarTalla).filter(filtrarColor)

    if(resultadoFilter.length){
        mostrarEnHTML(resultadoFilter);
    }else{
        noResultados()
    }
    console.log(resultadoFilter)
    
}

function noResultados(){
    limpiarHTML();

    const error = document.createElement('p');
    error.classList.add('bg-danger', 'text-white', 'text-center', 'w-100', 'pt-2')
    error.textContent = 'No se encontraron resultados'
    error.style.height = '50px'
    listaProductos.appendChild(error)

    
    
}

function filtrarTipo(articulo){
    const {tipo} = infoArticulo;
    if(tipo){
        return articulo.tipo === tipo
    }else{
        return articulo;
    }
}

function filtrarGenero(articulo){
    const {genero} = infoArticulo
    if(genero){
        return articulo.genero === genero
    }else{
        return articulo;
    }
}

function filtrarMarca(articulo){
    const {marca} = infoArticulo
    if(marca){
        return articulo.marca === marca
    }else{
        return articulo;
    }
}

function filtrarTalla(articulo){
    const {talla} = infoArticulo
    if(talla){
        return articulo.talla === talla
    }else{
        return articulo;
    }
}

function filtrarColor(articulo){
    const {color} = infoArticulo
    if(color){
        return articulo.color === color
    }else{
        return articulo;
    }
}



//AGREGAR AL CARRITO
function agregarCarrito(e){
    if(e.target.classList.contains('btn-agregar')){
        const cardArticulo = e.target.parentElement.parentElement.parentElement;
        datosArticulo(cardArticulo)
    }
}

function datosArticulo(articulo){
    const datosObj = {
        imagen:articulo.querySelector('img').src,
        producto:articulo.querySelector('.card-title').textContent,
        marca:articulo.querySelector('.marca b').textContent,
        precio:articulo.querySelector('.precio b').textContent,
        genero:articulo.querySelector('.genero b').textContent,
        cantidad: 1,
        id:articulo.querySelector('.btn-agregar').getAttribute('id'),
    }

    //Cambiar cantidad al agregar 2 o mas veces el mismo curso
    const existe = carrito.some(carrito => carrito.id === datosObj.id);
    if(existe){
        const articulosDuplicados = carrito.map(articulo => {
            if(articulo.id === datosObj.id){
                articulo.cantidad++;
                return articulo;
            }else{
                return articulo;
            }
        })
        carrito = [...articulosDuplicados]
    }else{
        carrito = [...carrito, datosObj];
    }
    
    console.log(carrito)
    mostrarCarritoHTML();

    

}

function mostrarCarritoHTML(){

    limpiarRepetidos();

    carrito.forEach(articulo => {
        const tr = document.createElement('tr');

        const {imagen,producto,marca,precio,genero,cantidad} = articulo
        tr.classList.add('mt-2')
        tr.innerHTML = `
            <img src="${imagen}" width="120" height="150">
            <td>${producto}</td>
            <td>${marca}</td>
            <td>${precio}</td>
            <td>${genero}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="btn borrar" id="${articulo.id}"> X </a>
            </td>
        `

        tbody.appendChild(tr)
    })

    //Agregar LocalStorage
    agregarLocalStorage();
}

function agregarLocalStorage(){
    localStorage.setItem('articulo', JSON.stringify(carrito));
}

function limpiarRepetidos(){
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild)
    }
}

function borrarArticulo(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar')){
        const articuloId = e.target.getAttribute('id');
        carrito = carrito.filter(articulo => articulo.id !== articuloId);
        console.log(carrito)
        mostrarCarritoHTML();
    }
}