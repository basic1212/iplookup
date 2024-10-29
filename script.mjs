import readline from 'readline';
import axios from 'axios';
import chalk from 'chalk';
import { Spinner } from 'cli-spinner';
import portscanner from 'portscanner';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const titleColor = chalk.bold.red;
const optionColor = chalk.white;
const infoColor = chalk.green;
const errorColor = chalk.red;
const exitColor = chalk.red;

let history = [];

function showMenu() {
  console.clear();
  console.log(titleColor(`
            ██╗██████╗ ████████╗ ██████╗  ██████╗ ██╗     
            ██║██╔══██╗╚══██╔══╝██╔═══██╗██╔═══██╗██║     
            ██║██████╔╝   ██║   ██║   ██║██║   ██║██║     
            ██║██╔═══╝    ██║   ██║   ██║██║   ██║██║     
            ██║██║        ██║   ╚██████╔╝╚██████╔╝███████╗
            ╚═╝╚═╝        ╚═╝    ╚═════╝  ╚═════╝ ╚══════╝
                        "Created by basicx2x2r"     
  `));

  console.log(optionColor(`[1] LOOKUP IP INFO`));
  console.log(optionColor(`[2] IP PORT SCAN`));
  console.log(exitColor(`[0] Exit`));
}

async function lookupIP(ip) {
  const spinner = new Spinner(infoColor("Recherche d'informations pour l'IP... %s"));
  spinner.setSpinnerString("|/-\\");
  spinner.start();

  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    spinner.stop(true);
    console.log(infoColor("Informations IP :"));
    console.log(response.data);
    history.push(`Lookup pour IP ${ip}: ${JSON.stringify(response.data)}`);
  } catch (error) {
    spinner.stop(true);
    console.log(errorColor("Erreur lors de la récupération des informations IP."));
  }
  await waitForUserInput();
}

async function portScan(ip) {
  console.log(infoColor(`Scan des ports pour ${ip}...`));
  const ports = [22, 80, 443, 8080]; 

  for (const port of ports) {
    const status = await portscanner.checkPortStatus(port, ip);
    console.log(`Port ${port}: ${status === 'open' ? infoColor('OUVERT') : errorColor('FERMER')}`);
  }
  history.push(`Scan de ports pour ${ip}`);
  await waitForUserInput();
}

function waitForUserInput() {
  return new Promise((resolve) => {
    rl.question(infoColor("\nAppuyez sur Entrée pour revenir au menu..."), () => {
      resolve();
    });
  });
}

function main() {
  showMenu();
  rl.question(optionColor("Choisissez une option : "), (choice) => {
    switch (choice) {
      case "1":
        rl.question(optionColor("Entrez l'adresse IP à rechercher : "), (ip) => {
          lookupIP(ip).then(() => {
            main(); 
          });
        });
        break;
      case "2":
        rl.question(optionColor("Entrez l'adresse IP à scanner : "), (ip) => {
          portScan(ip).then(() => {
            main(); 
          });
        });
        break;
      case "0":
        console.log(exitColor("Au revoir!"));
        rl.close();
        break;
      default:
        console.log(errorColor("Choix invalide. Veuillez réessayer."));
        setTimeout(main, 1500);
    }
  });
}

main();
