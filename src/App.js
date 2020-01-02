import React from 'react';
import './App.css';
import {Icon, message, Modal, Spin} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
// 链接https://github.com/rrweb-io/rrweb/blob/master/guide.zh_CN.md
const rrweb = window.rrweb;
const rrwebPlayer = window.rrwebPlayer;
// 下面注释为直接使用的方式
// let events = [];
// let stopFn = rrweb.record({
//   emit(event) {
//     events.push(event);
//     console.log(events)
//   },
// });
// setTimeout(() => {
//   console.log('停止并播放');
//   stopFn();
//   // 自带的播放器
//   // const replayer = new rrweb.Replayer(events);
//   // rrweb-player播放器
//   new rrwebPlayer({
//     target: document.getElementById('rrwebBox'), // 可以自定义 DOM 元素
//     data: {
//       events,
//     },
//   });
// }, 10000);

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      modalStatus: false,
      events: []
    }
  }
  componentDidMount(){
      const events = [];
      let stopFn = rrweb.record({
        emit(event) {
          events.push(event);
          console.log(events)
        },
      });
    setTimeout(() => {
      this.setState({
        modalStatus: true
      })
      console.log('停止录制并播放');
      stopFn();
      // 自带的播放器
      // const replayer = new rrweb.Replayer(events);
      // rrweb-player播放器
      new rrwebPlayer({
        target: document.getElementById('rrwebBox'), // 可以自定义 DOM 元素
        data: {
          events,
        },
      });
    }, 10000);
  }
      //一键复制功能
    copy() {
      const copyEle = document.querySelector('.contentText') // 获取要复制的节点
      const range = document.createRange(); // 创造range
      window.getSelection().removeAllRanges(); //清除页面中已有的selection
      range.selectNode(copyEle); // 选中需要复制的节点
      window.getSelection().addRange(range); // 向选区中添加选中元素
      const copyStatus = document.execCommand("Copy"); // 执行copy操作
      // 对成功与否定进行提示
      if (copyStatus) {
        message.success('复制成功');
      } else {
        message.fail('复制失败');
      }
      window.getSelection().removeAllRanges(); //清除页面中已有的selection
    }
  render() {
    return (
      <div className="App">
        <div className="content">
          <p className="contentTitle">
            <Icon 
              type="copy" 
              onClick={this.copy}/>
          </p>
          <p className="contentText">
            我是要被复制的内容啊！！！
          </p>
          <TextArea></TextArea>
        </div>
        <Modal
          title="回放"
          visible={this.state.modalStatus}
          width={1080}
          // onOk={this.handleOk}
          // onCancel={this.handleCancel}
        >
          <p className='rrwebBox' id='rrwebBox'/>
        </Modal>
      </div>
    );
  }
}

export default App;
