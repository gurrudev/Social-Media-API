# Social-Media-Api (BlobHub API's)

📦Install

```sh
$ npm install
```
        
💻Usage

Replace MongoDB connection string in config/dbConfig.js
```js
const dbConnect = () =>{
    try {
        mongoose.connect(`mongodb+srv://${process.env MONGO_CRED}.mongodb.net/BLOG-API`).then(()=>{
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

