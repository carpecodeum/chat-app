import React from 'react';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import './dashboard.css'
import ListGroup from 'react-bootstrap/ListGroup'
import Chip from '@material-ui/core/chip'
import Button from 'react-bootstrap/Button'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import TextField from '@material-ui/core/TextField'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ctx} from './store'

const useStyles = makeStyles(theme =>({
   root :{
       margin: '50px',
       padding : theme.spacing(3,2),
       textAlign: 'center',
   },
   flex :{
       display:'flex',
       alignItems:'center',

    },
   topicsWindow :{
       width : '30%',
       height : '400px',
       borderRight : '1px solid grey',
    },
   chatWindow :{
       width:'70%',
       height :'400px',
       paddingLeft:'2%',
    },
    chatBox :{
       width:'85%',
    },
     button :{
       width: '15%',
    },
}));
export default function Dashboard(){
    const classes = useStyles();
    const {allChats,sendchataction,user} = React.useContext(ctx);
    console.log({allChats})
    const topics = Object.keys(allChats);
    const [activetopic,changeactivetopic] = React.useState(topics[0])
    const[textValue,changeTextValue] = React.useState('');
    return(
       <div>
          <Paper className={classes.root}>
          <Typography variant="h4" component="h4">
          Chat App
          </Typography>
          <Typography variant="h5" component="h5">
          {activetopic}
          </Typography>
          <br/><br />
        <div className={classes.flex}>

            <div className={classes.topicsWindow}>
            hi there i am a topic Window.
            <input type= "textbox" id='newsubtopic'></input>
            <br /><br/>
            <List>
            {
                topics.map(topic =>(
                    <ListItem onClick={e => changeactivetopic(e.target.innerText)}key = {topic} button>
                    <ListItemText primary={topic} />
                  </ListItem>
                ))
            }
            </List>
            </div>
            <div className={classes.chatWindow}>
            {
              allChats[activetopic].map((chats,i)=>{
                  return(
                      <div className={classes.flex} key={i}>
                         <Chip label={chats.from} className={classes.chip} />
                         <Typography variant="body1" gutterBottom style={{padding:'10px'}}>{chats.msg}</Typography>
                      </div>
                  )
              }
              )
            }
            </div>
        </div>
        <br/><br />
        <div className={classes.flex}>
            <div className={classes.chatBox}>
            <TextField label="send a chat" className={classes.chatBox} value= {textValue} onChange = {e=>changeTextValue(e.target.value)} style={{paddingRight:'100px'}}/>
            <Button variant="primary"
            onClick={()=>{sendchataction({from:user ,msg:textValue,topic:activetopic});
            changeTextValue('');}}>Send</Button>
            </div>
        </div>
          </Paper>
       </div>
    )
};