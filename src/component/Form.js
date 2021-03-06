import React from 'react';
import './FormP.css';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const baseUrl = "https://pedidos-justybueno-backend.herokuapp.com/"

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    res.sendStatus(200);
    Form.use(allowCrossDomain);
}



const RegisterPed = event => {
    event.preventDefault();
    PostProd(localStorage.getItem('nameStorage'), localStorage.getItem('prodStorage'), localStorage.getItem('cantStorage'), localStorage.getItem('tiendaStorage'), localStorage.getItem('textStorage'));

};

function PostProd(namec, prod, cant, tiendac, textc) {
    console.log(namec)
    console.log(prod)
    console.log(cant)
    console.log(tiendac)
    console.log(textc)

    var pedido = {
        nombre: namec,
        Tienda: {
            nombre: tiendac
        },
        ordenes:[
            {
                producto:{
                nombre:prod
            },
            cantidad: cant
        }],
        //asunto: cant,
        descripcion: textc,
        estado:"Recibido"
    }
    console.log(pedido);
    axios.post(baseUrl + '/pedidos', pedido)
        .then(function (response) {
            console.log(response);
            alert("Ha podido enviar correctamente su pedido!");
        })
        .catch(function (error) {
            console.log(error);
            alert("Ooops!. Hubo un error en el registro de su pedido.\nIntentelo de nuevo");
        });
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            prodname: '',
            cantidad: '',
            tienda: '',
            text: '',
            products: [],
            tiendas: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleprodname=this.handleprodname.bind(this);
        this.handletienda=this.handletienda.bind(this);
    }


    handleprodname(e) {
        
        this.setState({ prodname: e.target.value });
      }
      handletienda(e) {
        
        this.setState({ tienda: e.target.value });
      }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        localStorage.setItem('nameStorage', this.state.name)
        localStorage.setItem('prodStorage', this.state.prodname)
        localStorage.setItem('cantStorage', this.state.cantidad)
        localStorage.setItem('tiendaStorage', this.state.tienda)
        localStorage.setItem('textStorage', this.state.text)


    }
    validar() {
        return this.state.name.length !== 0 && this.state.prodname.length !== 0 &&
            this.state.cantidad.length !== 0 && this.state.tienda.length !== 0 &&
            this.state.text.length !== 0;
    }




    handleSubmit(event) {
        alert(this.state.name + ', Request Received Correctly :)');
        event.preventDefault();
        window.location.reload();
    }
    componentDidMount() {
        axios.get(baseUrl + '/productos')
            .then(res => {
                const getproducts = res.data;
                this.setState({ products: getproducts });
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(baseUrl + '/tiendas')
            .then(res => {
                const getTiendas = res.data;
                this.setState({ tiendas: getTiendas });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const listProductos = this.state.products.map(producto =>
            <MenuItem key={producto.nombre} value={producto.nombre}>
                {producto.nombre}
            </MenuItem>
        );
        const listTiendas = this.state.tiendas.map(tienda =>
            <MenuItem key={tienda.nombre} value={tienda.nombre}>
                {tienda.nombre}
            </MenuItem>
        );
        return (
            <div className="App">
                <div className="container">
                    <div className="columns">
                        <div className="column is-9">
                            
                            <form className="form" onSubmit={this.handleSubmit}>
                                <TextField
                                    id="priority-todo"
                                    select
                                    label="Seleccione"
                                    value={this.state.prodname}
                                    onChange={this.handleprodname}
                                    helperText="Por favor seleccione el producto"
                                    margin="normal"
                                >
                                    {listProductos}
                                </TextField>

                                <p></p>
                               
                                <TextField
                                    id="priority-todo"
                                    select
                                    label="Seleccione"
                                    value={this.state.tienda}
                                    onChange={this.handletienda}
                                    helperText="Por favor seleccione el tienda"
                                    margin="normal"
                                >
                                    {listTiendas}
                                </TextField>
                                <p></p>
                                <input
                                    className="formInput left"
                                    name="name"
                                    placeholder="Nombre"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange} />
                                    <p></p>
                                     <input
                                    className="formInput left"
                                    name="cantidad"
                                    placeholder="cantidad"
                                    type="text"
                                    value={this.state.cantidad}
                                    onChange={this.handleChange} />
                                


                                <textarea
                                    className="formInput"
                                    id="text"
                                    name="text"
                                    placeholder="Descripción"
                                    type="text"
                                    value={this.statetext}
                                    onChange={this.handleChange}
                                    required
                                />
                                

                                <br />
                                

                                {/* submit button */}
                                <input
                                    className="button"
                                    type="submit"
                                    disabled={!this.validar()}
                                    onClick={RegisterPed}
                                    value="Enviar" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form;
