//VARIABLES

//Mostrar Table
const iconoCarrito = document.querySelector('#icono-carrito');
let oculto = true;

//Filtrar articulos
const listaProductos = document.querySelector('.lista-productos')

const playeras = document.querySelector('#playeras')
const camisas = document.querySelector('#camisas')
const pantalones = document.querySelector('#pantalones')
const sudaderas = document.querySelector('#sudaderas')
const vestidos = document.querySelector('#vestidos')
const zapatos = document.querySelector('#zapatos')

const infoArticulo = {
    tipo: '',
    genero: '',
    marca: '',
    talla:'',
    color:'',
}

//EVENTOS
iconoCarrito.addEventListener('click', mostrarListaArticulos)

playeras.addEventListener('click', (e) => {
    infoArticulo.tipo = e.target.value
    console.log(infoArticulo)
})



//FUNCIONES

//Mostrar la tabla de lista de articulos
function mostrarListaArticulos(){
    const listaCarrito  = document.querySelector('.lista-carrito');
    if(oculto){
        listaCarrito.style.display = 'block'
        oculto = false;
        console.log(oculto)
    }else{
        listaCarrito.style.display = 'none'
        oculto = true
    }

}

//Mostrar articulos en html
articulos.forEach(articulo => {
    
    const card = document.createElement('div');
    card.classList.add('card');

    const {tipo, caracteristicas, marca, talla, precio,id } = articulo

    card.innerHTML = `
        <p>${tipo}</p>
        <div class="card-body">
            <h5 class="card-title caracteristica">${caracteristicas}</h5>  
            <span class="marca"><b>Marca:</b>${marca}</span>
            <p><b>Talla</b>: ${talla}</p>
            <span class="precio"><b>$${precio}</b></span>
            
            <a class="btn-agregar mt-2" id="${id}">
                <button type="button" class="btn btn-primary w-100" >Agregar</button>
            </a>
        </div>
    `
    listaProductos.appendChild(card)
})

