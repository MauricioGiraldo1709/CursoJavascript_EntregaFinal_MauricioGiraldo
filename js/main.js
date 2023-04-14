const servicios = [ 
    {id:1, nombre: 'Show Infantil', precio: 900, foto: "./img/showinfantil.jpg", cantidad:1},
    {id:2, nombre: 'Decoración de Globos', precio: 400, foto: "./img/decoracionglobos.jpg", cantidad:1},
    {id:3, nombre: 'Decoración Matrimonial', precio: 500, foto: "./img/decomatrimonio.jpeg", cantidad:1},
    {id:4, nombre: 'Show y Decoración', precio: 1200, foto: "./img/show+decoracion.jpeg", cantidad:1},
    {id:5, nombre: 'Show de Burbujas', precio: 450, foto: "./img/showburbujas.jpg", cantidad:1},
]
let carrito = JSON.parse(localStorage.getItem("carrito")) || []
let modalContainer = document.getElementById('modal-carrito')
let verCarro = document.getElementById('ver-carrito')
let cantidadCarrito = document.getElementById('cantidadCarrito')

function listaDeServicios(){
    for (const servicio of servicios) {
        let tarjetaServicio = document.createElement('div')
        tarjetaServicio.innerHTML = `<img src = ${servicio.foto} class = "img-tarjeta">
                                    <h3>${servicio.nombre} </h3> 
                                    <h3>$${servicio.precio}</h3>
                                    <button class="btn-add" id=${servicio.id}>Agregar al carrito</button>`
        tarjetaServicio.className = 'tarjeta col-sm-12 col-md-3 col-lg-4'
        let lista = document.getElementById('listaDeServicios')
        lista.append(tarjetaServicio)
        let btnAgregar = document.getElementById(`${servicio.id}`)
        btnAgregar.addEventListener("click", () => {
            Toastify({
                text: "El servicio fue agregado al carrito!",
                className: "info",
                gravity: "bottom",
                position: "left",
                style: {
                  background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
              }).showToast();
            const repeat = carrito.some((repeatServicio) => repeatServicio.id === servicio.id)
            if (repeat) {
                carrito.map((serv) => {
                    if (serv.id === servicio.id) {
                        serv.cantidad++
                    }
                })
            }else{
                carrito.push({
                    id: servicio.id,
                    img: servicio.foto,
                    nombre: servicio.nombre,
                    precio: servicio.precio,
                    cantidad: servicio.cantidad
                })
                console.log(carrito)
                carritoContador()
                guardarEnLocal()
            }
        })
    }
}

const guardarEnLocal = () =>{
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

listaDeServicios()
