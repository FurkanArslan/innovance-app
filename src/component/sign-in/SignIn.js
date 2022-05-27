import * as React from 'react';
import {useNavigate, Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import * as yup from 'yup';
import {Controller, useForm} from "react-hook-form";

import {yupResolver} from '@hookform/resolvers/yup';
import axios from "axios";
import authServiceConfig from "../../mock-api/auth-api";
import './singIn.css';
import Grid from "@mui/material/Grid";
import {useContext} from "react";
import authContext from "../../authContext";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(4, 'Password is too short - must be at least 4 chars.'),
});

const defaultValues = {
    email: '',
    password: '',
    remember: true,
};

function SignInContent() {
    const navigate = useNavigate();

    const {control, formState, handleSubmit, setError} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const {isValid, errors} = formState;
    const { setAuthenticated, setUser } = useContext(authContext);

    function onSubmit({email, password}) {
        return new Promise((resolve, reject) => {
            axios.get(authServiceConfig.signIn, {
                data: {
                    email,
                    password,
                },
            }).then((response) => {
                if (response.data.user) {
                    setAuthenticated(true);
                    setUser(response.data.user);

                    navigate('/home');
                } else {
                    response.data.error.forEach((error) => {
                        setError(error.type, {
                            type: 'manual',
                            message: error.message,
                        });
                    });
                }
            }).catch(response => {
                response.forEach((error) => {
                    setError(error.type, {
                        type: 'manual',
                        message: error.message,
                    });
                });
            });
        });
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <form
                        name="loginForm"
                        noValidate
                        className="mt-32"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="email"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Email"
                                    autoFocus
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors?.email?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({field}) => (
                                <TextField
                                    {...field}
                                    className="mb-24"
                                    label="Password"
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors?.password?.message}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />
                            )}
                        />

                        <Button
                            variant="contained"
                            color="secondary"
                            className="mt-16"
                            aria-label="Sign in"
                            disabled={!isValid}
                            type="submit"
                            size="large"
                        >
                            Sign in
                        </Button>

                        <Grid container>
                            <Grid item>
                                <Link to="/signUp">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default function SignIn() {
    return <SignInContent/>;
}
