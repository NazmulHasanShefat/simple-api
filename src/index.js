import { configDotenv } from "dotenv"
import { app } from "./app.js";
import dbConnect from "./db/dbConnect.js";
import dns from "dns"
configDotenv();

dns.setServers(["1.1.1.1", "8.8.8.8"]);



dbConnect()



.then(()=>{
    app.listen(process.env.PORT || 9000, ()=>{
        console.log(`server is running on port http://localhost:${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log(`mongobd catch a error from index.js: ${err}`)
})