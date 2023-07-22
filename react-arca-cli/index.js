#!/usr/bin/env node

import validateProjectName from "validate-npm-package-name";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

// Adjust for ecma
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the project name and check validity
const projectName = process.argv[2];
checkAppName(projectName);

// Get the directory where the command was run
const currentPath = process.cwd();

// The path where the new project should be created
const projectPath = path.join(currentPath, projectName);

// Get the template
const templatePath = path.join(__dirname, "../react-arca-template");

try {
	// Copy the template files to the new project directory
	fs.copySync(templatePath, projectPath);
	// Make the gitignore .gitignore
	const gitignorePath = path.join(projectPath, "gitignore");
	const dotGitignorePath = path.join(projectPath, ".gitignore");
	if (fs.existsSync(gitignorePath)) {
		fs.renameSync(gitignorePath, dotGitignorePath);
	}
	// Initialize a new git repository
	execSync("git init", { cwd: projectPath });
	execSync("git add .", { cwd: projectPath });
	execSync('git commit -m "Initial react-arca commit"', { cwd: projectPath });
	console.log(chalk.greenBright("\n git initialized, added, and committed."));

	// Rename files with package name
	injectProjectName(projectName);
	// Let the user know were installing
	console.log(chalk.greenBright("\n We're installing the necessary dependencies, this should only take a moment... \n"));
	// Install dependencies in the new project directory
	execSync("npm install", { cwd: projectPath, stdio: "inherit" });
} catch (error) {
	// If installation failed for whatever reason throw this error
	console.error(chalk.red("An error occurred while creating the project."));
	fs.removeSync(projectPath);
	process.exit(1);
}

// Package was successfully installed
console.log(
	chalk.greenBright("\n\nProject is ready!\n\n") +
		chalk.whiteBright(
			`You can start your app by running the following commands: ${chalk.cyanBright(
				`\n\n cd ${projectName}`
			)} \n ${chalk.cyanBright("npm start\n\n")}`
		)
);

/*
 *********************************************************************************************/

function injectProjectName(projectName) {
	// The path to the new projects files to change
	const packageJsonPath = path.join(projectPath, "package.json");
	const htmlFilePath = path.join(projectPath, "public", "index.html");
	const licenseFilePath = path.join(projectPath, "LICENSE.md");

	// Read the files out
	const packageJson = fs.readJsonSync(packageJsonPath);
	let html = fs.readFileSync(htmlFilePath, "utf8");

	// Modify the files
	packageJson.name = projectName;
	html = html.replace("<title>react-arca</title>", `<title>${projectName}</title>`);
	const newLicenseContents = `# License

    You can add your own license for your new project here.
    `;

	// Write the changes back to the files
	fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, "\t"));
	fs.writeFileSync(htmlFilePath, html);
	fs.writeFileSync(licenseFilePath, newLicenseContents);
}

/*the following functions are courtesy of create-react-app @
 *https://github.com/facebook/create-react-app/blob/main/packages/create-react-app/createReactApp.js
 *and is licensed under the MIT license.*/

// Check project name validity
function checkAppName(appName) {
	if (!appName) {
		console.log(chalk.red("Please provide a project name."));
		process.exit(1);
	}
	const validationResult = validateProjectName(appName);
	if (!validationResult.validForNewPackages) {
		console.error(
			chalk.red(`Cannot create a project named ${chalk.green(`"${appName}"`)} because of npm naming restrictions:\n`)
		);
		[...(validationResult.errors || []), ...(validationResult.warnings || [])].forEach((error) => {
			console.error(chalk.red(`  * ${error}`));
		});
		console.error(chalk.red("\nPlease choose a different project name."));
		process.exit(1);
	}

	const dependencies = ["react", "react-dom", "react-router-dom"].sort();
	if (dependencies.includes(appName)) {
		console.error(
			chalk.red(
				`Cannot create a project named ${chalk.green(`"${appName}"`)} because a dependency with the same name exists.\n` +
					`Due to the way npm works, the following names are not allowed:\n\n`
			) +
				chalk.cyan(dependencies.map((depName) => `  ${depName}`).join("\n")) +
				chalk.red("\n\nPlease choose a different project name.")
		);
		process.exit(1);
	}
}
