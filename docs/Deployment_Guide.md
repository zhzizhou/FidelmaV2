# Deployment Guide 

<p> In this guide i will explain in details how this project was deployed as well as the CI/CD pipelines through GitHub actions, this project can also be deployed into other platforms or web service distributor, i will also discuss the possible approach for doing so </p>



### Project Structure and Gernal Info

* This project's repository has many branches for the purpose of having a more efficient development process
* The branches are divided into four parts:
  - Frontend Development Branches: staffManagement
  - Backend Development Branches: Backend, Backend_feature_CustomerSide, Backend_feature_image, 
  - Development Finalising stage branch: DevelopmentFinalise
  - Testing branch: Testing-branch
  - Deployment branch: 
  - Heroku branches (Should not be accessible by any means as we use continous-deployment):
    - Heroku-fidelma-reactjs/main
    - Heroku-fidelma-springboot/main

* The production line process is as following: 

  *Frontend and Backend will push their finished implementation to the "developmentFinalised" branch, in which all functionality testing and interactions between frontend and backend will be conducted. After that, the complete version will be pushed to the "Testing-branch", in here, white-box testing will be executed, we uses JUnit Test for testing backend, and Jest for frontend testing. After testing stage, we will push our completed and tested version to the "main" branch, where to entire project will be put into production by automated deployment process through github action*

* Deployed Application URL: https://fidelma-reactjs.herokuapp.com/





### Deployment Instructions (Heroku deployment)

* Monorepository 

  1. As we have frontend and backend in the same repository, we need to set our repo to be a Monorepo so that it can deploy the frontend and the backend as a collective to Heroku. The detail of how to create a Monorepo can be found here: https://medium.com/softup-technologies/how-todeploy-a-monorepo-to-multiple-heroku-apps-using-github-actions-65e87dc27878 

  2. Since we are using spring boot (java) as our backend, which is different from Node.js used in https://medium.com/softup-technologies/how-todeploy-a-monorepo-to-multiple-heroku-apps-using-github-actions-65e87dc27878 , more details on how to deploy are described below.

     

* Deployment process

  1. You need to have a Heroku account and install Heroku CLI(Command Line Interface) from this link: *https://devcenter.heroku.com/articles/heroku-cli#download-and-install*

  2. After the installation, run heroku login in the terminal and login using your account. After you log in, you need to run heroku create --buildpack https://github.com/heroku/heroku-buildpack-java.git, this command will help you create a java buildpack in your Heroku account. After it successfully creates the buildpack, it will return you a random app name, you need to run ``` heroku apps:rename <newname> --app <oldname>``` to a meaningful name. Here, for demonstration purposes, I will run ```heroku apps:rename fidelma-springboot --app <oldname>``` , the new name here is fidelma-sprintboot. We will use this name in steps 5, 6, 8.

  3. Also, run heroku create --buildpack https://github.com/mars/create-react-app-buildpack.git to create a buildpack for the frontend and rename the generated random app name to a more meaningful name using ```heroku apps:rename <newname> --app <oldname>``` . Here, for demonstration purposes, I will run ```heroku apps:rename fidelma-reactjs --app <oldname>```, as this app is for our frontend server and the new name here is fidelma-reactjs. We will use this name in steps 5, 6, 8.

  4. Run these commands to help Heroku recognize our repository is a monorepo:

     ```heroku buildpacks:add -a api https://github.com/lstoll/heroku-buildpack-monorepo -i 1```

     ```heroku buildpacks:add -a client https://github.com/lstoll/heroku-buildpack-monorepo -i 1```

     After you finish step 5, you need to specify where your Backend root folder is located in your repository, run this command ```heroku config:set -a fidelma-springboot APP_BASE=src/BackEnd```, also set APP_BASE for the frontend app: ```heroku config:set -a fidelma-reactjs APP_BASE=src/react-fronted```

  5.  your Github repository to Heroku:

     git remote add heroku-fidelma-reactjs https://git.heroku.com/you_app_name.git, in our case, you_app_name is fidelma-reactjs. git remote add heroku-fidelma-springboot https://git.heroku.com/you_app_name.git, in our case, you_app_name is fidelma-springboot. Then run these commands in order to push our main branch to the remote branch:

     ```git push heroku-fidelma-reactjs main```

     ```git push heroku-fidelma-springboot main```

  

  

* Deployment Pipeline (Continous Deployment)
  - For our automated deployment, we use github action pipeline to auto deploy our application after successful push to the "Main" branch
  - You will need to create a file called deploy.yml with the path:   .**github/workflows/deploy.yml**

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12 # This is the action
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "fidelma-springboot" #Must be unique in Heroku
          heroku_email: ${{secrets.HEROKU_API_KEY}}

      - uses: actions/checkout@v2
      - uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "fidelma-reactjs" #Must be unique in Heroku
          heroku_email: ${{secrets.HEROKU_API_KEY}}
```



**The HEROKU_API_KEY** is set in our repo as a secret key so that our repo can connect to Heroku successfully.

The details of how to do this can be found here: https://github.com/AkhileshNS/heroku-deploy

Also, you can view our history of deployment and pipeline in the Actions section of our repository.

![Screen Shot 2022-10-22 at 3.27.55 pm](/Users/brianzhang/Library/Application Support/typora-user-images/Screen Shot 2022-10-22 at 3.27.55 pm.png)