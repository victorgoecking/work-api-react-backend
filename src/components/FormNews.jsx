import React, { useState } from 'react';

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
    } from '@material-ui/core/'

import { NewReleases } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';


import api from '../api'


const useStyles = makeStyles((theme) => ({
    formulario: {
        '& > *': {
        //margin: theme.spacing(1),
        padding: theme.spacing(1)
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

    //FORM
    const classes = useStyles();
    
    const [newPost, setNewPost] = useState({

        title: '',
        description: '',
        postdate: '',
        author: '',

    })
        
    function dateCurrent(){
        return new Date()
    }
    
    function handleSubmit(e){
        
        //chamar api post

        api.post('/feed', {...newPost, postdate: dateCurrent().toLocaleString()}).then((response) => {

        console.log(response)

        //alert("Notícia Publicada!")
        
        }).finally(() => {
        setNewPost({
            title: '',
            description: '',
            postdate: '',
            author: '',
        })
        }) 
        
        e.preventDefault()
    
    }

    return(
        <React.Fragment>
            <CssBaseline />
            <AppBar color="secondary" position="relative">
            <Toolbar>
                <NewReleases className={classes.icon} />
                <Typography variant="h6" color="inherit" noWrap>
                Nova Fake News
                </Typography>
            </Toolbar>
            </AppBar>
            <main>
                <Container className={classes.cardGrid} maxWidth="lg">
                    
                    <Grid container spacing={4}>
                    
                        
                        <Grid item xs={12} sm={12} md={12}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    
                                    <form className={classes.formulario} autoComplete="off">

                                        <FormControl >         
                                            <InputLabel htmlFor="author">Autor</InputLabel>
                                            <Input id="author" aria-describedby="my-helper-text" onChange={(e) => {
                                            setNewPost({...newPost, author: e.target.value})
                                        }} value={newPost.author}/>
                                        </FormControl>

                                        <FormControl >         
                                            <InputLabel htmlFor="title">Título</InputLabel>
                                            <Input id="title" aria-describedby="my-helper-text" onChange={(e) => {
                                            setNewPost({...newPost, title: e.target.value})
                                        }} value={newPost.title}/>
                                        </FormControl>

                                        <FormControl fullWidth >         
                                            <InputLabel htmlFor="description">Descrição</InputLabel>
                                            <Input id="description" aria-describedby="my-helper-text" onChange={(e) => {
                                            setNewPost({...newPost, description: e.target.value})
                                        }} value={newPost.description}/>
                                            <FormHelperText id="my-helper-text">Uma breve descrição da publicação</FormHelperText>
                                        </FormControl>

                                        <Button fullWidth
                                        
                                            variant="outlined"
                                            color="secondary"
                                            size="large"
                                            className={classes.button}
                                            startIcon={<Icon>clear</Icon>}
                                            onClick={() => {
                                                setNewPost({
                                                    title: '',
                                                    description: '',
                                                    postdate: '',
                                                    author: '',
                                                })
                                            }}
                                        >
                                            Limpar
                                        </Button>

                                        <Button fullWidth
                                        
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
                        
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    )    
}
