import React from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import './login.css'
import logo from '../assets/sibdev-logo.svg'
import { Button, Input  } from 'antd';
import { signInStart } from '../store/user/user.actions'


function Login({login, password, isFetching, error, signInStart2}) {
	const loginInput = React.useRef()
	const passwordInput = React.useRef()

	return <>
		{login !== null || undefined ? <Redirect to="/search" /> : 

      <div className="form-container">
        <div className="form">
          <div className="form-icon">
            <img src={logo} alt="sibdev-logo" />
          </div>
          <h2 className="form-title">Вход</h2>
          <label>Логин</label>
          <Input size="large" ref={loginInput} className="form-input"/>
          <label>Пароль</label>
          <Input.Password size="large" ref={passwordInput} className="form-input"/>
          {
            isFetching ?
              <Button size="large" loading="true" type="primary" className="form-button">
                  Проверяем...
              </Button> :
              <Button size="large" type="primary" className="form-button" onClick={() => {
                  signInStart2(loginInput.current.state.value, passwordInput.current.state.value)
                }}>
                  Войти
              </Button>
          }
        </div>
      </div>
		}
		</>
}

const msp = (state) => {
	return {
		login: state.user.login,
    password: state.user.password,
		isFetching: state.user.isFetching,
		error: state.user.error
	}
}

const mdp = (dispatch) => {
	return {
		signInStart2: (log, pass) => {
			return dispatch(signInStart({login: log, password: pass}))
		}
	}
}

export default connect(msp, mdp)(Login)
