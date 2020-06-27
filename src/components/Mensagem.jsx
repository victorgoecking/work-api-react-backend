import React, { useState, useEffect } from 'react';


import {
    AppBar, 
    Button, 
    Card, 
    //CardActions, 
    CardContent, 
    //CardMedia, 
    CssBaseline, 
    Grid,
    Typography,
    Container,   
    Toolbar,
    FormControl,
    FormHelperText,
    InputLabel,
    Input,
    Icon,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Paper,
    

    } from '@material-ui/core/'

import { Sms } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';

import api from '../api'




const columns = [
    { id: 'origin', label: 'Origem', minWidth: 10 },
    { id: 'destiny', label: 'Destino', minWidth: 10 },
    { id: 'message', label: 'Mensagem', minWidth: 10 },      
];


const useStyles = makeStyles((theme) => ({
    
    formulario: {
        '& > *': {        
            padding: theme.spacing(1),
        },
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0)
    },
    toolbar: {
        paddingLeft: theme.spacing(2),
    },
    gridForm: {
        maxHeight: theme.spacing(57),
        //minWidth: theme.spacing(40),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,    
    },
    dataHora: {
        fontSize: 12,
    },
    button: {
        marginTop: '5%',      
        marginRight: '2.5%',
        marginLeft: '2.5%',
        width: '45%',
        height: theme.spacing(8),
    },
}));



export default (props) => {

    ////////////////////////////////////////////////////// AQUI
    const [newMessage, setNewMessage] = useState({

        from: '',
        to: '',
        message: '',
        apiurl: '',

    })

    const [newMessageReceived, setNewMessageReceived] = useState([])
    
        
        
    function handleSubmit(e){
        
        //chamar api post

        api.post('/enviar-mensagem', {...newMessage}).then((response) => {

        console.log(response)

        //alert("Mensagem Enviada")
        
        }).finally(() => {
        setNewMessage({
            from: '',
            to: '',
            message: '',
            apiurl: '',
        })
        }) 
        
        e.preventDefault()
    }

    useEffect(() => {

        api.get('/mensagem').then((response) => {
            setNewMessageReceived([...response.data])
        }).catch((error) => {
            console.log(error)
        })
    
    },[])
///////////////////////////////////////////// FIM



    
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
        

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    


    
    return(
        <React.Fragment>
            <CssBaseline />
            <AppBar color="secondary" position="relative">
            <Toolbar>
                <Sms className={classes.icon} />
                <Typography variant="h6" component="span" color="inherit" noWrap>
                Enviar / Receber
                </Typography>
            </Toolbar>
            </AppBar>
            <main>
                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={4}>

                        <Grid className={classes.gridForm} item xs={12} sm={12} md={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    
                                    <form className={classes.formulario} autoComplete="off">

                                        <FormControl >         
                                            <InputLabel htmlFor="from">De</InputLabel>
                                            <Input id="from" aria-describedby="my-helper-text" onChange={(e) => {
                                            setNewMessage({...newMessage, from: e.target.value})
                                        }} value={newMessage.from}/>
                                        </FormControl>

                                        <FormControl >         
                                            <InputLabel htmlFor="to">Para</InputLabel>
                                            <Input id="to" aria-describedby="my-helper-text" onChange={(e) => {
                                            setNewMessage({...newMessage, to: e.target.value})
                                        }} value={newMessage.to}/>
                                        </FormControl>

                                        <FormControl fullWidth >         
                                            <InputLabel htmlFor="message">Mensagem</InputLabel>
                                            <Input id="message" aria-describedby="my-helper-text" onChange={(e) => {
                                            setNewMessage({...newMessage, message: e.target.value})
                                        }} value={newMessage.message}/>
                                            <FormHelperText id="my-helper-text">Digite aqui sua mensagem</FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth >         
                                            <InputLabel htmlFor="urlapi">Url da Api</InputLabel>
                                            <Input id="urlapi" aria-describedby="my-helper-text" onChange={(e) => {
                                            setNewMessage({...newMessage, apiurl: e.target.value})
                                        }} value={newMessage.apiurl}/>
                                            <FormHelperText id="my-helper-text">Digite aqui a apiUrl do destinatário</FormHelperText>
                                        </FormControl>

                                        <Button                                             
                                            variant="outlined"                                            
                                            color="secondary"
                                            size="large"
                                            className={classes.button} 
                                            startIcon={<Icon>clear</Icon>}
                                            onClick={() => {
                                                setNewMessage({
                                                    from: '',
                                                    to: '',
                                                    message: '',
                                                    apiurl: '',
                                                })
                                            }}
                                        >
                                            Limpar
                                        </Button>

                                        <Button 
                                            variant="contained"                                            
                                            color="primary"
                                            size="large"
                                            className={classes.button} 
                                            endIcon={<Icon>send</Icon>}
                                            onClick={(e) => {
                                                handleSubmit(e)
                                                }}
                                        >
                                            Enviar
                                        </Button>
                                    </form>  
                                </CardContent>
                            </Card>
                        </Grid>
                        

                        <Grid item xs={12} sm={12} md={8}>
                            <Card className={classes.card}>
                                <Paper className={classes.root}>                                        
                                    <TableContainer className={classes.container}>
                                        <Toolbar className={classes.toolbar}>
                                            <Typography variant="h6" id="tableTitle" component="span">
                                                Mensagens Recebidas
                                            </Typography>
                                        </Toolbar>
                                        <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                                >
                                                {column.label}
                                                </TableCell>
                                            ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {newMessageReceived.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(newMessageReceived => {
                                            return (
                                                
                                                <TableRow hover role="checkbox" tabIndex={-1} key={newMessageReceived.id}>
                                                {columns.map((column) => {
                                                    const value = newMessageReceived[column.id];
                                                    return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : value}                                                        
                                                    </TableCell>                                                    
                                                    );
                                                })}
                                                </TableRow>
                                            );
                                            })}
                                            
                                        </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={newMessageReceived.length}
                                        rowsPerPage={rowsPerPage}
                                        labelRowsPerPage='Linhas'
                                        page={page}
                                        onChangePage={handleChangePage}
                                        onChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                </Paper>                                    
                            </Card>
                        </Grid>

                    </Grid>
                </Container>
            </main>
        </React.Fragment>
        )    
}
