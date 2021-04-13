import React from 'react'
import { connect } from 'react-redux'
import { useHistory, Redirect } from "react-router-dom";
import jwt from 'jsonwebtoken'
import './searchVideos.css'
import { signOutStart } from '../store/user/user.actions'
import { Button } from 'antd';

function ShowSaved({ login, password, isFetching, queries, signOutStart2}) {
  const history = useHistory();
  const [user, setUser] = React.useState(null)
  const [filtered_queries, setFilteredQueries] = React.useState([])

  const btnClickHandler = () => {
    history.push('/search')
  }


  React.useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log(token)
    if (token !== null) {
      jwt.verify(token, "MyLolSecretKey", { login, password }, (err, decoded) => {
        // console.log(decoded)
        if (decoded !== undefined) {
          setUser(decoded.login)
        }
        if (err) {
          console.log(err);
          setUser(null)
          signOutStart2()
        }
      })
    }
  }, [])

  React.useEffect(() => {
    console.log(login);
    console.log(user);
    console.log(queries);
    const arr = queries.filter((el) => {
      return el.user === user
    })
    console.log(arr);
    setFilteredQueries(arr)
  }, [user])

  
  return <>
  {login && user && <div className="header">
      <div className="header-title">
        <h2>Current user: '{user}'</h2>
        {
          isFetching ?
            <Button loading="true" >
              Выход...
              </Button> :
            <Button onClick={() => {
              signOutStart2()
            }}>
              Выход
              </Button>
        }
      </div>
      <div className="header-search">
        <Button onClick={() => {btnClickHandler()}} size="large">Назад</Button>
      </div>
      {
      <pre>
        {JSON.stringify(filtered_queries, null, 4)}
      </pre>
      }
    </div>
  }
  {login === null && <div className="header">
      <div className="header-title">
        <h2>Вы не авторизованы</h2>
        <Button onClick={() => { history.push('/login') }}>Логин</Button>
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
    error: state.user.error,
    queries: state.queries.savedQueries
  }
}

const mdp = (dispatch) => {
  return {
    signOutStart2: () => {
      return dispatch(signOutStart())
    }
  }
}

export default connect(msp, mdp)(ShowSaved)
