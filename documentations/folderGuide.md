### Professional architecture 🔥
```bash
project/
│
├─ models/
│   ├─ user.model.js       # User schema + middleware
│   └─ counter.model.js    # Counter schema
│
├─ controllers/
│   └─ auth.controller.js  # Registration, login, business logic
│
├─ routes/
│   └─ auth.route.js       # Express routes
│
├─ services/ (optional)
│   └─ user.service.js     # Complex business logic if needed
│
├─ utils/
│   └─ helper.js           # Generic helpers (e.g., password compare)
│
└─ server.js / app.js      # Main server
```

##### Route:
- Request handle

##### Controller:
<details>
<summary>Business logic</summary>
 Real life example
 ধরো একটা E-commerce site

 Rules:

 ✔ user order করলে stock কমবে
 ✔ stock 0 হলে order হবে না 
 ✔ discount apply হবে
 ✔ same email দিয়ে account হবে না

 এই rules গুলোই business logic।
</details>

##### Service (optional):
- Complex business logic

##### Model:
- Database structure

##### Middleware:
<ditails>
  <summary>Auto processing</summary>
  Real project example 🔥

Professional middleware use:

✔ Password hash
✔ Email normalize
✔ Auto id
✔ Slug generate
✔ Soft delete flag
✔ Timestamps
✔ Audit fields (createdBy)

Middleware এ কি রাখা উচিত না ❌

এইগুলো middleware এ রাখা bad practice:

❌ API response logic
❌ req / res logic
❌ business logic
❌ controller logic
</ditails>

