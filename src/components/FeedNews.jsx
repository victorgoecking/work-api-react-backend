import React, { useState,useEffect } from 'react'
import { uuid } from 'uuidv4'
import api from '../api'

import {
    AppBar,     
    Card, 
    CardActions, 
    CardContent, 
    CardMedia, 
    CssBaseline, 
    Grid,
    Typography,
    Container,
    Toolbar,
    } from '@material-ui/core/'

    import { Block } from '@material-ui/icons/';

    import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
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
        
    }
}));



export default function Album() {
    const classes = useStyles();

    const [news, setNews] = useState([])



    useEffect(() => {

        api.get('/feed').then((response) => {
            setNews([...response.data])

        }).catch((error) => {
            console.log(error)
        })

    },[])



    return (
        <React.Fragment>        
            <CssBaseline />
            <AppBar color="secondary" position="relative">
            <Toolbar>
                <Block className={classes.icon} />
                <Typography variant="h6" component="span" color="inherit" noWrap>
                Fake News
                </Typography>
            </Toolbar>
            </AppBar>
            <main>
                <Container className={classes.cardGrid} maxWidth="lg">
                    
                    <Grid container spacing={4}>
                    
                        {news.map(news => (
                            <Grid item key={uuid()} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                className={classes.cardMedia}
                                //image="https://source.unsplash.com/random"
                                // image="https://image.flaticon.com/icons/svg/1862/1862164.svg"
                                // image="https://draludmilathommen.com.br/wp-content/uploads/2019/02/fake-new-face.jpg"
                                //image="https://lh3.googleusercontent.com/proxy/PVT9xUISPoeaWHsUBQQobwwMHxa83br-REUeCGLI7wF2Dg_gTxxsnGO-4Zm5GizPhVgBznhhA2TMoICpHkAxrWQwY-7HApE-ckGmxUq_UfVFobhcPNZOk-E"
                                //image="https://www.comunicacaointegrada.com.br/wp-content/uploads/2018/10/imagens-manipuladas-w855h425@2x.jpg"
                                image="https://img.ibxk.com.br/2020/02/14/14150723826161.jpg?w=1120&h=420&mode=crop&scale=both"
                                title="Fake News"
                                />
                                
                                {/* className={classes.purple} */}                    
                                <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="span">
                                    {news.author}{" — "}{news.title}
                                </Typography>
                                <Typography noWrap >
                                    {news.description}
                                </Typography>
                                </CardContent>
                                <CardActions>
                                
                                <Typography className={classes.dataHora} component="span" size="small" color="primary">
                                    {news.postdate}
                                </Typography>
                                
                                </CardActions>
                            </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>      
        </React.Fragment>
    );
}