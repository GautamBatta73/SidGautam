const PORT = 3000;

const fetch = require("node-fetch");
const Express = require("express");
const path = require("path");
const cors = require('cors');
const fs = require("fs");
const app = Express();

app.use(Express.json());
app.use(Express.static("public"));

const allowedOrigins = ['http://localhost:3000', 'https://sidgautamai.glitch.me'];
app.use(cors({
      origin: function (origin, callback) {
        if (allowedOrigins.includes(origin) || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      optionsSuccessStatus: 204,
}));

app.route(["/", "/chat", "/home"]).get((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

async function log(prompts) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    model: prompts[2],
    user: prompts[0],
    ai: prompts[1],
  };

  const logPath = path.join(__dirname, "logs", "log.jsonl");

  fs.appendFile(logPath, JSON.stringify(logEntry) + "\n", (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    } else {
      console.log("Log entry written successfully.");
    }
  });

  const { size } = await fs.promises.stat(logPath);
  console.log(`${size / (1024 * 1024)} MB`);
}

app.route("/api").post(async (req, res) => {
    let prompts = ["", null]
    try {
      const userIn = JSON.stringify(req.body.prompt || "").slice(1, -1);
      const userModel = req.body.model;
      let aiModel = "deepseek-ai/DeepSeek-V3-0324";
      let tokens = 1000;
      //console.log("User Input: ", userIn);
  
      if (userModel == "1") {
          aiModel = "deepseek-ai/DeepSeek-R1";
          tokens = 1500;
      } else if (userModel == "2") {
          aiModel = "chutesai/Llama-4-Maverick-17B-128E-Instruct-FP8";
      }
  
      prompts[0] = userIn;
      prompts[2] = aiModel;
    
      const API_URL = `${process.env.API_URL}`;
          const headers = {
              "Authorization": `Bearer cpk_a72901369e414a5a8d5e6d46917f1292.1dd4bed2d1525512af428608f5f04e18.ajYfcq3clCgbfwKeC5KvD6sbOCcIEL4R`,
              "Content-Type": "application/json"
          };
          const body = JSON.stringify({
              model: aiModel,
              messages: [
                  {
                      role: "system",
                      content: `You are SidGautamAI: A helpful, respectful and honest chat assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature. If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you do not know the answer to a question, please do not share false information.`,
                  },
                  { role: "user", content: userIn },
              ],
              stream: false,
              max_tokens: tokens,
              temperature: 0.5
          });
  
          
          const response = await fetch(API_URL, { method: "POST", headers, body });
          if (!response.ok) {
              //console.error("API Error:", response.status, response.statusText);
              throw new Error(`API responded with status: ${response.status}`);
          }
  
          const data = await response.json();
          //console.log("API Response Data:", data);
  
          const answer = data.choices?.[0]?.message?.content;
          if (!answer) {
              throw new Error("Invalid response format or undefined answer.");
          }
  
          res.status(200).send(answer);
          prompts[1] = answer;
      } catch (error) {
          //console.error("Server Error:", error.message);
          res.status(500).send("Internal Server Error.");
          prompts[1] = error.message;
      }
      
      prompts[1] = prompts[1] ?? "Error";
      await log(prompts);
  });

// app.route("*name").get((req, res) => {
//     res.sendFile(path.join(__dirname, 'public', "index.html"));
//     res.status(503).sendFile(path.join(__dirname, 'public', "errorPages/503.html"));

// });

app.route("/logs{/:file}").get((req, res) => {
  const ACTIVE = false;
  
  if (ACTIVE) {
    if (req.params.file) {
      let file = path.join(__dirname, "logs", `${req.params.file}`);   
      
      if (file.endsWith(".jsonl")) {
        res.setHeader("Content-Type", "application/json");
      }
      
      return res.sendFile(file);
    } else {    
      let dir = fs.readdirSync(path.join(__dirname, "logs"));
      return res.send(dir);
    }
  } else {
    return res.status(401).sendFile(path.join(__dirname, "public", "errorPages/401.html"));
  }
});

app.use((req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "public", "errorPages/404.html"));
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
