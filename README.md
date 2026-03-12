### packages used
###### Atfirst we intall express for create node server application
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