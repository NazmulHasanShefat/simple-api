

## 2️⃣ Code placement (based on your files)
#### ✅ models/user.model.js
- Schema definition
- Field types
- Default values
- Timestamps

### Pre save middleware for:
- Password hashing ✅
- Auto increment ID ✅
- Username/email clean-up ✅

Middleware reason: automatically run before save, so DB layer logic।

### ❌ NOT in model:
- API validation
- Duplicate check for user (business rule)
- ✅ models/counter.model.js
- Counter schema
- Only DB fields: id + seq
- Middleware: none

### ✅ controllers/auth.controller.js

- Business logic goes here:
- Duplicate user check (username/email)
- API response (success/error)
- Role assignment logic
- Optional: token generation, login check

Example:
```js
import User from "../models/user.model.js";

export const registerUser = async (req,res) => {
    const {username,email,password} = req.body;

    // business logic: duplicate check
    const exist = await User.findOne({ $or: [{username},{email}] });
    if(exist){
        return res.status(400).json({message:"Username or email already exists"});
    }

    // now save user (middleware will hash password + auto increment)
    const user = await User.create({username,email,password});
    res.status(201).json(user);
}
```
### ✅ routes/auth.route.js
- Define express route
- Call controller function

Example:
```js
import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;
```

## ✅ Services (Optional)

For complex business rules, you can use the `services/` folder. Examples include:

- Discount calculation  
- Payment processing  
- Role permissions  
- Anything that is **business-rule heavy**

---

## ✅ Utils

Helper functions go in the `utils/` folder. Examples include:

- Password compare  
- Token generation  
- Email validation  
- Any reusable function across the project  

---

## 3️⃣ Rules for Code Placement

| Type of Code                                    | Where to Place                     |
|-------------------------------------------------|-----------------------------------|
| Field type / schema / default value            | `models/`                         |
| Auto increment / password hash / slug / timestamps | Model middleware                  |
| Duplicate check / role check / permissions     | Controller (Business logic)       |
| API request/response                            | Controller / Route                |
| Generic helpers                                 | `utils/`                          |
| Complex business rules                           | `services/` (optional)            |

---

## 4️⃣ Why This Separation?

- **Middleware** = automatic DB-level pre/post processing  
- **Controller** = enforces business rules + sends API response  
- **Model** = only schema + DB-level constraints  
- **Service** = heavy business logic if controller gets complex  
- **Utils** = reusable helpers  

✅ This clean architecture ensures **easy maintenance** and **fewer bugs**.

---

## 5️⃣ How This Pattern Solves Current Issues

| Issue                                                | Solution Placement / Behavior                                                |
|-----------------------------------------------------|----------------------------------------------------------------------------|
| `userId` auto increment                             | Stays in middleware ✅                                                      |
| Password hash                                       | Stays in middleware ✅                                                      |
| Duplicate username/email                             | Move to controller (Business logic) ❌                                      |
| API error response                                  | Move to controller ❌                                                       |
| Counter increment only if user is unique           | Controller checks duplicates first → middleware increments counter ✅       |