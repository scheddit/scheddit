scheddit
========

Scheduler for Reddit posts

Scheddit - Schedule your reddit posts ahead of time

Audience: Reddit Moderators, Marketers, Karma whores, and everyone!

To install from a clone:
`bower install`
`npm install`
`grunt init`
`npm install -g mocha`
`mongod`
`mongo` then `>use skeddit`

You will need to edit server/config/config.js to contain the correct information about the Mongo db

run `grunt server` and you should be up and running on localhost:1337 !

Basic Build (3 views)

1. Landing page/informational site
2. Sign up/Sign in page
3. Add a scheduled post (form)


Beta Build Tiers

Tier One:
1. Landing page/informational site
2. Sign in/register functionality (start with a dummy login and transform to a full OAuth system)
3. User scheduler page (form)
4. Scheduled tasks listing page (list)
5. Notice of validation to use the app (add this to the informational site/the form/ and the registration page)

Security:
1. form validation
2. limit the queue to 5 schedule posts

Style:
1. create the first interation of the logo
2. secure the domain
3. build a simple color scheme
4. pick a base for css etc


Tier Two:
1. Show errors on app (add notification on form if there is an issue)
2. History Page (shows past posts and some links and stats)
3. Add logout and rememberme function to the login
4. Add recommended posting times + set your own time
5. Add/modify/delete schedule 
6. Add CAPTCHA check/validator (reddit account validator)

Security:

Tier Three: 

1. Payments (Stripe)
2. Add reddit insight analytics
3. Add Twitter 

Tier Four:

1. Facebook 
2. D3 charts
3. Multiple Linked Accounts
4. SPAM CITY: Post to multiple subreddits (finesse)
5. Notification tab
