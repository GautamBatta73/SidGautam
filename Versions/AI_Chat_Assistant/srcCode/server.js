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
    let userIn = JSON.stringify(req.body.prompt).slice(1, -1);
    console.log(userIn);
	
	// await fetch("...", {
	// 	//Y'all don't get to see my code!
    // }).then(response => {
    //         console.log('Response status:', response.status);
    //         console.log(response);
    //         if(response.status === 200) {
    //             return response.text();
    //         } else {
    //             throw new Error("Internal Server Error.");
    //         }
    //     }).then(data => {
    //         console.log('Data: ', data);
    //         let json = JSON.parse(data);
    //         let ans = json.choices[0].message.content;
    //         console.log('AI:', ans);
    //         if (typeof ans == 'undefined') {
    //             throw new Error("Internal Server Error.");
    //         } else {
    //             res.status(200).end(ans);
    //         }
    //     }).catch(error => {
    //         console.error('Error:', error);
    //         res.status(500).send("Internal Server Error.");
    //     });

	res.end("SidGautamCode is Incomplete!")
});

// app.route("*").get((req, res) => {
//     res.sendFile(path.join(__dirname, 'public', "index.html"));
//     res.status(503).sendFile(path.join(__dirname, 'public', "errorPages/503.html"));
  
// });

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', "errorPages/404.html"));
});

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));