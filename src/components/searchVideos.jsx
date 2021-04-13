import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import './searchVideos.css'
import jwt from 'jsonwebtoken'
import { Radio, Button, Input } from 'antd';
import classNames from 'classnames';
import SaveQueryModal from './saveQueryModal'
import { signOutStart } from '../store/user/user.actions'

function SearchVideos({login, password, isFetching, signOutStart2}) {
  const youtube_api_url = 'https://www.googleapis.com/youtube/v3/search';
  const history = useHistory();
  const [userQuery, serUserQuery] = React.useState("")
  const [userUrl, setUserUrl] = React.useState("")
  const [user, setUser] = React.useState(null)
  const [videos, setVideos] = React.useState([])
  const [list, setList] = React.useState({val: true})
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const searchInput = React.useRef()
  const options = [{label: 'Список', value: true}, {label: 'Карточки', value: false}]

  const btnClickHandler = () => {
    serUserQuery(searchInput.current.state.value)
    // console.log(userQuery)
  }

  const onChangeVideoView = (e) => {
    setList({
      val: e.target.value
    });
  };
  
  const getVideos = async () => {
    let url = `${youtube_api_url}?maxResults=12&q=${userQuery}&part=snippet&order=searchSortUnspecified&key=${process.env.REACT_APP_YTK}`
    const res = await fetch(url)
    const data = await res.json();
    setVideos(data.items)
    setUserUrl(url)
    console.log(data)
  }

  React.useEffect(() => {
    if (userQuery.length > 3) {
      getVideos()
    } else {
      return
    }
  }, [userQuery])

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    // console.log('TOKEN', token);
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

  var videosClass = classNames({
      'video-list': list.val,
      'video-cards': !list.val
    });

  return <>
  {login && user && <div>
    <div className="header">
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
        <Input type="text" size="large" ref={searchInput} />
        <Button onClick={() => {btnClickHandler()}} size="large">Поиск</Button>
        <Button onClick={() => {setIsModalVisible(true)}} size="large">Сохранить ... </Button>
      </div>
      <div className="header-buttons">
        <Radio.Group
          options={options}
          onChange={(e) => {onChangeVideoView(e)}}
          defaultValue={list.val}
          optionType="button"
          buttonStyle="solid"
        />
        <Button onClick={() => {history.push('/saved')}}>Сохраненные запросы</Button>
      </div>
    </div>

    <ul className={videosClass}>
      {videos.map((el, index) => {
        return (
          <li key={index} className="video">
            <h3>{el.snippet.title}</h3>
            <iframe className="video-frame"
              title="MyLoLTitle" 
              src={"https://youtube.com/embed/" + el.id.videoId}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0" 
              allowFullScreen>
            </iframe><br/>
            <a target="_blanc" href={el.link}>{el.title}</a>
          </li>
        )
      })}
    </ul>

    <SaveQueryModal 
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      userQuery={userQuery}
      user={user}
    />

  </div>}
  {login === null ? <div className="header">
    <div className="header-title">
      <h2>Вы не авторизованы</h2>
      <Button onClick={() => { history.push('/login') }}>Логин</Button>
    </div>
  </div>
    : ''}
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
    signOutStart2: () => {
      return dispatch(signOutStart())
    }
  }
}

export default connect(msp, mdp)(SearchVideos)
