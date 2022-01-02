## This bot was mostly coded by Ascynx#2020

The handler used for this project is a modified version of https://github.com/reconlx/djs-base-handler

The new page for this project is [here](https://github.com/ascynx-betas/botcynx-typescript)

# Events

#### ButtonCreate

In this version, is only used for weight but in typescript is used for all types of buttons

#### CopyLink

Based on Fire's Link quote feature, allows to paste the message at a message link if the bot is also in that server

#### GuildCreate

The event that happens when a guild is created, what more is there to say

#### interactionCreate

Happens when an interaction is created works along with ButtonCreate

#### messageCreate

Happens when a message appears, is used to detect a prefix command

#### ready

Happens when the bot loads up

#### RoleChange

Linked to guild configs

## Currently the bot has the following commands

### Moderation

#### /role

Someone with MANAGE_ROLES perm can add / remove a role from/to someone, as long as they're either owner or have a higher role than the one given / removed

#### /echo

Speak through the bot to a specified Text channel or DM channel

#### /ping

Just a ping command

### Hypixel API

#### /hyinfo

A user can see some informations on the specified minecraft user

#### /stalk

A user can see the current activity of the specified minecraft user

#### /userinfo

Gets information from the database about the user

#### /verify

Adds the user and it's uuid to the database

#### /weight

A user can use this command to check someone's skyblock weight

### Ticket

#### /setupticket

Someone with Admin perm can use this command to create a new thread ticket system in a specified channel

#### /ticket

Someone with MANAGE_THREADS perm can use this command to act on certain threads / ticket systems

### Config

#### /setconfig

Someone with MANAGE_ROLES perm can use this command to add an entry to the guild's configuration

#### /delconfig

Someone with MANAGE_ROLES perm can use this command to remove an entry from the guild's configuration

#### /dev

A super-user / the dev can use this command to execute indev / dangerous commands

#### /checkconfig

Someone with MANAGE_ROLES perm can use this command to see the current configuration of the guild they're in

#### /reload

Globally disabled -- someone with MANAGE_ROLES perm can use this command to execute the "purge".

### Context Menu Commands

#### User - getAvatar

Return's the target's avatar in an embed

#### User - getInfo

Returns the target's info from the linked accounts database

### Non-slash Commands

#### move

Moves users from a voice channel to another

#### su

Adds / remove the user from the server's super user list

#### webhookdelete

Deletes the specified webhook using it's link

#### ping

Just a ping command

#### kill

Destroys the client, disconnects from mongodb and kills the process

#### label / removelabel

Adds / remove a label from specified users
