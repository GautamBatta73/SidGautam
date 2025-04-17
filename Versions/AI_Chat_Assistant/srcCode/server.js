const PORT = 3000;

const fetch = require("node-fetch");
const Express = require("express");
const path = require("path");
const app = Express();

app.use(Express.json());
app.use(Express.static("public"));

app.route(['/', '/chat', '/home']).get((req, res) => {
    res.sendFile(path.join(__dirname, 'public', "index.html"));
});

app.route("/api").post(async (req, res) => {
  try {
    const userIn = JSON.stringify(req.body.prompt).slice(1, -1);
    console.log("User Input: ", userIn);
  
    const API_URL = `${process.env.API_URL}`;
        const headers = {
            "Authorization": `Bearer ${process.env.API_KEY}`,
			"Content-Type": "application/json"
        };
        const body = JSON.stringify({
            model: "deepseek-ai/DeepSeek-V3-0324",
            messages: [
                {
                    role: "system",
                    content: `You are SidGautamAI: A helpful, respectful and honest chat assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you do not know the answer to a question, please do not share false information.`,
                },
                { role: "user", content: userIn },
            ],
            stream: false,
            max_tokens: 1000,
			      temperature: 0.5
        });

        
        const response = await fetch(API_URL, { method: "POST", headers, body });
        if (!response.ok) {
            console.error("API Error:", response.status, response.statusText);
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data);

        const answer = data.choices?.[0]?.message?.content;
        if (!answer) {
            throw new Error("Invalid response format or undefined answer.");
        }

        res.status(200).send(answer);
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).send("Internal Server Error.");
    }
});

// app.route("*name").get((req, res) => {
//     //res.sendFile(path.join(__dirname, 'public', "index.html"));
//     res.status(503).sendFile(path.join(__dirname, 'public', "errorPages/503.html"));
  
// });

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', "errorPages/404.html"));
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));