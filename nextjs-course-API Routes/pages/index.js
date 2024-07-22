import { useRef, useState } from "react";


function HomePage() {

    const [feedbackItems,setFeedbackItems] = useState([]);

    const emailInputRef = useRef();
    const feedbackInputRef = useRef();

    function onSubmitHandler(event) {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredFeedback = feedbackInputRef.current.value;

        const reqBody = {
            email:enteredEmail,
            feedback:enteredFeedback
        }

        fetch('api/feedback',{
            method:'POST',
            body: JSON.stringify(reqBody),
            headers :{
                'Content-Type' : 'application/json'
            }
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            // 处理错误响应
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    function loadFeedbackHandler() {
        fetch('api/feedback')
        .then(response => response.json())
        // data整体是返回的数据，data.feedback是网页返回的消息，实际上是获取的文件中的内容
        .then(data => setFeedbackItems(data.feedback))
    }

    return<>
        <h1>HELLO,NEXT</h1>
        <form action="" onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" ref={emailInputRef}/>
            </div>
            <div>
                <label htmlFor="feedback">Feedback</label>
                <textarea type="text" name="feedback" id="feedback" rows='5' ref={feedbackInputRef}/>
            </div>
            <button>Send Feedback</button>
        </form>
        <hr />
        <button onClick={loadFeedbackHandler}>Load Feedback</button>
        <ul>
            {feedbackItems.map((item) => (
                <li key={item.id}>{item.feedback}</li>
            ))}
        </ul>
        </>
}

export default HomePage;