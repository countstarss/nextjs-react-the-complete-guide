import { buildFeedbackPath,extractFedback } from "./feedback";

function handler(req, res) {
    if(req.method === 'POST') {

    }else if(req.method === 'DELETE'){

    }else if(req.method === 'PUT'){

    }else{
        const feedbackId = req.query.feedbackId;
        const filePath = buildFeedbackPath();
        const feedbackData = extractFedback(filePath);
        const selectedFeedbackData = feedbackData.find(
            (feedback) => feedback.id === feedbackId
        );
        res.status(200).json({ feedback: selectedFeedbackData})
    }
}

export default handler;
