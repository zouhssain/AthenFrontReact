import React, { Component } from "react";
import axios from 'axios';
import Auth from "./Auth";
import './login.scss';

class Login extends Component {

    
    constructor(props){
        super(props)
        this.state = {
            firstName: '',
            email:'',
            password:'',
            email_login:'',
            password_login:''
        }
    }


    changeHandler = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios
            .post('http://localhost:9090/UC/add',this.state)
            .then(response =>{
                console.log(this.state)
                console.log('m3eeeeelem'+response)
            }) 
            .catch(error =>{
                console.log(error)
            })
    }

    changeHandlerLogin = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    submitHandlerLogin = e => {
        e.preventDefault()
        axios
            .put('http://localhost:9090/UC/users/email='+this.state.email_login+'/passwd='+this.state.password_login)
            .then(response =>{
                if(response.data !== ''){
                    console.log('dakchi hoa hadak am3elem');
                    Auth.login(() => {
                        this.props.history.push("/Profil");
                        });
                        var element = document.getElementById('alertt');
                        element.style.display = 'none';
                    
                }else{
                    var element = document.getElementById('alertt');
                    element.style.display = 'block';
                    console.log('mal9a walo');
                }
            }) 
            .catch(error =>{
                console.log(error)
            })
    }

    render() {
        const {firstName,email,password} = this.state
        const {email_login,password_login} = this.state
       
          
          
        return (
            <div>
                <div id="alertt" class="alertt">tfoooooou</div>
            <div class="form-structor">
                <div class="signup">
                    <h2 class="form-title" id="signup" ><span>or</span>Sign up</h2>
                    <form action="" method="post" class="form" onSubmit={this.submitHandler}>
                    <div class="form-holder">
                        <input type="text" name="firstName" value={firstName} class="input" placeholder="Name" required="required"  onChange={this.changeHandler}/>
                        <input type="email" name="email" value={email} class="input" placeholder="Email" required="required" onChange={this.changeHandler}/>
                        <input type="password" name="password" value={password} class="input" placeholder="Password" required="required" onChange={this.changeHandler}/>
                    </div>
                    <button type="submit" class="submit-btn">Sign up</button>
                    </form>
                </div>
                <div class="login slide-up">
                    <div class="center">
                        <h2 class="form-title" id="login" ><span>or</span>Log in</h2>
                        <form action="" method="post" class="form" onSubmit={this.submitHandlerLogin}>
                        <div class="form-holder">
                            <input type="email" name="email_login" value={email_login} class="input" placeholder="Email" required="required" onChange={this.changeHandlerLogin}/>
                            <input type="password" name="password_login" value={password_login} class="input" placeholder="Password" required="required" onChange={this.changeHandlerLogin}/>
                        </div>
                        <button type="submit" class="submit-btn">Log in</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}export default Login