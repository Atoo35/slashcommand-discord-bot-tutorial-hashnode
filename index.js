const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.slashCommands = new Collection();


const readSlashCommands = () => {
  let command = require(`./hello`);
  console.log("Successfully loaded " + command.data.name)
  client.slashCommands.set(command.data.name, command);
}
readSlashCommands()

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand())
    return;
  const command = client.slashCommands.get(interaction.commandName);
  if (!command)
    return;
  try {
    command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
})

client.on('ready', async () => {
  var memCount = client.guilds.cache.reduce((x, y) => x + y.memberCount, 0);
  console.log(`Bot has started, with ${memCount} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
})

client.login(process.env.BOT_TOKEN);