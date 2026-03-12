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