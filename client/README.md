Documentation HCM Schedule

•	Before running  .Net application, first change connection string inside appsettings.development.json. 
•	Update server name with your’s name
•	Add Initial migration and update database.
•	Run .net application with dotnet run command
•	Run Angular project called client.
•	Roles are created automatically when updating initial migration.
•	Note that initially every user’s roleId is initially 2(Worker)
•	 To change user’s roleId from worker to admin and be able to go through authguards and access Admin page, 
you’ll have to use https://localhost:44330/api/Admin/change-user-role  endpoint in swagger or 
change it manually from db management studio.
•	JWT tokens and authguards are in place so without authorization you wont be able to acces worker or admin pages.




# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
