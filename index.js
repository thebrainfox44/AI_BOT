const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv").config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getOpenAiResponse(question) {
  const response = await openai.createCompletion({
    model: "text-davinci-002",
    prompt:
      'Convert this text to a programmatic command:\n\nExample: Ask Constance if we need some bread.\n[action: `send msg`, target:`constance`, content:`Do we need some bread?`]\n\nExample: delete this channel.\n[action: `delete channel`, target:`current channel`, guild:`current guild`]\n\nExample: delete the channel test.\n[action: `delete channel`, target:`test`, guild:`current guild`]\n\nExample: delete the channel test on the guild something.\n[action: `delete channel`, target:`test`, guild:`something`]\n\nExample: delete the channel test on the server something.\n[action: `delete channel`, target:`test`, guild:`something`]\n\nExample: in one hour, delete the channel test.\n[action: `delete channel`, target:`test`, guild:`something`, await:`60`]\n\nExample: in one day ask thebrainfox for some help.\n[action: `send msg`, target:`thebrainfox`, await:`1440`]\n\nExample: create the channel test.\n[action: `create channel`, target:`test`, guild:`current guild`]\n\nExample: create the channel test on the guild something.\n[action: `create channel`, target:`test`, guild:`something`]\n\nExample: create the channel test on the guild something.\n[action: `create channel`, target:`test`, guild:`something`]\n\nExample: ban myself of this guild.\n[action: `ban`, target:`current user`, guild:`current guild`]\n\nExample: send an embed.\n[action: `send embed`, target:`current channel`, title:`this is the title`, content:`this is the content`]\n\nExample: send an embed with "name" as the title\n[action: `send embed`, target:`current channel`, title:`name`, content:`this is the content`]\n\nExample: send an embed with "blah blah blah" as the content\n[action: `send embed`, target:`current channel`, title:`this is the title`, content:`blah blah blah`]\n\nExample: mute kosei\n[action: `mute`, target:`kosei`, channel:`current channel`, duration:`1440`]\n\nExample: mute litlepapaye 45min \n[action: `mute`, target:`litlepapaye`, channel:`current channel`, duration:`45`] \n\nmute thebrainfox \n[action:`mute`, target:`thebrainfox`, channel:`current channel`, duration: 1440]\n' +
      question +
      ".\n",
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  console.log(response.data.choices[0].text);
  return response.data.choices[0].text;
}

const Datastore = require("nedb");
const Discord = require("discord.js");
const {
  Client,
  Intents,
  Message,
  MessageEmbed,
  GuildMember,
  messageLink,
  EmbedBuilder,
  WebhookClient,
  ActionRowBuilder,
  SelectMenuBuilder,
  PermissionsBitField,
} = require("discord.js");
const client = new Client({ intents: 65535 });
const BlaguesAPI = require("blagues-api");
const { default: test } = require("node:test");
const { text } = require("stream/consumers");
const DB_settings = new Datastore({
  filename: "./db/settings.db",
  autoload: true,
});
const DB_train = new Datastore({
  filename: "./db/train.jsonl",
  autoload: true,
});
const blagues = new BlaguesAPI(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODIzODI1NzM4MTE3MDIxNzE2IiwibGltaXQiOjEwMCwia2V5IjoiSHpWOVFOeDVNS2Q5S3lDbkJYMXlyZ0tTVDFUYVAyajhtdnd1RkVVUDkzZU54WG15b3UiLCJjcmVhdGVkX2F0IjoiMjAyMi0wOS0yNlQwMzo1MTo0NSswMDowMCIsImlhdCI6MTY2NDE2NDMwNX0.pTjv9TLKRBnrIcxPgmcV1UVF-1T4kEYc_fR3QLHdEtw"
);

async function getnormaljoke() {
  const blague = await blagues.random({
    disallow: [blagues.categories.DARK, blagues.categories.LIMIT],
  });
  return blague;
}

function setActivities() {
  const activities = [
    "try to send me a message, i may respond you in a few seconds",
    "développeur: thebrainfox#4621 ",
  ];

  setInterval(() => {
    client.user.setActivity(
      activities[Math.floor(Math.random() * (activities.length - 1) + 1)]
    );
  }, 10000);
}

function notifLogin() {
  client.users.fetch("823825738117021716").then((user) => {
    user.send("im online!");
    console.log("connected with ", client.user.tag);
  });
}

client.on("ready", async () => {
  notifLogin();
  setActivities();
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith("!")) return;
  let txt = msg.content.replace("!", 1);
  let res = await getOpenAiResponse(txt);
  if (
    res == "" ||
    res == "\n" ||
    res == "This is not a programmatic command."
  ) {
    return msg.channel
      .send(
        "sorry but i dont understand this. try to use basic commands because i didnt implemented all the discord features in this bot. you may also talk in english because the AI is soooo much more trained to recognize english meanings."
      )
      .then((m) => {
        setTimeout(() => {
          m.delete();
        }, 1000);
      });
  }
  msg.channel.send(res);
  msg.react('✅')
  msg.react('❌')
});

client.on("error", (error) => {
  console.error(`client's WebSocket encountered a connection error: ${error}`);
});
console.log(process.env.DISCORD_TOKEN);

client.login(
  "MTAyMDA2ODY2OTA2MzE3NjIwMg.GiTioY.GoP4sTW-YiO2nutk0U-AxCkKqm2ZcG_GSFQa50"
);
