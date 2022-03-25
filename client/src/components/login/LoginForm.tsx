import axios from 'axios';
import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
        marginTop: theme.spacing(4),
    },
}));

const axiosPost = () => {


    axios.post("http://localhost:62000/api/v1/userLog", null, {
        params: {
            insertEmail: 'connect@con.com',
            insertPassword: '123456'
        }
    })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);

        })


    // fetch('http://localhost:62000/api/v1/userLog', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         insertEmail: 'connect@con.com',
    //         insertPassword: '123456'
    //     })
    // })
    //     .then(res => console.log(res))
    //     .then(auth => {
    //         console.log(auth);

    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
}

    // onChange={(
    //     ev: React.ChangeEvent<HTMLInputElement>,
    // ): void => setInputValue(ev.target.value)}


const LoginForm = () => {
    const { heading, submitButton } = useStyles();

    const [json, setJson] = useState<string>();

    return (
        <Container maxWidth="xs">
            <Typography className={heading} variant="h3">
                Sign Up Form
            </Typography>
            <form>
                <TextField
                    variant="outlined"
                    margin="normal"
                    label="Email"
                    fullWidth
                    required
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    label="First Name"
                    fullWidth
                    required
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    label="Password"
                    type="password"
                    fullWidth
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={submitButton}
                    onClick={axiosPost}
                >
                    Sign Up
                </Button>
                {json && (
                    <>
                        <Typography variant="body1">
                            Below is the JSON that would normally get passed to the server
                            when a form gets submitted

                            console.log('were here');

                        </Typography>
                        <Typography variant="body2">{json}</Typography>
                    </>
                )}

            </form>
        </Container>
    );
}

export default LoginForm;