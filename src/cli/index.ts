#!/usr/bin/env ts-node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { depositCommand } from "./commands";

yargs(hideBin(process.argv))
  .command(depositCommand)
  .demandCommand(1, "You must specify a command")
  .help("help")
  .parse();
