const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = [];
const deploySlashCommands = async () => {
  const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
  const applicationId = 'YOUR_APPLICATION_ID'
  const guildId = 'YOUR_GUILD_ID'
  const command = require('./hello');
  commands.push(command.data.toJSON());
  // This commented code should be uncommented if you want to deploy the commands globally in all the servers
  /* rest.put(Routes.applicationCommands(applicationId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
  */
  // Comment this if you are deploying commands globally
  rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
}
deploySlashCommands();


