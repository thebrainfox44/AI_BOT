# AI BOT
this project is a proof of concept showcasing a text to programatic command using a discord botfor user inputs.

# DISCONTINUED
the project has been discontinued and havent receivend any update for aproximatly 2 years. API evolved and some of them were completly shut down. This code might not work anymore. If the code is still working (unlikely) you will also need to modify 1 line otherwise it would crash. Line 75 is trying to send a message to a specific user on startup. the user id has been redacted. you need to replace XXXXX with a proper discord userid.

# How to start
1. get a discord token and an openai api key
2. open .env and provide the credentials
3. run with nodejs using this command ```node main```
4. send a message starting with ! so the bot will interpret this message
5. try it out!

# 
during the early rise of AI and the launch of an affordable openai api, i wanted to test its capabilities and integrated it on discord to get a chatbot that is able to execute commands. A few months later this "programatic command" feature was added in the official openai api using two elements:
1) Json responses (the model is always returning valid json objects) allowing us to get reliable answers.
2) Functions calls (allowing the model to call 3rd party functions through the tought process) allowing us to implement directly in a safer way functions that can be called inside of a response. One element that makes it really good is that the response to the function call can be directly used by the model to forge a better user friendly answer.
