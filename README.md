# Fullstack-Boilerplate
A template project for a fullstack app based on React (Typescript), Tailwind CSS, Firebase/GCP, and Vite+Nx bundling and build.

## About
After prototyping a number of standalone features, consulting and doing contracted development, and creating multiple projects of my own, I decided to put a sensible project template in one place to reduce the startup overhead on new projects and fullstack microservices. My intention is that the repository can be easily forked to provide a starting point for new development.

A few notes:
- There are tons of languages/frameworks/deploy-models/pipelines/etc. out there. This is my particular "bike-shedding" around tools I've come to find useful. Namely, VS Code as editor, Firebase for the backend, Typescript React + Tailwind CSS for the frontend, GitHub for code management, npm for dependency management, and Nx+Vite as build tools.
- I don't (at time of writing) know that much about Nx or Vite. The setup in this repository is likely suboptimal from a Dev Ops point-of-view, but it's not worth the time for me (right now) to optimize it. It works on my machine!
- Check the commit history to see when this was last updated. Tools may have changed or been deprecated since then.

## Local Setup for Existing Projects
1. (pre-step:) Check npm version (install if not present) `npm -v`, `npm install -g npm@latest` to upgrade
2. (pre-step:) Check node version `node -v` (install if not present with `npm install n -g`, then `n latest` -- only if not on Windows. On windows, use https://nodejs.dev/en/about/releases/.)
3. (pre-step:) Install firebase `npm install -g firebase-tools`, then `firebase login`
4. Install VS Code (if not already installed)
5. Install helpful extensions (suggested)
  - Auto Rename Tag
  - ESLint
  - Firebase
  - HTML CSS Support
  - Prettier
  - Tailwind CSS Intellisense
  - Live Server (not strictly necessary, but enables easy testing of build directory if not using firebase hosting emulators)
  - Nx Console (haven't used much)
6. Clone using GitHub command-line-interface (which needs to be installed if not installed already)
7. Open as a VS Code workspace.
8. Run `npm i` from the frontend and functions directories
9. Run `git submodule update --remote`

## Template Project Setup (largely taken care of by this repository):
1. `npx create-nx-workspace frontend --preset=react-standalone` (makes Nx/Vite/React project inside frontend folder. Choose no test runner (for now), regular CSS, and no distributed caching.)
2. Add Tailwind CSS Support (from frontend subfolder): `npx nx g @nrwl/react:setup-tailwind` (per https://blog.nrwl.io/setup-react-and-tailwind-the-easy-way-15592eebf4bc; there is an alternate, manual, process documented here: https://tailwindcss.com/docs/guides/vite)
3. Frontend - Add Tailwind UI support: `npm install @headlessui/react @heroicons/react`
4. Frontend - `npm i react-router-dom`
5. Frontend - Create test build from frontend folder by running `npx nx build`
6. `firebase init` (inside cloned repository)
  - Hosting (configure), Emulators, Firestore, Functions (Storage setup seems to require the Firebase project to be specified and initialized)
  - (don't setup a default project, Typescript backend, decline to use ESLint to catch probable bugs - just use IDE) 
  - NOTE: dist library may have a subfolder created by nx. Have to specify the full path to get to index.html . Set firebase hosting target to `frontend/dist/frontend`
  - NOTE: Configure as a single page app -> all requests served from `/` (which is responsible for differentiating based on the path) 
  - Download functions emulator for lower-latency testing.
7. Create VS Code Workspace file. Reopen with VS Code.
8. Run `npm i firebase` from frontend directory.
9. Create firebaseConfig.ts (client side doesn't need to be gitignore'd, since data is available through hosting anyway.)
10. Modify global styles for better text formatting, limiting text width, etc.
11. Add default BrowserRouter and AuthProvider components (auth can use anonymous auth by default)
12. Add 404 page routing.
13. (Add a top-level and a logging error-catching component.)
14. Re-run `npx nx build` from frontend. (Or `npm run build`, which calls this command.)
15. (If desired) add rules to .eslintrc.json to warn (instead of error) for unused vars.
16. Run `git submodule init` in main directory. Then:
```
git submodule add <submodule-repo-url> <path-to-submodule>
git submodule update --init --recursive
git commit -m "Added submodule"
git push
```
for the utilities and knowlege-types repositories. (Not all of these steps may be necessary in this order.)

## Project-Specific Setup
1. Create a new project on Firebase. (If it asks, feel free to include Google Analytics by default, using the default Firebase account and creating a new property.)
2. Upgrade the billing plan (if necessary)
3. Online: Initialize Firestore Database (using default location and security rules)
4. Online: Initialize Realtime Database (using default location and security rules)
5. Online: Initialize Storage (using default security rules and location)
6. (Initialize Functions)
7. Online: Initialize Hosting and add custom domain(s). Use Firebase-based redirect to map www to base domain.
8. Online: Initialize Firebase Authentication (allowing Anonymous login by default).

1. Fork the boilerplate project (if under a different account). Otherwise, can create a private repository and import the boilerplate. Then, add the remote repository as `git remote add upstream https://github.com/Sam-Saarinen/Fullstack-Boilerplate.git`. (Verify with `git remote -v`.) Run `git pull upstream main` if repository wasn't imported directly to create the repository. Use `git status` to verify that changes will push to (tracking) origin/main. (TODO: It seems to support pulling, but it's unclear whethere the permissions for pushing back upstream are supported.)

9. Run `firebase init storage` from project root directory. (Run `firebase use --add` to specify project if not using init statement. Asks for an alias; not sure why.)

10. Update the site title in index.html (can also be programmatically updated on each page).
11. Update the site Favicon in index.html
12. Update global styles for site-specific theming, especially around colors.

## Notes on Folder Structure
VSCode allows creating workspaces (choose "Save Workspace As" to create a [directory name].code-workspace file). Within a workspace, specific rules can be set for subdirectories. Here's an example configuration for this project that resolves VS Code-level settings errors.

```
{
  "folders": [
    {
      "path": "frontend",
      "name": "Frontend"
    },
    {
      "path": "functions",
      "name": "Functions"
    },
		{
			"path": ".",
			"name": "Root"
		}
  ],
  "settings": {
    "eslint.workingDirectories": [
      { "directory": "frontend", "changeProcessCWD": true },
      { "directory": "functions", "changeProcessCWD": true }
    ]
  }
}
```

Within source subdirectories, I've started using git submodules (private GitHub repositories) to share type definitions between the frontend and backend and to share code between projects.

Within frontend/src, a `common` folder is for components that are reused across a broad set of features (e.g. styled buttons would go there), and other components are grouped by features. (Think common is like atoms, and feature folders are like molecules.) The `services` folder is for context providers that are generally global, and closely related feature UI.

## Running Code:
- `npm start`

### Running Frontend and Backend, Deploying
- Run frontend dev server w/ `npm start` from frontend folder
- Run backend emulator w/ `firebase emulators:start --only functions`
- Build with `npx nx build` from frontend and functions directories
- Deploy with `firebase deploy`

### Repository Management / Source Management
(May add more details later. Using git and github cli.)

### Running local JS/TS scripts:
- Local JS (testing scripts) can be run with `node "filename"`
- Local TS can be run (https://stackoverflow.com/questions/33535879/how-to-run-typescript-files-from-command-line):
- - Run the below commands and install the required packages globally:
- - `npm install -g ts-node typescript '@types/node'`
- - (May have to restart VS Code to get the updated path variables in the included shells.)
- - Now run the following command to execute a typescript file:
- - `ts-node typescript-file.ts`

### Testing on Mobile/Remote Notes:
- Basic layout can be tested using browser inspection tools, but for direct native testing `localtunnel` is a free service that gives a public subdomain to the local server.
- `npm install -g localtunnel`
- `lt --port 4200` (or whatever the preview port is) - assigns a subdomain.
- `lt --port 4200 --subdomain fraximon` for custom subdomain.  
Assigned URL is listed on run.

### Remote Development: GitHub Codespaces
See the following links:
- About: https://docs.github.com/en/codespaces/getting-started/understanding-the-codespace-lifecycle
  - Codespaces automatically stop (need to be resumed) after 30 minutes of inactivity.
- Setup: https://docs.github.com/en/codespaces/developing-in-codespaces/creating-a-codespace-for-a-repository
- Reopen: https://docs.github.com/en/codespaces/developing-in-codespaces/opening-an-existing-codespace
  - Browse existing repositories: https://github.com/codespaces
- Configuring: https://docs.github.com/en/codespaces/setting-up-your-project-for-codespaces/setting-up-your-repository/facilitating-quick-creation-and-resumption-of-codespaces

Don't need to `firebase login` on codespace. Prefer to deploy from local unless needed otherwise.

## Further Reading:
- Typescript in React: https://react.dev/learn/typescript
- Nx Tutorial: https://nx.dev/getting-started/tutorials/react-standalone-tutorial
- Can write functions in Python and deploy with gcloud cli
- Tailwind CSS and UI Docs:
  - https://tailwindcss.com/docs/installation
  - https://tailwindui.com/documentation
  - Notes on why TailwindCSS isn't usually used with SASS: https://tailwindcss.com/docs/using-with-preprocessors
- Maybe for some future project: Single-Page Apps using Next.js: https://colinhacks.com/essays/building-a-spa-with-nextjs
- React Router Documentation: https://reactrouter.com/en/main
- Using Git Submodules: https://github.blog/2016-02-01-working-with-submodules/

## Misc. Backlog
Maybe someday these will get added to this repository:
- [ ] Testing libraries and setup
- [ ] Commonly-used submodules (included)
- [ ] Better developer documentation?
- [ ] Nx Cache settings (currently disabled) in nx.json to better optimize build processes?
