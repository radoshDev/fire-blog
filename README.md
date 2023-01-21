# Fireblog

This is an administrable blog site with WYSIWYG HTML Editor

## Used technologies
1. [Vue.js](https://vuejs.org/) for build the application
2. [Vue router](https://router.vuejs.org/) for routing pages
3. The UI created using [Quasar](https://quasar.dev/)
4. Used [Pinia](https://pinia.vuejs.org/) for state management 
5. [VeeValidate](https://vee-validate.logaretm.com/v4/) for form validation

## How it works

### There are 3 roles:
1. Unauthenticated user (has access to the home page and list of recent blogs)
2. Authenticated user (has access to view and read posts)
3. Administrator (сan create posts and add other admins)

### Authentication

- email/password authentication managed through Firebase
- option to recover the password

### Administration
* ability to create new posts
* ability to edit and delete posts
* also admin can add new administrator 

*To get the admin role, write to me (radosh.dev@gmai.com)
