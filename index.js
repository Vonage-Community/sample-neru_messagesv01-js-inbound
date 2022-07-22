import { neru, Messages } from 'neru-alpha';
import express from 'express';

const app = express();
const port = process.env.NERU_APP_PORT;

const session = neru.createSession();
const messages = new Messages(session);

const vonageNumber = JSON.parse(process.env.NERU_CONFIGURATIONS).contact;

// Listen for messages from all numbers
await messages.listenMessages(
    { type: 'sms', number: null },
    vonageNumber,
    'onMessage',
).execute();

// Listen for events
await messages.listenEvents(
    vonageNumber,
    { type: 'sms', number: null},
    'onEvent',
).execute();

app.use(express.json());

app.get('/_/health', async (req, res) => {
    res.sendStatus(200);
});

app.post('/onMessage', async (req, res) => {
    const message = req.body.message.content.text;
    console.log(`Message received: ${message}`);

    const to = { type: "sms", number: req.body.from.number };
    await messages.sendText(vonageNumber, to, `You sent: "${message}"`).execute();
    res.sendStatus(200);
});

app.post('/onEvent', async (req, res) => {
    const { status } = req.body;
    console.log(`message status is: ${status}`);

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
