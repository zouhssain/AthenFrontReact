import React, { Component } from "react";
import '../styles/register.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTimes, faCheck, faEyeSlash, faBan, faCheckCircle} from '@fortawesome/free-solid-svg-icons'

import AuthService from "../services/auth.service";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ceci n'est pas un email valide.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        le nom d'utilisateur doit être entre 3 et 20 caractères.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        le mot de passe doit être entre 6 et 40 caractères.
      </div>
    );
  }
};

const rulespassword = value =>{
  if (!(value.length > 5 && 
    value.match(/[!@#%^&*]/) && 
    value.match(/[0-9]/) && 
    value.match(/[A-Z]/)) ) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe de respect nos règles.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
      show_email:true,
      passwordIsTrue:false
    };
  }


  validateField(name) {
    let isValid = false;
    console.log(name)
    if (name === "email") {isValid = this.validateEmailAddress();}
    return isValid;
  }

  validateEmailAddress() {
    console.log('dkhel l validateEmailAddress');
    const value = this.state.email;
    if (!emailValidator.test(value)){
        this.state.show_email = true; 
    }else{
        this.state.show_email = false;
    }
  }

  valid = (item, v_icon,inv_icon) =>{
    let text = document.querySelector(`#${item}`);
    text.style.opacity ="1";

    let valid_icon = document.querySelector(`#${item} .${v_icon}`);
    valid_icon.style.opacity ="1";

    let invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
    invalid_icon.style.opacity ="0";
  }
  invalid = (item, v_icon,inv_icon) =>{
      let text = document.querySelector(`#${item}`);
      text.style.opacity ="0.5";

      let valid_icon = document.querySelector(`#${item} .${v_icon}`);
      valid_icon.style.opacity ="0";

      let invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
      invalid_icon.style.opacity ="1";
  }

  handlePasswordChange = e => {
    const txt = e.target.value
    let test1 = 0;
    let test2 = 0;
    let test3 = 0;
    let test4 = 0;
    if(txt.match(/[A-Z]/) !=null){
        this.valid("capital","fa-check","fa-times");
        test1 = 1;
    }else{
        this.invalid("capital","fa-check","fa-times")
    }
    if(txt.match(/[0-9]/) !=null){
        this.valid("num","fa-check","fa-times");
        test2 = 1;
    }else{
        this.invalid("num","fa-check","fa-times")
    }
    if(txt.match(/[!@#%^&*]/) !=null){
        this.valid("char","fa-check","fa-times");
        test3 = 1;
    }else{
        this.invalid("char","fa-check","fa-times")
    }
    if(txt.length > 5){
        this.valid("more6","fa-check","fa-times");
        test4 = 1;
    }else{
        this.invalid("more6","fa-check","fa-times")
    }
    if(test1 + test2 + test3 + test4 > 3) {
        this.state.passwordIsTrue = true;
    } 
    else {
        this.state.passwordIsTrue = false;
    }
}

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    const { name } = e.target;
    this.validateField(name);
    this.setState({
      email: e.target.value
    });
    return;
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    const { show_email } = this.state;
    const { show } = this.state;
    const handleShowhide = () =>{
      this.setState({ show: !show })
    }
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="https://ok12static.oktacdn.com/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    placeHolder="Username"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-icons">
                  {
                    show_email ? (
                            <FontAwesomeIcon icon={faBan} id="show_ban"/>
                        ) : (
                            <FontAwesomeIcon icon={faCheckCircle} id="show_ban"/>
                        )
                    }
                  <Input
                    type="text"
                    placeHolder="exemple@exemple.com"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                    
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-icons">
                  {
                    show ? (
                        <FontAwesomeIcon onClick={handleShowhide} icon={faEye} id="show_hide"/>
                    ) : (
                        <FontAwesomeIcon onClick={handleShowhide} icon={faEyeSlash} id="show_hide"/>
                    )
                  }
                  <Input
                    type={show ? "text" : "password"}
                    placeHolder="*******"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={e => {this.onChangePassword(e); this.handlePasswordChange(e)}}
                    validations={[required, vpassword, rulespassword]}
                  />
                  </div>
                </div>
                <div id="validateur" >
                  <p id="capital">
                      <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
                      <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                      <span className="signe">Lettre Maj</span>
                  </p>
                  <p id="char">
                      <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
                      <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                      <span className="signe">Caractère special</span>
                  </p>
                  <p id="num">
                      <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
                      <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                      <span className="signe">Nombre</span>
                  </p>
                  <p id="more6">
                      <FontAwesomeIcon className="fa-times icon" icon={faTimes} />
                      <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                      <span className="signe">+6 Caractères</span>
                  </p>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">S'inscrire</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
