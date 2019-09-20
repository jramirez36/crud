//funciones nuevas push sirve para subir algo a una cadena , pop elimina el ultimo elemento de un array
class articulo {
    constructor(articulo = [], tabla, llave) 
    {
        this._articulo = articulo;
        this._tabla = tabla;
        this._llave = llave;
    }
    agregar(ubicacion, nombre, precio, cantidad, descripcion, llave) 
    {
        if (ubicacion === '' || ubicacion === (this._articulo.length + 1).toString()) 
        {
            this._llave = llave;
            this._articulo.push(new producto(this._llave, nombre, precio, cantidad, descripcion));
            this._llave++;
            console.log('articulo agregado');
        } 
        else if (Number(ubicacion) > 0 && Number(ubicacion) < this._articulo.length) 
        {
            for (let i = this._articulo.length; i >= Number(ubicacion); i--) 
            {
                this._articulo[i] = this._articulo[i - 1];
            }
            this._articulo[Number(ubicacion) - 1] = new producto(this._llave, nombre, precio, cantidad, descripcion);
            this._llave++;
            console.log('articulo agregado correctamente');
        } 
        else
        {
            console.log('Posicion no válida');
        }
        this.impresion();
    }
    buscar(codigo) 
    {
        codigo = Number(codigo);
        let buscador = '';
        if (this.revision(codigo) === 1) 
        {
            this._articulo.forEach(buscarArticulo => {
                if (buscarArticulo.codigo === codigo) 
                {
                    buscador = buscarArticulo;
                    return;
                }
            });
        } 
        else 
        {
            console.log('No se ha podido encontrar el articulo');
        }
        return buscador;
    }
    eliminar(codigo) 
    {
        codigo = Number(codigo);
        if (this.revision(codigo) === 1) 
        {
            if (codigo != this.articulo.length) 
            {
                for (let i = codigo - 1; i < this._articulo.length - 1; i++) 
                {
                    this._articulo[i] = this._articulo[i + 1];
                }
                this._articulo.pop();
            } 
            else
            {
                this._articulo.pop();
            }
            console.log('Se ha eliminado el articulo correctamente');
        } 
        else 
        {
            console.log('El código ingresado no existe, por favor verifique de nuevo');
        }
    }
    revision(codigo) {
        let existe = 0;
        for (let i = 0; i < this._articulo.length; i++) 
        {
            if (this._articulo[i].codigo === codigo) 
            {
                existe = 1;
                break;
            }
        }
        return existe;
    }
    impresion() {
        this._tabla.innerHTML = '';
        let etiquetaP = [];
        for (let i = 0; i < this._articulo.length; i++) 
        {
            etiquetaP[i] = document.createElement('p');
        }
        for (let i = 0; i < this._articulo.length; i++) 
        {
            etiquetaP[i].innerHTML = this._articulo[i].toString();
            this._tabla.appendChild(etiquetaP[i]);
        }
    }
    get articulo() 
    {
        return this._articulo;
    }
    get llave() 
    {
        return this._llave;
    }
}
//impreciones
class producto{
    constructor(codigo, nombre, precio, cantidad, descripcion)
    {
        this._codigo = codigo;
        this._nombre = nombre;
        this._precio = precio;
        this._cantidad = cantidad;
        this._descripcion = descripcion;
    }
    get codigo()
    {
        return this._codigo;
    }
    toString()
    {
        return 'Código: ' + this._codigo + ' Nombre: ' + this._nombre + ' Precio: $' + this._precio + ' Cantidad: ' + this._cantidad + ' Descripción: ' + this._descripcion ;
    }
}
//botones
var almacen = new articulo(new Array(), document.querySelector('#tablaArticulos'), Number(document.querySelector('#codigo').value));
document.querySelector('#agregar').addEventListener('click', () => {
    let llave = Number(document.querySelector('#codigo').value);
    let ubicacion = document.querySelector('#ubicacion').value;
    let nombre = document.querySelector('#nombre').value;
    let precio = document.querySelector('#precio').value;
    let cantidad = document.querySelector('#cantidad').value;
    let descripcion = document.querySelector('#descripcion').value;

    almacen.agregar(ubicacion, nombre, precio, cantidad, descripcion, llave);
    document.querySelector('#codigo').value = almacen.llave;
});
document.querySelector('#buscar').addEventListener('click', () => {
    let buscarArticulo = almacen.buscar(document.querySelector('#buscarCodigo').value);
    document.querySelector('#tablaBuscar').innerHTML = buscarArticulo;
});
document.querySelector('#eliminar').addEventListener('click', () => {
    almacen.eliminar(document.querySelector('#eliminarCodigo').value);
    document.querySelector('#codigo').value = almacen.llave;
});