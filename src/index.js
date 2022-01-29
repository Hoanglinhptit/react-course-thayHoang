import React from 'react';
import ReactDOM from 'react-dom';
import store from './store.js';
import DemoRC2get from './components/DemoRC2get';
import DemoRC1set from './components/DemoRC1set';
import ReactPagination from './components/ReactPagination';
import { Provider } from 'react-redux';
// import reportWebVitals from './reportWebVitals';

class DemoFetchAPI extends React.Component {
  
    handleClickPTag(){
      const url = 'http://localhost:3001/student/' ,
      option = {
        method: 'GET', //POST,PUT can su dung den body va header
        // body: JSON.stringify(doiTuong),
        // headers: {'Content-Type': "Application/json"}
      }
      fetch(url, option)
      .then((response) => response.json())
      .then((dataLayDuoc)=>this.setState({dataHienThi:dataLayDuoc}))
  }
  state = {
    dataHienThi: [],
    data :{
      id: 1,
      user: 'linh'
    }
  }
  
  handleClick(){
    const url = 'http://localhost:3001/student',
    option = {
      method: 'GET', //POST,PUT can su dung den body va header
      // body: JSON.stringify(doiTuong),
      // headers: {'Content-Type': "Application/json"}
    }
    fetch(url, option)
    .then((response) => response.json())
    .then((dataLayDuoc) => this.setState({dataHienThi: dataLayDuoc}))
  }

  handleClickPTag(id){
    const url = 'http://localhost:3001/student/' + id,
    option = {
      method: 'GET', //POST,PUT can su dung den body va header
      // body: JSON.stringify(doiTuong),
      // headers: {'Content-Type': "Application/json"}
    }
    fetch(url, option)
    .then((response) => response.json())
    .then((dataLayDuoc) => alert("id chon la: " + dataLayDuoc.id + " name la: " + dataLayDuoc.name))
  }
  handleClickPUt(){
    const url = 'http://localhost:3001/student/1',
    option ={
      method: 'PUT',
      body: JSON.stringify(this.state.data),
      headers: {'Content-Type': "Application/json"}
    }
    
    fetch(url,option)
    .then((response)=>response.json())
    .then((datathem)=>this.setState({dataHienThi:datathem}))
    // .then(response => console.log('Success:', JSON.stringify(response)))
    // .catch(error => console.error('Error:', error))
  }
  handleClickPost(){
    const url = 'http://localhost:3001/student',
    option ={
      method: 'POST',
      body: JSON.stringify({name: this.state.data.user}),
      headers: {'Content-Type': "Application/json"}
    }
    
    fetch(url,option)
    .then((response)=>response.json())
    .then((datathem)=>this.setState({dataHienThi:datathem}))
    // .then(response => console.log('Success:', JSON.stringify(response)))
    // .catch(error => console.error('Error:', error))
  }
  handleDElete(id){
    const url = 'http://localhost:3001/student/' + id,
    option = {
      method: 'DELETE', //POST,PUT can su dung den body va header
      // body: JSON.stringify(doiTuong),
      // headers: {'Content-Type': "Application/json"}
    }
    fetch(url, option)
    .then((response) => response.json())    
  }
  render(){
    return <div>
      <button onClick={() => this.handleClick()}>get data</button>
      {/* {this.state.dataHienThi.map((item, idx) => return(<div><p key={idx} onClick={() => this.handleClickPTag(item.id)}>id la: {item.id} - name la: {item.name}</p>
        <button onClick={()=>this.handleDElete(item.id)}>Delete</button></div>)
      )} */}
      {this.state.dataHienThi.map((item,idx)=> (
        <div>
          <p key={idx} onClick={()=>this.handleClickPTag(item.id)}>id là :{item.id}-name la :{item.name}</p>
          <button onClick={()=>this.handleDElete(item.id)}>delete</button>
        </div>
      ))}
      <button onClick={()=>this.handleClickPUt()}>put data</button>
      <button onClick={()=>this.handleClickPost()}>post data</button>
     
    </div>
  }
}

ReactDOM.render(
  <Provider store={store}>
    <DemoRC1set />
    <DemoRC2get />
    <ReactPagination />
    <DemoFetchAPI />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

