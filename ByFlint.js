
client.on("message", message => {
    if (!message.guild || message.author.bot) return;
    if (message.content == ".colors") {
        var fsn = require('fs-nextra');
        fs.readdir('./colors', async (err, files) => {
            var f = files[Math.floor(Math.random() * files.length)];
            var {
                Canvas
            } = require('canvas-constructor');
            var x = 0;
            var y = 0;
            if (message.guild.roles.filter(role => !isNaN(role.name)).size <= 0) return;
            message.guild.roles.filter(role => !isNaN(role.name)).sort((b1, b2) => b1.name - b2.name).forEach(() => {
                x += 100;
                if (x > 100 * 12) {
                    x = 100;
                    y += 80;
                }
            });
            var image = await fsn.readFile(`./colors/${f}`);
            var xd = new Canvas(100 * 11, y + 350) // كانت 250 يلي هو الحين 350
                .addBeveledImage(image, 0, 0, 100 * 11, y + 350, 100) // يلي هي الحين 350 كانت 250 و يلي هي الحين 100 كانت 50
                .setTextBaseline('middle')
                .setColor('white')
                .setTextSize(60)
                .addText(`قائمة الألوان`, 375, 40);
            x = 0;
            y = 150;
            message.guild.roles.filter(role => !isNaN(role.name)).sort((b1, b2) => b1.name - b2.name).forEach(role => {
                x += 75;
                if (x > 100 * 10) {
                    x = 75;
                    y += 80;
                }
                xd
                    .setTextBaseline('middle')
                    .setTextAlign('center')
                    .setColor(role.hexColor)
                    .addBeveledRect(x, y, 60, 60, 15)
                    .setColor('white');
                if (`${role.name}`.length > 2) {
                    xd.setTextSize(30);
                } else if (`${role.name}`.length > 1) {
                    xd.setTextSize(40);
                } else {
                    xd.setTextSize(50);
                }
                xd.addText(role.name, x + 30, y + 30);
            });
            message.channel.sendFile(xd.toBuffer());
        });
    }
})
