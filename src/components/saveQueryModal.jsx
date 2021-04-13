import React from 'react';
import { connect } from 'react-redux'
import { Modal, Button, Input, Select  } from 'antd';
import { addItem } from '../store/queries/queries.actions'
import './login.css'

const SaveQueryModal = ({isModalVisible, setIsModalVisible, userQuery,
  addItem, user }) => {
  const { Option } = Select;
  const youtube_api_url = 'https://www.googleapis.com/youtube/v3/search';
  const queryInput = React.useRef()
  const nameInput = React.useRef()
  const [orderSelect, setOrderSelect] = React.useState()
  const maxQuantityInput = React.useRef()

  const handleOk = () => {
    let url = `${youtube_api_url}?maxResults=${maxQuantityInput.current.state.value}&q=${queryInput.current.state.value}&part=snippet&order=${orderSelect}&key=${process.env.REACT_APP_YTK}`
    // console.log(earchSortUnspecified);
    addItem({url: url, user: user})
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeSelect = (value) => {
    setOrderSelect(value)
  }

  return (
    <>
      <Modal 
        title="Сохранить запрос"
        visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
        width={500}
      >
        
        <label>Запрос</label>
        <Input ref={queryInput} 
          size="large" className="form-input" disabled value={userQuery} />
        
        <label>Название</label>
        <Input ref={nameInput} 
          size="large" className="form-input"/>
        
        <div>
          <label>Сортировать по</label><br/>
          <Select
            defaultValue="searchSortUnspecified"
            style={{ width: 320, marginBottom: 15 }}
            onChange={handleChangeSelect}
          >
            <Option ref={orderSelect} value="searchSortUnspecified">Не указано</Option>
            <Option ref={orderSelect} value="date">Дата</Option>
            <Option value="rating">Рейтинг</Option>
            <Option value="viewCount">Число просмотров</Option>
            <Option value="relevance">Релевантность</Option>
            <Option value="title">Заголовок</Option>
            <Option value="videoCount">Количество видео</Option>
          </Select>
        </div>

        <label>Максимальное количество</label>
        <Input ref={maxQuantityInput} defaultValue={12}
          size="large" className="form-input" />

      </Modal>
    </>
  );
};

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
    addItem: (v) => {
      return dispatch(addItem(v))
    }
  }
}

export default connect(msp, mdp)(SaveQueryModal)