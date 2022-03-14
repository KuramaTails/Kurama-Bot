module.exports = {
    async execute(msg,msgfeature,args,player) {
        var listchannels = msg.guild.channels.cache
        var selChannel = listchannels.get(msg.channelId)
        if(player.getQueue(msg)){
            switch (msgfeature) {
                default:
                    msg.delete();
                    selChannel.send("No commands found").then(botMessage => {
                        setTimeout(() => {
                            botMessage.delete()
                        }, 10*1000);
                    })
                break;
            }
        }	
    }
};
   
