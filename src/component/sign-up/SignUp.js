import * as React from 'react';
import {useNavigate} from "react-router-dom";
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
import {Checkbox, FormControl, FormControlLabel, FormHelperText} from "@mui/material";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
    displayName: yup.string().required('You must enter display name'),
    email: yup.string().email('You must enter a valid email').required('You must enter a email'),
    password: yup
        .string()
        .required('Please enter your password.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    acceptTermsConditions: yup.boolean().oneOf([true], 'The terms and conditions must be accepted.'),
});

const defaultValues = {
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    acceptTermsConditions: false,
};

export default function SignUp() {
    const navigate = useNavigate();

    const {control, formState, handleSubmit, setError} = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors } = formState;

    function onSubmit({displayName, password, email}) {
        return new Promise((resolve, reject) => {
            axios.post(authServiceConfig.signUp, {
                displayName,
                password,
                email,
            }).then((response) => {
                if (response.data.user) {
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
                    Sign up
                </Typography>
                <form
                    name="registerForm"
                    noValidate
                    className="flex flex-col justify-center w-full mt-32"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Controller
                        name="displayName"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                className="mb-24"
                                label="Display name"
                                autoFocus
                                type="name"
                                error={!!errors.displayName}
                                helperText={errors?.displayName?.message}
                                variant="outlined"
                                required
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                className="mb-24"
                                label="Email"
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

                    <Controller
                        name="passwordConfirm"
                        control={control}
                        render={({field}) => (
                            <TextField
                                {...field}
                                className="mb-24"
                                label="Password (Confirm)"
                                type="password"
                                error={!!errors.passwordConfirm}
                                helperText={errors?.passwordConfirm?.message}
                                variant="outlined"
                                required
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="acceptTermsConditions"
                        control={control}
                        render={({field}) => (
                            <FormControl className="items-center" error={!!errors.acceptTermsConditions}>
                                <FormControlLabel
                                    label="I agree to the Terms of Service and Privacy Policy"
                                    control={<Checkbox size="small" {...field} />}
                                />
                                <FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Button
                        variant="contained"
                        color="secondary"
                        className="w-full mt-24"
                        aria-label="Register"
                        disabled={!isValid}
                        type="submit"
                        size="large"
                    >
                        Create your free account
                    </Button>
                </form>
            </Box>
        </Container>
    );
}
