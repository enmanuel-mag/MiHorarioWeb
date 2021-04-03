import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CardHeader,
  Divider,
  Button,
} from '@material-ui/core';
import { formatoIntevalo } from './../util/util';
import { profesorSelector } from '../../../redux/selectors';
import { getProfesor } from '../../../redux/actions/profesor';
import { useSelector, useDispatch } from 'react-redux';
import { GetChip } from './chips';
import DialogStats from './dialog-stats';

const useStyles = makeStyles((theme) => ({
  div: {
    padding: 0,
    alignContent: 'left',
    alignItems: 'left',
  },
  root: {
    width: '100%',
  },
}));

export default function SimpleCard(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [paralelo] = useState(props.paralelo);
  const [openStats, setOpenStats] = useState(false);
  const profesor = useSelector((state) =>
    profesorSelector(
      state,
      paralelo['profesor'] ? paralelo['profesor'] : 'SIN NOMBRE'
    )
  );
  useEffect(() => {
    if (paralelo && !profesor) {
      dispatch(
        getProfesor(
          paralelo['profesor'] ? paralelo['profesor'] : 'SIN NOMBRE',
          paralelo['codigo'],
          paralelo['nombre']
        )
      );
    }
  }, [paralelo, profesor, dispatch]);

  const handleStats = () => {
    setOpenStats(true);
  };

  const handleCloseDialogStats = () => {
    setOpenStats(false);
  };

  return paralelo && profesor ? (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {paralelo['paralelo']}
          </Avatar>
        }
        title={paralelo['profesor'] ? paralelo['profesor'] : 'SIN NOMBRE'}
        subheader={GetChip(profesor['registros'][0]['promedio'])}
        style={{ padding: 12 }}
      />
      {typeof profesor.stats !== 'undefined' ? (
        <>
          <Button
            className={classes.btnHex}
            onClick={handleStats}
            size="small"
            variant="text"
          >
            ¿Cómo se sienten los estudiantes con este profesor?
          </Button>
          <DialogStats
            id="stats-profesor"
            open={openStats}
            keepMounted
            onClose={handleCloseDialogStats}
            data={profesor.stats}
            profesor={paralelo['profesor']}
          />
        </>
      ) : null}
      <Divider />
      <CardContent className={classes.div}>
        <br />
        <Typography variant="body2" component="p" aling="left">
          Clases
        </Typography>
        {paralelo.hasOwnProperty('eventos') ? (
          paralelo.eventos.clases.map((clase) => (
            <React.Fragment key={clase['inicio']}>
              <Typography variant="body2" aling="left" color="textSecondary">
                - {formatoIntevalo(clase['inicio'], clase['fin'])}
              </Typography>
            </React.Fragment>
          ))
        ) : (
          <></>
        )}
      </CardContent>
    </Card>
  ) : (
    <div>Loading...</div>
  );
}
