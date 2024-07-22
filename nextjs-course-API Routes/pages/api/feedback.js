import fs, { readFileSync } from 'fs'
import path from 'path';


export function buildFeedbackPath() {
    return path.join(process.cwd(),'data','feedback.json')
}

export function extractFedback(filePath) {
    const fileData = readFileSync(filePath);
    const data = JSON.parse(fileData);
    return data;
}

function handler(req, res) {
    if(req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.feedback;

        const newFeedback = {
            id:new Date().toISOString(),
            email:email,
            feedback:feedbackText
        };

        const filePath = buildFeedbackPath()
        const data = extractFedback(filePath);
        data.push(newFeedback);
        fs.writeFileSync(filePath,JSON.stringify(data));
        res.status(201).json({message:"success!",feedback:newFeedback})
    }else{
        const filePath = buildFeedbackPath()
        const data = extractFedback(filePath);
        // feedback是返回数据的名字
        res.status(200).json({ feedback: data });
    }
    
}

export default handler;