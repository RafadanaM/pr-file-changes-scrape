#!/usr/bin/env node

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

try {
    const options = yargs(hideBin(process.argv))
    .usage("Usage: -u <url>")
    .option("u", {alias: "u", describe: "Gihub pull request URL", type: "string", demandOption: true})
    .argv;
    const response = await fetch(`${options.$0}/files`);
    const body = await response.text();
    const $ = cheerio.load(body);
    const fileNamesChanged = $('li.ActionList-item.js-tree-node > span').toArray().map((el) =>`- ${$(el).text()}` );
    const joinedFileNames = fileNamesChanged.join("\n");
    console.log(`\n${joinedFileNames}\n`);
} catch (error) {
    console.log(error)
} 