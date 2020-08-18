import React, { useState } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SendIcon from "@material-ui/icons/Send";
import FormControl from "@material-ui/core/FormControl";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  textFieldCenter: {
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    position: "fixed",
    bottom: 20,
    width: "90%",
    paddingRight: 5,
    paddingLeft: 5,
  },
  chatCont: {
    bottom: 95,
    width: "100%",
    overflowY: "scroll",
  },
  botChatCont: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
  },
  botReply: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    maxWidth: "60%",
    padding: "10px",
    marginLeft: "15px",
    hyphens: "auto",
  },
  userChatCont: {
    width: "100%",
    display: "flex",
    marginTop: "20px",
  },
  userReply: {
    backgroundColor: "#fff",
    color: "#262626",
    maxWidth: "60%",
    padding: "10px",
    marginRight: "15px",
    marginLeft: "auto",
  },
  media: {
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    Left: 20,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  root: {
    width: "100%",
  },
  pos: {
    marginBottom: 12,
  },
}));

function Datafetching() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text:
        "Hello, I am HealthPortBot, here to help you find out which disease you might have.",
      sender: 1,
    },
    {
      text: "Please can you tell me the problems/symptoms that you are facing.",
      sender: 1,
    },
  ]);

  // *****************
  // *****************

  const submitClick = (e) => {
    e.preventDefault();
    setMessages((prevState) => [...prevState, { text: message, sender: 2 }]);

    axios
      .post(`http://localhost:5000/api/chatbot/send`, {
        MSG: message,
      })
      .then((res) => {
        console.log(res);
        setMessages((prevState) => [
          ...prevState,
          { text: res.data.Reply, sender: 1 },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
    setMessage("");
  };

  // *****************
  // *****************

  const classes = useStyles();
  const displayMessages = () => {
    return (
      <React.Fragment>
        <CssBaseline />
        <CssBaseline />
        <main>
          <Container className={classes.cardGrid}>
            <Grid container>
              {messages.map((mes, index) => {
                if (mes.sender === 1) {
                  return (
                    <div key={index} className={classes.botChatCont}>
                      <Paper className={classes.botReply}>{mes.text}</Paper>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className={classes.userChatCont}>
                      <Paper className={classes.userReply}>{mes.text}</Paper>
                    </div>
                  );
                }
              })}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  };

  return (
    <>
      <div className={classes.chatCont}>{displayMessages()}</div>
      <div className={classes.textFieldCenter}>
        <form onSubmit={submitClick} className={classes.textField}>
          <Input
            required
            autoFocus
            className={classes.textField}
            variant="outlined"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon />
                </InputAdornment>
              ),
            }}
          />
          <input type="submit" hidden />
        </form>
      </div>
    </>
  );
}

export default Datafetching;
