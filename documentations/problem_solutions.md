### proble 1 node:internal/dns/promises:294
<details>
<summary>problem error message</summary>

error details
```bash
node:internal/dns/promises:294
 this.reject(new DNSException(err, this.bindingName, this.hostname));
 ^
Error: querySrv ECONNREFUSED _mongodb._https://lnkd.in/exAHAB6i
 at QueryReqWrap.onresolve [as oncomplete] (node:internal/dns/promises:294:17) {
 errno: undefined,
 code: 'ECONNREFUSED',
 syscall: 'querySrv',
 hostname: '_mongodb._https://lnkd.in/exAHAB6i'
}
```
##### soliution
This problem was you internet sarvice provider block you unknown request
just add this line after env config function call
``index.js``
```js
import { configDotenv } from "dotenv"
import dns from "dns"
configDotenv();
// just add this line
dns.setServers(["1.1.1.1", "8.8.8.8"]);
```
</details>


### problem 2 can't found index.js

<details>
<summary>Solution how to fix it</summary>

- step 1 add your start command for node this help to run your project in cloud sarver
```json
 "scripts": {
    "start": "node ./src/index.js",
    "dev": "nodemon --env-file=.env --experimental-json-modules ./src/index.js"
  }
```
- step 2 add you node version in package.json when you have project with ES6 Modul js
```json
  "engines": {
    "node": ">=18.0.0"
  },
```
- step 3 add you main file path in package.json file on the top
```json
{
    "main": "src/index.js",
}
```
- overview
```json
{
  "name": "create_simple_api",
  "version": "1.0.0",
  "description": "simple api to crud oparetions",
  "license": "ISC",
  "author": "",
  "type": "module",
  "main": "src/index.js",
  "scripts": {
    "start": "node ./src/index.js",
    "dev": "nodemon --env-file=.env --experimental-json-modules ./src/index.js"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "cloudinary": "^2.9.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dotenv": "^17.3.1",
    "express": "^5.2.1",
    "mongoose": "^9.3.0",
    "mongoose-sequence": "^6.0.1",
    "multer": "^2.1.1",
    "multer-storage-cloudinary": "^2.2.1"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```
</details>

### problem 3 How to add auto incriment and mongoose model
<details>
 <summary>how to fix it</summary>

- step 1 create a counter model
`counter.model.js`
```js
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    seq:{
        type:Number,
        default:0
    }
});

export default mongoose.model("Counter",counterSchema);
```

- step 2 add incriment property and add same logic before save the model
- step 1 import the counter model from CountermodelSchema 
- step 2
```js
   if (this.isNew) {

            const counter = await Counter.findOneAndUpdate(
                { id: "user_auto_id" },
                { $inc: { seq: 1 } },
                { returnDocument: "after", upsert: true }
            )

             this.userId = counter.seq;
        }
```
step 3 check duplicate entry from user model
```js
    // duplicate check zeno auto increment useId create na hoy
        const checkDuplicateUser = await mongoose.models.User.findOne({
            $or:[
                {username:this.username},
                {email:this.email}
            ]
        });

        if(checkDuplicateUser){
            return console.log("❌ username or email exist")
        }
```

`user.model.js`
```js
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import Counter from "./counter.model.js";

const userSchema = new Schema(
    {
        userId: { type: Number, unique: true },
        username: { type: String, unique: true, trim: true, required: true },
        email: { type: String, unique: true, trim: true, required: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: true, },
        role: { type: String, default: "user" }
    }, { timestamps: true }
)

userSchema.pre("save", async function (next) {
    try {

        if (this.username) this.username = this.username.replace(/\s+/g, "");
        if (this.email) this.email = this.email.replace(/\s+/g, "");

        // duplicate check zeno auto increment useId create na hoy
        const checkDuplicateUser = await mongoose.models.User.findOne({
            $or:[
                {username:this.username},
                {email:this.email}
            ]
        });

        if(checkDuplicateUser){
            return console.log("❌ username or email exist")
        }
        
        if (!this.isModified("password")) {
            return next();
        }

        this.password = await bcrypt.hash(this.password, 10);

        if (this.isNew) {

            const counter = await Counter.findOneAndUpdate(
                { id: "user_auto_id" },
                { $inc: { seq: 1 } },
                { returnDocument: "after", upsert: true }
            )

             this.userId = counter.seq;
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
})

const User = mongoose.model("User", userSchema);

export default User


```
</details>
