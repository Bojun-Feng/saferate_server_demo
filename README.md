# Node.js RAG Chat Bot Server

Instructions (assuming npm and node are installed):
1. clone the repository
2. cd into root directory
3. run `npm i` to install libraries
4. run `npm run dev` to start the server

To test the model, open another terminal and run:
```
curl -X POST http://localhost:[PORT]/predict \
     -H "Content-Type: application/json" \
     -d '{"arg1": 2, "arg2": 1}'
```

Where `[PORT]` is replaced by the port number (default is 1111). Example:
```
curl -X POST http://localhost:1111/predict \
     -H "Content-Type: application/json" \
     -d '{"arg1": 2, "arg2": 1}'
```

Please note that you need to have the system environment set up with OpenAI API key

Before running `npm run dev` to start the server, run:
```
export OPENAI_API_KEY=[your api key]
```

Then, print the api key in the terminal with the following test:
```
echo $OPENAI_API_KEY
```

You should see the API Key show up. Now run `npm run dev` and the chatbot should work!
