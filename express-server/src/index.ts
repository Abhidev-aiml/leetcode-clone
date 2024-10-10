
import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();
client.connect();

app.post('/submit', async(req, res) => {
    const { problemId, code,language,userId } = req.body;

    try {
        await client.lPush('submissions', JSON.stringify({ problemId, code, language, userId }));
        res.json({ message: 'Submission received' });
    } catch (error) {
        res.status(500).json({ message: 'Submission failed' });

        
    }
})

app.listen(3000, () => {
    console.log('Worker started');
})