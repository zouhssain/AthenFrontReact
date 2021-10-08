import React, { Component } from 'react';
import Auth from '../Auth';
import './Profil.scss';

class Profil extends Component {

    render(props) {
        return (
            <div>
                <h1>Welcome {this.props.email}</h1>
                <button class="submit-btn"
                    onClick={() => {
                    Auth.logout(() => {
                        this.props.history.push("/");
                    });
                    }}
                >
                    Logout
                </button>
            </div>
        )
    }
}export default Profil;
