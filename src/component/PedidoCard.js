import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import OrdenCard from './OrdenCard.js';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  /*const listOrdenes = props.ordenes.map(orden =>
    <OrdenCard 
        key={props.orden.id}>
        producto = {props.orden.producto.nombre}
        cantidad = {props.orden.cantidad}
        >
    </OrdenCard>
  );*/

  React.useEffect(() => {
    console.log(props.ordenes);
}, []);

const listTiendas = props.ordenes.map(orden =>
    <OrdenCard 
        key={orden.id}
        producto={orden.producto}
        cantidad={orden.cantidad}    
    >
        
    </OrdenCard>
);

  return (

    <Paper className={classes.root}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.descripcion}
        </Typography>
        <Typography variant="h5" component="h2">
          id: {props.id}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          estado: {props.estado}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          ORDENES:
        </Typography>
        {listTiendas}
    </Paper>
  );
}
