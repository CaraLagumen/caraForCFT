# CaraForCFT

Created with [Node.js]

A RESTful API in ~4 hours

## Development

### Setup

Run `npm i` then `npm start` on **master folder**.

	1. Create a user `GET localhost:3000/api/users` or import data shown below.
	2. Authenticate with user `POST localhost:3000/api/users/login`.
	3. An event is created with each successful or failed login.
	4. Check events with `GET localhost:3000/api/events`.

**Server:**

`localhost:3000/api/users`

`localhost:3000/api/events`

### Optional
Import data from test jsons in **server folder**.

Users `POST localhost:3000/api/users/import`

Events `POST localhost:3000/api/events/import`

### API

**Authenticate:**

Login `POST localhost:3000/api/users/login`

Logout `GET localhost:3000/api/users/logout`

**Users:**

Get users `GET localhost:3000/api/users`

Create user `POST localhost:3000/api/users`

**Events:**

Get all events `GET localhost:3000/api/events`

Get failed events `GET localhost:3000/api/events/failed`

Get single user events `GET localhost:3000/api/events/:userId` ex: `localhost:3000/api/events/5f0566266f6b8742f4822a10`

Get day before last events `GET localhost:3000/api/events/day-before`

Get successful week before events `GET localhost:3000/api/events/week-before`
