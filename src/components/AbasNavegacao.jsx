import React from 'react';

import FormNews from './FormNews'
import FeedNews from './FeedNews'
import Mensagem from './Mensagem'

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Box, Tabs, Tab, AppBar, Typography} from '@material-ui/core/';
import { List, PlaylistAdd, Message } from '@material-ui/icons/';
import { teal } from '@material-ui/core/colors';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box p={3}>
                    <Typography variant="h6" component="span" >{children}</Typography>
                </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };
    
    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }


    const useStyles = makeStyles((theme) => ({
        icon: {
            marginRight: theme.spacing(2),
        },
        swipeableviews: {
            marginTop: theme.spacing(10),
        },
    }));
        
export default () => {

    const classes = useStyles();

    const theme = createMuiTheme({
        // root: {
        //     backgroundColor: theme.palette.background.paper,
        //     width: 'auto',
        // },
        // 
        palette: {
            primary: teal,
            secondary: {
                main: '#41257b',
            },
            },
            
        });

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    
    return (        
        <ThemeProvider theme={theme}>         
            <AppBar position="fixed" color={"primary"}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"                                                          
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Lista de Feeds" icon={<List />} {...a11yProps(0)} />
                    <Tab label="Novo Feed" icon={<PlaylistAdd />} {...a11yProps(1)} />
                    <Tab label="Mensagem" icon={<Message />} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                className={classes.swipeableviews}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    
                    <FeedNews></FeedNews>

                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    
                    <FormNews></FormNews>

                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    
                    <Mensagem></Mensagem>

                </TabPanel>
            </SwipeableViews>
            
    </ThemeProvider>    
    );
}