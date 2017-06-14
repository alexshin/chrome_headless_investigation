const express = require('express');
const CDP = require('chrome-remote-interface');
const app = express();

const Github = require('./plugins/github');

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    let imageSrc = '';
    let documentSrc = '';

    let g = new Github(process.env.GITHUB_USERNAME, process.env.GITHUB_PASSWORD);

    CDP({host: 'browser_worker'}, async (client) => {
        const {Page, DOM, Runtime} = client;
        try {
            await Page.enable();
            await Page.navigate({url: g.url});
            await Page.loadEventFired();

            await DOM.enable();
            
            imageSrc = await Page.captureScreenshot('png', 100, false);
            documentSrc = await DOM.getDocument(2);

            console.log(await Runtime.evaluate({expression: g.setUsernameInput()}));
            console.log(await Runtime.evaluate({expression: g.setPasswordInput()}));
            console.log(g.releaseForm());
            console.log(await Runtime.evaluate({expression: g.releaseForm()}));

            await Page.enable();
            await Page.loadEventFired();

            imageSrc = await Page.captureScreenshot('png', 100, false);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            await client.close();

            res.render('index.pug', {
                imageSrc: `data:image/png;base64, ${imageSrc.data}`,
                documentSrc: JSON.stringify(documentSrc)
                //documentSrc: userField
            });
        }
    })
    .on('error', (err) => console.error(err));
});

app.listen(3000, () => console.log('Server is listening on 3000'));