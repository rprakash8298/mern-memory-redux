import React, {useState} from 'react'
import { Avatar, Button, Typography, Paper, Grid, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'
import Icon from './icon'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './Styles'
import Input from './Input'
import {signin,signup} from '../../actions/auth'

const Auth = () => {
    const initialState = {firstname:'',lastname:'',email:'',password:'',confirmPassword:''}
    const [showPassword,SetShowPassword] = useState(false)
    const classes = useStyles();
    const [isSignup, setIsSignup] = useState(false)
    const [formData,setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const history = useHistory();
    const handleShowPassword = () => SetShowPassword((prevShowPassword) => !prevShowPassword)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(formData,history))
        } else {
            dispatch(signin(formData,history))
            
        }
    }
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const switchMode = () => {
        setIsSignup((prevState) => !prevState)
        SetShowPassword(false)
    }
    const googleSuccess =async (res) =>{
        console.log(res)
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({ type: "AUTH", data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log("Failed to sign In ! Try agian Later")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        {isSignup && (
                            <>
                                <Input name="firstname" label="First Name" handleChange={handleChange} autoFocus half />
                                 <Input name="lastname" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" type="email" label="Email Address" handleChange={handleChange} />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label = "Repeat Password" handleChange={handleChange} type="password" />} 
                    </Grid>
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="389458380631-ssbsdunbude74jjagqeurdkb5jt63glo.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid item>
                    <Button onClick={switchMode}>
                        {isSignup ? 'Aready Have An Account ? Sign In' :"don't have account ? Sign Up"}
                    </Button>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth
