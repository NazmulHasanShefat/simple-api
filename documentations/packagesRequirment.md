### packages used
##### Atfirst we intall express for create node server application
<details>
 <summary>Why we use expressjs</summary>

- Node.js-এ HTTP server বানাতে গেলে built-in http module দিয়েও করা যায়, কিন্তু সেটা অনেক কষ্টকর। Express সেই কাজকে সহজ করে দেয়।

-  Routing সহজ হয় URL এবং HTTP method অনুযায়ী আলাদা আলাদা handler লেখা যায় cleanly।
-  Middleware সিস্টেম Request আসলে একের পর এক function চালানো যায় — যেমন authentication check, logging body parsing।
- Body Parsing সহজ req.body দিয়েই JSON data পাওয়া যায়, manually parse করতে হয় না।
- Error Handling Centralized error handling করা যায়।
</details>

```bash
npm i express 
```
#### node nodemon use for live reload on any changes in the code
```bash
npm i -D nodemon
```

### step 2 intall mongoose
<details>
<summary>Why we use mongoose</summary>

- Mongoose মূলত MongoDB-র উপর একটা ODM (Object Data Modeling) layer — যা data-কে organized, validated এবং manageable রাখে।
- MongoDB-তে Node.js দিয়ে কাজ করতে গেলে raw mongodb driver দিয়েও করা যায়, কিন্তু Mongoose সেটাকে অনেক সহজ ও structured করে দেয়।

-  Schema দিয়ে Data Structure ঠিক রাখা যায় MongoDB নিজে schema-less, যেকোনো data ঢোকানো যায়। Mongoose দিয়ে বলে দেওয়া যায় কোন field কী type হবে।

-  Data save করার আগেই Mongoose check করে নেয়।
- Query অনেক সহজ ও Readable
- এক collection থেকে আরেক collection-এর data সহজে আনা যায়।
```js
const orderSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

// Join করার মতো কাজ
Order.find().populate('user').populate('product');
```
- Middleware (Hooks) Save বা Delete-এর আগে/পরে কাজ করানো যায়। যেমন পাসওয়ার্ড hash করা। 
```js
// Password save করার আগে hash করো
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
```
-  Instance ও Static Methods Model-এর সাথে custom method যোগ করা যায়।
```js
userSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

const user = await User.findById(id);
console.log(user.getFullName()); // 'Rahim Uddin'
```
</details>

 ```bash
npm i mongoose
 ```

### step 3 intall dotenv
<details>
 <summary>Why we use dotenv</summary>
 for storing secret keys and confidential data
</details>

 ```bash
npm i dotenv
 ```

### step 4 intall cors
<details>
 <summary>Why we use cors</summary>

- CORS deside করে কোন domain এর request server accept করবে কোন domain এর request accept করবে না
- CORS = তোমার backend-এর দরজার security guard — কাকে ঢুকতে দেবে, কাকে না, সেটা তুমি ঠিক করো। 🔐
</details>

 ```bash
npm i cors
 ```

### step 5 intall cors
<details>
 <summary>Why we use cors</summary>

- CORS deside করে কোন domain এর request server accept করবে কোন domain এর request accept করবে না
- CORS = তোমার backend-এর দরজার security guard — কাকে ঢুকতে দেবে, কাকে না, সেটা তুমি ঠিক করো। 🔐
</details>

 ```bash
npm i cors
 ```

### step 6 intall cookie-parser
<details>
 <summary>Why we use cookie-parser</summary>

- Cookie-Parser = Browser এর cookie গুলো সুন্দরভাবে পড়ার যন্ত্র।
JWT token, session data, user preference — সব cookie তে রাখা যায়, আর cookie-parser সেটা সহজে req.cookies হিসেবে দেয়। 🍪

- secratly securely আনেক information client এর browser এ save করতে হয়। যেন আন্য কেউ সেটা read করতে না পারে এজন্য cookie-parser use করা হয়।  
</details>

 ```bash
npm i cookie-parser
 ```
### step 7 intall bcryptjs
<details>
 <summary>Why we use bcriptjs</summary>
 For passord incription normal passor to hash password
</details>

 ```bash
npm i bcryptjs
 ```
### step 8 intall cloudinary and multer multer-storage-cloudinary
<details>
 <summary>Why we use cloudinary and multer multer-storage-cloudinary</summary>

### ১. Multer (দ্য মিডলওয়্যার)
- Multer মূলত একটি Node.js মিডলওয়্যার যা multipart/form-data হ্যান্ডেল করে। যখনই আমরা কোনো ফাইল (ইমেজ, পিডিএফ) আপলোড করি, তখন সাধারণ body-parser দিয়ে সেই ডাটা পড়া যায় না।

- কেন ব্যবহার করবেন: এটি ইউজারের পাঠানো ফাইলটিকে সার্ভারে রিসিভ করে এবং সেটিকে প্রসেস করার উপযোগী করে তোলে।

- প্রধান কাজ: ফাইল সাইজ লিমিট করা, নির্দিষ্ট ফরম্যাট (যেমন: শুধু JPG/PNG) ফিল্টার করা এবং ফাইলটিকে একটি বাফার বা টেম্পোরারি স্টোরেজে রাখা।

### ৩. Multer-Storage-Cloudinary (সেতুবন্ধন)
##### এটি একটি ইঞ্জিন যা Multer-কে বলে দেয় যে ফাইলটি লোকাল হার্ডড্রাইভে সেভ না করে সরাসরি Cloudinary-তে পাঠিয়ে দিতে।

- কেন ব্যবহার করবেন: এটি ছাড়া আপনাকে প্রথমে Multer দিয়ে ফাইলটি নিজের সার্ভারে সেভ করতে হতো, তারপর আলাদা কোড লিখে Cloudinary-তে পাঠাতে হতো। এই প্যাকেজটি সেই কাজটিকে সহজ ও অটোমেটিক করে দেয়।

- ১. ইউজার ফর্মের মাধ্যমে ছবি পাঠায়।
- ২. Multer সেই ফাইলটি রিসিভ করে।
- ৩. Multer-Storage-Cloudinary সেই ফাইলটিকে আপনার Cloudinary অ্যাকাউন্টে আপলোড করে।
- ৪. আপলোড শেষে Cloudinary একটি Secure URL রিটার্ন করে।
- ৫. আপনি সেই URL-টি নিয়ে আপনার MongoDB ডাটাবেসে ইউজার বা প্রোডাক্টের ডাটা হিসেবে সেভ করেন।

### how to use
- step 1 Cloudinary config
```js
// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

**.env file:**
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
- Step 3: Multer + Cloudinary Storage setup
```js
// config/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "users",        // Cloudinary folder name
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

export const upload = multer({ storage });
```
- Step 4: MongoDB Model
```js
// models/User.js
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true },
    email:    { type: String, required: true },
    avatar:   { type: String },   // Cloudinary URL এখানে save হবে
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
```
- Step 5: Controller
```js
// controllers/userController.js
import User from "../models/User.js";

export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        
        // multer স্বয়ংক্রিয়ভাবে Cloudinary তে upload করে
        // এবং req.file তে URL দিয়ে দেয়
        const avatarUrl = req.file?.path;  // ← Cloudinary URL

        const user = await User.create({
            username,
            email,
            avatar: avatarUrl,
        });

        res.status(201).json({ success: true, user });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
```
- Step 6: Route
```js
// routes/userRoute.js
import express from "express";
import { upload } from "../config/multer.js";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// upload.single("avatar") — "avatar" হলো form-data field name
router.post("/create", upload.single("avatar"), createUser);

export default router;
```

---

### Postman এ test করার নিয়ম:
```
POST /api/users/create
Body → form-data

Key          | Value
-------------|------------------
username     | John
email        | john@gmail.com
avatar       | [file select করো]  ← type: File
```
- MongoDB তে যা save হবে:
```json
{
  "_id": "664abc...",
  "username": "John",
  "email": "john@gmail.com",
  "avatar": "https://res.cloudinary.com/your_cloud/image/upload/v123/users/abc.jpg",
  "createdAt": "2024-01-01"
}
```
- req.file এ কী কী পাওয়া যায়:
```js
req.file = {
    path:         // ← Cloudinary URL (এটাই save করবে)
    filename:     // ← public_id
    originalname: // ← original file name
    mimetype:     // ← image/jpeg
    size:         // ← file size
}
```
</details>

 ```bash
npm install cloudinary multer multer-storage-cloudinary
 ```



