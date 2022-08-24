import * as readline from 'readline';
import { stdin as input, stdout as output } from 'node:process';
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const rl = readline.createInterface({ input, output });
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

try {
    const prUrl = await prompt("Enter PR URL (example: https://github.com/org-name/repo-name/pull/1):");
    const response = await fetch(`${prUrl}/files`);
    const body = await response.text();

    const $ = cheerio.load(body);

    const fileNamesChanged = $('li.ActionList-item.js-tree-node > span').toArray().map((el) =>`- ${$(el).text()}` );
    const joinedFileNames = fileNamesChanged.join("\n");
    console.log(`\n${joinedFileNames}\n`);

} catch (error) {
    console.log(error)
} finally {
    rl.close()
}
