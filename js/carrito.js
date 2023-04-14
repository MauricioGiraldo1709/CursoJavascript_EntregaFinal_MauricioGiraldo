const muestraCarrito = () =>{
  //Modal de servicios
    modalContainer.innerHTML = ""
    modalContainer.style.display = "flex"
    const modalCarrito = document.createElement('div')
    modalCarrito.className = 'modal-headercarro'
    modalCarrito.innerHTML = `<h1 class = "modal-headercarro-title">Carrito</h1>`
    modalContainer.append(modalCarrito)

    //Boton cerrar modal
    let modalbtn = document.createElement('h1')
    modalbtn.innerText = 'X'
    modalbtn.className = 'modal-headercarro-btn'

    modalbtn.addEventListener('click',() =>{
        modalContainer.style.display = "none"
    })
    modalCarrito.append(modalbtn)

    carrito.forEach((servicio) =>{
        let carritoContenido = document.createElement('div')
        carritoContenido.className = 'carrito-content'
        carritoContenido.innerHTML = `<img src="${servicio.img}">
                                    <h3>${servicio.nombre} </h3> 
                                    <p>$${servicio.precio}</p>
                                    <span class="restar">-</span>
                                    <p>Cantidad:${servicio.cantidad}</p>
                                    <span class="sumar">+</span>
                                    <p>Total: ${servicio.cantidad * servicio.precio}</p>`;

        modalContainer.append(carritoContenido)

        //Función restar servicio
        let restar = carritoContenido.querySelector('.restar')
        restar.addEventListener("click", () => {
            if(servicio.cantidad !== 1){
                servicio.cantidad--;
            }
            guardarEnLocal()
            muestraCarrito()
        })

        //Función sumar servicio
        let sumar = carritoContenido.querySelector('.sumar')
        sumar.addEventListener("click", () => {
                servicio.cantidad++;
                guardarEnLocal()
                muestraCarrito()
        })

        let eliminar = document.createElement('span')
        eliminar.innerText = '❌'
        eliminar.className = 'delete-servicio'
        carritoContenido.append(eliminar)
        eliminar.addEventListener('click',eliminarServicio)
    })

    //Sumatoria de servicios
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad , 0)
    //Div que muestra el total a pagar
    const totalCompra = document.createElement('div')
    totalCompra.className = 'total-content'
    totalCompra.innerHTML = `Total a pagar: ${total}`
    modalContainer.appendChild(totalCompra)

    //Boton para pagar servicios
    const ejecutarCompra = document.createElement('button')
    ejecutarCompra.className = 'btn-pagar'
    ejecutarCompra.id = 'btn-pagar'
    ejecutarCompra.innerHTML = 'Pagar Servicio(s)'
    modalContainer.appendChild(ejecutarCompra)
    ejecutarCompra.addEventListener('click',pagarServicios)
}

verCarro.addEventListener('click',muestraCarrito)

const pagarServicios = () =>{
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: '¿Está seguro de finalizar su compra?',
        text: "¡No podrá revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, voy a pagar',
        cancelButtonText: 'No, seguiré eligiendo',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Listo!',
            'Su compra ha sido realizada con éxito',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Puedes seguir eligiendo un servicio',
            'error'
          )
        }
      })

    carritoContador()
    guardarEnLocal()
    muestraCarrito()
}

const eliminarServicio = () =>{
    const encontrarID = carrito.find((element) => element.id)

    carrito = carrito.filter((carritoID) => {
        return carritoID !== encontrarID
    })
    carritoContador()
    guardarEnLocal()
    muestraCarrito()
}


const carritoContador = () =>{
    cantidadCarrito.style.display = "flex"

    const carritoLength = carrito.length

    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"))
}
carritoContador()


