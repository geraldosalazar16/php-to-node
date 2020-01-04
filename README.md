# php-to-node
To run this project, follow this steps

1- Clone the repository
```
git clone https://github.com/geraldosalazar16/php-to-node.git
```
2- Get into the folder
```
cd php-to-node
```
3- Check if you have node and npm installed
```
npm -v
node -v
```
If you don't [install](https://nodejs.org/es/) Node JS stable version (At the moment of writing, 12.14.0). It comes with npm.

3- Install dependencies (assuming you have nm installed)
```
npm install
```

4- Run the project
You can run the project by running
```
npm start
```
This command, under the hood, will execute ```node ./bin/www```. You can check the list of commands in package.json/scripts
You can also use [nodemon](https://www.npmjs.com/package/nodemon) to live reload the server. In my case I have it installed globally.
With nodemon installed, run ```npm run dev```, and it will start the server but any change that you do to the source codes will reload it.

# Environment
In the root of the project, you can find a .env.example file. Fill it according to your environments. Must of the variables 
are self explainatories.
Here is an example
```
  
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=sypersecretpassword
MYSQL_DATABASE=TrackMyMaiser
ADMIN_EMAIL=trackmymaiser2020@gmail.com // This is the target email that will receive the contacts
```


I created a gmail account for the project
email: trackmymaiser2020@gmail.com
password: track*2020

I also create a [Mailtrap](https://mailtrap.io/) account, for a smtp service
email: trackmymaiser2020@gmail.com
password: track*2020

Go into Mailtrap with above credentials, send an email from the system, and you will see in Mailtrap inbox the email result.
The email will never get to the destiny email account but to Mailtrap instead. Tht way your inbox don't get full of span.
