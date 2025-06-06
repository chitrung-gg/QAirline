<p align="center"> <img src="https://github.com/chitrung-gg/QAirline/blob/main/frontend/public/images/Qairline.png?raw=true"/> </p>

<h3 align="center">QAirline</h3>

  <p align="center">
    QAirline's Website, which aims to provide the exceptional services, with "Joys per flight" slogan
  </p>
</div>


## About The Project
<p align="center"> <img src="https://i.imgur.com/XzaNKnr.png"/ width="1280;"> </p>

<p align="center"> <i>Screenshot of the Website</i> </p>

An online ticket booking platform for QAirline brand, designed to offer a seamless and user-friendly experience for customers when reserving their flight seats. 

It offers various services aimed at enhancing customer convenience, such as easy access to flight information, flexible seat selection, filling required personal information online, tracking reserved flights with ticket code, applying promotion code for discounts, .etc. 

## Getting Started

There is an instruction file for installation, written in Vietnamese, assumes that ```node.js``` already installed on the machine. 

If not installed yet, it can be easily downloaded from [NodeJS homepage](https://nodejs.org/en).

Frameworks and technology stack used for this repository:
1. Back-end side: [NestJS](https://nestjs.com/) 
2. Front-end side:  [NextJS](https://nextjs.org/)
3. Database engine:  [PostgreSQL](https://www.postgresql.org/)

### Testing with Playwright

Authors have conducted automated testing with Playwright tool for ```createAirport``` features, with predefined configs for
1. Frontend testing with three most popular browser engines (Chromium, Firefox, Webkit)
2. Backend testing

Test scripts are placed in ```root_project/tests```, which then are divided in ```backend``` and ```frontend``` subfolders.

Warmly welcome to contribute to the projects for more testing !!!

### Installation

These steps are for initializing the related frameworks and setting up environments to run the application: 

0. Install ```node.js``` (if already installed, skip this step)
1. Install ```pnpm``` for package managements
   ```sh
   npm install -g pnpm
   ```
2. Clone the repo
   ```sh
   git clone https://github.com/chitrung-gg/QAirline.git
   ```
3. Change working directory of CLI into ```root_project/backend``` folder and then run 
   ```sh
   pnpm install
   ```
4. Change working directory of CLI into ```root_project/backend/qairline``` folder and then run 
   ```sh
   pnpm install
   ```
5. Waiting for dependencies to be installed, after completed, run this command, backend server will run 
    ```sh
    pnpm run dev
    ```
6. Change working directory of CLI into ```root_project/frontend``` folder and then run 
   ```sh
   npm install
   ```
7. Waiting for dependencies to be installed, after completed, run this command, frontend server will run
    ```sh
    npm run dev
    ```
8. Install PostgreSQL, and then restore databases through file with path specified ```root_project/backend/qairline/qairline_db.tar```

[Optional]

These steps are for installing Playwright tools

0.  Change working directory of CLI into ```root_project``` folder
1.  Run 
   ```sh
   pnpm install
   ```
2. Waiting for dependencies to be installed, and run this command for initiating Playwright
   Pay attention that both ```backend``` and ```frontend``` server have already been started, and current terminal working directory is on ```root_project```
   ```sh
   pnpm exec playwright test --ui
   ```

## Members

This project is contributed by [Chi Trung](https://github.com/chitrung-gg), [Trang Vuong](https://github.com/TrangVuong2810) and [Minh Bui](https://github.com/idontwannapickaname)

_For more information, please refer to their Git homepages_


## Disclaimer
All copyrighted assets belong to their respective owners. This project is made for educational purposes and has no means of monetization.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again! 🌟

## Licenses

This repository follows GNU General Public License
