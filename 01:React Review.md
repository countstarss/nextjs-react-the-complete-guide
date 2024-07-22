# 01:React Review.md

//
// React Project
// 07/13/24
// Luke king
//

## 1. 添加遮罩层 & props

- 实现功能：点击删除，弹出窗口，并且遮住其他的部分，突出显示弹窗，点击取消、确定，或者点击空白部分，都应该能够关闭遮罩。
- 实现思路：使用两个组件，一个是遮罩，一个是弹窗，点击删除按钮之后，用一个State控制两个组件同时显示，弹窗的优先级比遮罩高，显示在上层，两个按钮都有对应的onClick的handler，把showModal的状态set为false，点击空白部分取消的思路则是让遮罩占据全部窗口空间，只要点在上面，就一定会触发handler，导致关闭遮罩。

- 代码：

Todo.jsx
``` jsx
import '../App.css';
import { useState } from 'react'

import Modal from './Modal'
import Backdrop from './Backdrop';

function Todo(props) {

    const [showModal,setShowModal] = useState(false);

    function deleteHandler() {
        setShowModal(true)
    }

    function closeModalHandler() {
        setShowModal(false)
        console.log("Close Modal");
    }

    function confirmModalHandler() {
        setShowModal(false)
        console.log("Confirm Delete");
    }

    return (
        <div className='card'>
            <h2>{props.text}</h2>
            <p>{props.comments}</p>
            <div className='actions'>
                <button className='btn' onClick={deleteHandler}>Delete</button>
            </div>
            { showModal && <Modal onCancel={closeModalHandler} onConfirm={confirmModalHandler}/> }
            { showModal && <Backdrop onCancle={closeModalHandler}/> }

        </div>
    );
}


export default Todo;
```

Modal.jsx
``` jsx
const Modal = (props) => {

    function cancelHandler() {
        props.onCancel();
    }
    function confirmHandler() {
        props.onConfirm();
    }

    return (
    <div className="modal">
        <p>Are you sure delete {}?</p>
        <button className="btn-alt" onClick={cancelHandler}>Cancel</button>
        <button className="btn" onClick={confirmHandler}>Confirm</button>
    </div>
    );
}

export default Modal;
```

BackDrop.jsx
``` jsx
const Backdrop = (props) => {

  return (
    <div className="backdrop" onClick={props.onCancle}></div>
  )
}

export default Backdrop
```

- Props的使用

在父级里进行调用时，把参数传进组件中，在声明组件时，直接传入props，然后在内部就可以使用props调用之前传入过的内容。比如，在`Todo.jsx`中向`Modal.jsx`中传入了`onCancel` & `onConfirm`,虽然他们各自对应着一个`handler`，但不影响实际使用，传给下一级的组件后,直接通过props调用，再次包装为一个handler供button使用。


## 2. 添加路由功能

- 1. 安装react-router-dom

  ``` shell
  npm install react-router-dom
  ```

- 2. 从`react-router-dom`中引入`BrowserRouter`

  ``` js
  import { BrowserRouter } from 'react-router-dom';
  ```

  <!-- 让App具有路由的功能 -->
  ``` jsx
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ```

- 3. 添加不同路由对应的内容

  ``` jsx
  <Route path='/all-meetups' element={<AllMeetups />} />
  ```

- 4. 添加导航栏，点击能够指向对应的路由

    ``` jsx
    // 从react-router-dom中引入Link
    const MainNavigation = () => {
      return <header className={classes.header}>
        <div className={classes.logo}>
            React Meetup        
        </div>
        <div >
            <ul>
                <li>
                    <Link to='/all-meetups'>all-meetups</Link>
                </li>
                <li>
                    <Link to='/new-meetup'>new-meetup</Link>
                </li>
                <li>
                    <Link to='/favourites'>favourites</Link>
                </li>
            </ul>
        </div>
      </header>
    }
    ```

## 3. 如何使用*.module.css

- 1. 创建*.module.css文件，这样的css只对引入并且使用的内容有效，使class能够精确匹配，类似于scoped的作用

- 2. 从*.module.css中引入classes

- 3. 在写jsx的时候，把类名全部规划好，写完之后，再进入css文件添加样式


## 4. children的使用

- 本质：将jsx内容作为props传入
- 功能：多包装一层，添加一个wrap，也能够多添加一些限制条件，或者是添加固定的样式

#### children使用示例
- 目的：写一个布局，让导航栏长期显示，只有下面的内容跟随路由变化

App.jsx
``` jsx
import './App.css';
import { Routes, Route } from 'react-router-dom';
import AllMeetups from './pages/AllMeetups';
import Favourites from './pages/Favourite';  
import NewMeetup from './pages/NewMeetups';
import Layout from './components/layout/layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/all-meetups' element={<AllMeetups />} />
        <Route path='/new-meetup' element={<NewMeetup />} />
        <Route path='/favourites' element={<Favourites />} />
      </Routes>
    </Layout>
  );
}

export default App;
```

Layout.jsx
``` jsx
import MainNavigation from './MainNavigation'

const Layout = (props) => {
  return <>
        <MainNavigation />
        {props.children}
    </>
}

export default Layout
```

所有的路由都放在Layout中，所以我们想让Layout本身就具有导航的这部分内容，所以先把<MainNavigation />放在<Layout />里，然后再传入children，非常干净优雅。


#### children使用示例2

MeetupItem.jsx
``` jsx
import classes from './MeetupItem.module.css'
import Card from '../UserInterface/Card'

const MeetupItem = ({image, title, address, description}) => {
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={image} alt="" />
                </div>
                <div className={classes.content}>
                    <h2>Hello {title}</h2>
                    <h3>ADDRESS : {address}</h3>
                    <h3>{description}</h3>
                </div>
                <div className={classes.actions}>
                    <button>To Favourites</button>
                </div>
            </Card>
        </li>
    )
}

export default MeetupItem
```

Card.jsx
``` jsx
import classes from './Card.module.css'

const Card = (props) => {
  return (
    <div className={classes.card}>{props.children}</div>
  )
}

export default Card
```

- children的使用
1. 新建一个父级组件Card
2. 在要添加wrap的组件中引入并且调用Card，将jsx内容写到Card内部
3. 在父级组件声明处传入props，在return的内容中传入{props.children}


## React组件必须是同步的，并且不能返回Promise，必须直接返回jsx
