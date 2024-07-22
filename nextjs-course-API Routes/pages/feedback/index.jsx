import { buildFeedbackPath,extractFedback } from "../api/feedback";
import { useState } from 'react'


const Feedback = (props) => {

    const [feedbackData,setFeedbackData] = useState();

    function loadFeedbackHandler(id) {
        fetch(`api/${id}`)
            .then((response) => response.json())
            // 从api上取过来的内容是 { feedback: selectedFeedbackData}
            // 所以说，data.feedback，是一个id对应的所有数据
            .then((data) => setFeedbackData(data.feedback));
    }

  return (
    <div>
        {feedbackData && feedbackData.email}
        <ul>
            {props.feedbackItems.map((item) => (
                <li key={item.id}>
                    {item.feedback}
                    <button onClick={loadFeedbackHandler.bind(null,item.id)}>Show Detail</button>
                </li>
            ))}
        </ul>
        
    </div>
  )
}

export async function getStaticProps() {
    const filePath = buildFeedbackPath();
    const data = extractFedback(filePath);
    return {
        props:{
            feedbackItems:data
        }
    }
}

export default Feedback;