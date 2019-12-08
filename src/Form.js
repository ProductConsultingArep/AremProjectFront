import React from 'react';
import './FormP.css';
import axios from 'axios';


const baseUrl = "http://localhost:8080"



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

    axios.post(baseUrl + '/user', {
        username: prod,
        nombre: namec,
        tienda: tiendac,
        asunto: cant,
        texto: textc

    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
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
            text: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        localStorage.setItem('tiendaStorage', this.state.email)
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

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="columns">
                        <div className="column is-9">
                            <form className="form" onSubmit={this.handleSubmit}>

                                <input
                                    className="formInput left"
                                    name="name"
                                    placeholder="Name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange} />

                                <input
                                    className="formInput right"
                                    name="prodname"
                                    placeholder="producto"
                                    type="text"
                                    value={this.state.prodname}
                                    onChange={this.handleChange} />

                                <input
                                    className="formInput left"
                                    name="cantidad"
                                    placeholder="cantidad"
                                    type="text"
                                    value={this.state.cantidad}
                                    onChange={this.handleChange} />
                                <input
                                    className="formInput right"
                                    name="tienda"
                                    placeholder="Tienda"
                                    type="text"
                                    value={this.state.tienda}
                                    onChange={this.handleChange}
                                    required
                                />

                                <br />


                                <textarea
                                    className="formInput"
                                    id="text"
                                    name="text"
                                    placeholder="Text"
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
