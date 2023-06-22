# social-media-api

```sh
$

📦Install

```sh
$ npm install
```
        
💻Usage

Replace MongoDB connection string in server/config/dbConfig.js
```js
const dbConnect = () =>{
    try {
        mongoose.connect(`mongodb+srv://${process.env.MONGO_CRED}@cluster0.8wdm4gd.mongodb.net/BLOG-API`).then(()=>{
            console.log('DB Connected :)')
        }).catch((e)=>{
            console.log(e)
        })
    } catch (error) {
       console.log(error) 
    }
}
```
🚀Start 
```sh
$ npm start
```

<!-- Main folder = "server" -->
