# [Fidelma](https://github.com/The-Greatest-Team/comp30022)

App Link: https://fidelma-reactjs.herokuapp.com/

<img src="react-frontend/public/res/images/WechatIMG907.png" alt="drawing" width="200"/>


## **Introduction**

This application is a restaurant management system built for the restaurant Fidela. It includes a variety of functionalities for both customers and staff end.
For example, customers can place orders. Staff can manage dishes and ingredients.
For more, visit (https://zizhzhang.atlassian.net/wiki/spaces/THE/pages/2785472/Requirements) for all user stories.

The backend server uses Spring Boot framework and provides restful API service that the React frontend uses. The database used is MongoDB. The project is deployed to two Heroku apps


## **Check List**
- [x] Requirement
- [x] How to start the app
- [x] Environment Variables
- [x] Documentation
- [x] Future Improvement

## **Requirements**

1. Download **node.js** and npm from https://nodejs.org/en/download.
2. Download **IntelliJ IDEA** from https://www.jetbrains.com/idea/download.
3. Update **JDK** to version 17 or later.
4. Has a valid **Gmail** and **MongoDB account**.
5. Download Database Visualisation Tool **Mongodb Compass** from https://www.mongodb.com/try/download/compass


## **Installation Instruction**

### Install Node.js (Choose one of the option below)
1. Homebrew (Require MacOS, as well as homebrew installed)
   ```brew install node```
2. General package installation (Choose the right version for your OS)
   ![](react-frontend/public/res/images/nodejs.png)



### Install Intellij IDEA
1. Head to https://www.jetbrains.com/idea/download
   ![](react-frontend/public/res/images/intellij Idea.png)



### Install JDK on your OS
1. Homebrew (Require MacOS and Homebrew installed)

   ```brew install java```

   after which you can test by prompting:

   ```java --version```

   if installation is successful it would show

   ![](react-frontend/public/res/images/javaversion.png)
2. Official Download (Orecle JDK: https://www.oracle.com/au/java/technologies/downloads/)
   ![](react-frontend/public/res/images/jdk.png)

   And then follow along with the installation process when prompted

### Download Mongodb Compass for Database Visualisation
- Head to https://www.mongodb.com/try/download/compass and choose for the compatible OS
  ![](react-frontend/public/res/images/MongodbCompass.png)

### Start up Mongodb
- See link: https://www.mongodb.com/basics/create-database
- Sign up: https://www.mongodb.com/cloud/atlas/register

### Download Maven
1. Homebrew (Require MacOS and Homebrew installed)

   ```brew install mvn```
   ![](react-frontend/public/res/images/Maven.png)

   Then check if you successfully installed it

   ```mvn --version```

   ![](react-frontend/public/res/images/mvn.png)
2. General installation process
- most modern IDEs will have the build-in installation option for Maven, Intellij IDEA, Eclipse, NetBeans
- if there is no option for that, you can visit the Apache Maven download website https://maven.apache.org/download.cgi


## **Start the Localhost Application**

The Localhost server and application is located at **DevelopmentFinalise** branch, the **Main** Branch is used for remote deployment and remote hosting version only.

#### In order to start the localhost application using command line:
1. Start the BackEnd server running:
    - Open up Command line tool such as _Terminal_ or _Iterm_
    - navigate to the backend project folder:
      **comp30022/BackEnd**
    - make sure you have Apache Maven installed and run command:

      ```mvn spring-boot:run```
    - First time initialisation will do package import and installation of some package dependencies
    - If the build is successful you will see:
      ![](react-frontend/public/res/images/springboot_run.png)

2. Start the front end application:
    - Open up Command line tool such as _Terminal_ or _Iterm_
    - navigate to the frontend project folder, make sure the ```package.json``` is within the folder:
      **comp30022/react-fronted**
    - make sure you have node installed and run the command:

      ```npm install```

    - The first time install will install all necessary packages and libraries, it can take some time, after successfully installed it will show:
      ![](react-frontend/public/res/images/npm install.png)

    - Then we will run ```npm start``` to start the application

3. Open up the browser of your choice and type in: **http://localhost:3000/**
    - As the application is only made compatible with mobile devices, if you are trying to use a desktop browser, you will need to enter the responsive design mode and right the mobile device view
    - After entering the page, make sure you right click on the web page and select inspect from the drop down menu
    - Then enter the responsive mode which allows you to choose from different mobile device view:
      ![Make Sure you click into the responsive mode](react-frontend/public/res/images/Responsive.png)


#### In order to start the localhost application using intellij IDEA:
1. Starting the Backend Server
    1. Open up the intellij Idea and open the folder **comp30022**
    2. Open the project and navigate to the BackEnd/pom.xml, right click on the pom.xml and select "add as Maven Project". Then right click again the pom.xml and select Maven --> Reload Project
    3. This will let the Maven package management to import necessary libraries and dependencies that is required for the project
       ![](react-frontend/public/res/images/MavenImport.png)
    4. Locate the BackEndApplication file at BackEnd/src/main/java/com/thegreatestteam/backend/BackEndApplication.java, and then click the green triangle icon and click "run BackEndApplication"
       ![](react-frontend/public/res/images/Runapp.png)


2. Starting the frontend Server:
    1. Open the build-in terminal inside the intellij idea: go to View -> Tool Windows -> Terminal
    2. Make sure you navigate to the react-frontend folder:
       ![](react-frontend/public/res/images/TerminalFrontend.png)
    3. After you are in the right folder, start with these:

       ```npm install```

       ```npm start```
       this can start the application on localhost:3000
    4. Open up the browser of your choice and type in: **http://localhost:3000/**
    - As the application is only made compatible with mobile devices, if you are trying to use a desktop browser, you will need to enter the responsive design mode and right the mobile device view
    - After entering the page, make sure you right click on the web page and select inspect from the drop down menu
    - Then enter the responsive mode which allows you to choose from different mobile device view:
      ![Make Sure you click into the responsive mode](react-frontend/public/res/images/Responsive.png)




## **Start the Deployed Application**

Current application is deployed on the heroku cloud, you can access the application by using the URL: https://fidelma-reactjs.herokuapp.com/ or use your mobile device to scan the QR code we provided on the top of this page
Due to the fact that this is based on the heroku free tier which comes with limited resource, the responsiveness of the website is not superior, if you want this application to be deployed on other platforms or cloud service providers, you can fully explore all options that
fit your business need and requirement. For more information about the self-deployment process, you are refer to the Deployment Guide at the [DeploymentGuide](docs/Deployment_Guide.md)







## Environment Variables:
- Frontend:
  ```
  frontend.host.local=http://localhost:3000
  frontend.host.heroku=https://fidelma-reactjs.herokuapp.com
  frontend.host.heroku2=http://fidelma-reactjs.herokuapp.com
  ```
- Backend:
  ```
  spring.data.mongodb.uri=mongodb+srv://app:<password>@cluster0.9kzpmzz.mongodb.net/<<Database name>>?retryWrites=true&w=majority
  spring.servlet.multipart.max-file-size=2MB
  spring.servlet.multipart.max-request-size=2MB
  spring.servlet.multipart.enabled=true
  
  ```

- Mongo DB Account
   ```
   Username: thegreatestteam
   password: VzI1YYho9OUMlj6R
   ```

## Documents:
- Jira: https://zizhzhang.atlassian.net/jira/software/projects/TEAM/boards/1
- Confluence: https://zizhzhang.atlassian.net/wiki/spaces/THE/pages/65538/This+is+the+Confluence+space+for+Team029+----+THE+GREATEST+TEAM

## Future Improvement:
- staff side can modify the profile

- responsive design, make sure the website works well on mobile, desktop and tablet

- add more animations make the loading smoother

- add register function for staff to create account

- add functionality that staff can make few dish into discount mode

- improve home page

- make the main menu is dynamic on the type

- Add alert system(maybe with voice) on the staff side when new order been send to staff side



