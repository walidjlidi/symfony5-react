import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import { Alert } from 'reactstrap';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
    };
  }

  static isUserLoggedIn() {
    //if()
    const token = window.localStorage.getItem('token');

    return token && token.length > 0 ? true : false;
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();
    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post(`http://vps723401.ovh.net/api/login_check`, credentials)
      .then(res => {
        this.setState({
          message: '',
        });
        window.localStorage.setItem('token', res.data.token);

        const { currentState } = this.props.location;
        window.location = currentState ? currentState.from.pathname : '/';
      })
      .catch(error => {
        console.log(error);
        if (error.response.data.message) {
          this.setState({
            message: error.response.data.message,
          });
        }
      });
    console.log();
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }

  render() {
    const {
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {this.state.message.length > 0 && (
          <Alert color="danger"> {this.state.message}</Alert>
        )}
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} onChange={this.onChange} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} />
          </FormGroup>
        )}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" />{' '}
            {this.isSignup ? 'Agree the terms and policy' : 'Remember me'}
          </Label>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}
        >
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.changeAuthState(STATE_LOGIN)}>
                Login
              </a>
            ) : (
              <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                Signup
              </a>
            )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  username: 'username',
  usernameInputProps: {
    name: 'username',
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    name: 'password',
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
