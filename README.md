# hotel-booking-api

REST API for the Hotel Booking Management System. Node.js + Express + MongoDB.

## Setup

```bash
git clone https://github.com/arpitha900/hotel-booking-api.git
cd hotel-booking-api
npm install
```

Create a `.env` file in the project root:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel_booking
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

If you're using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

```bash
npm run seed   # seed sample data (optional but recommended)
npm run dev    # starts on http://localhost:5000
```

## Endpoints

```
GET  /api/users/getUserList
     ?page=1&limit=10&sortBy=name&sortOrder=asc&search=john

GET  /api/hotels/getHotelList
     ?page=1&limit=10&search=&stateId=&cityId=&rating=&isActive=

GET  /api/bookings/getBookings
     ?page=1&limit=10&userId=&hotelId=&status=&fromDate=&toDate=&download=false
     (download=true returns Excel file instead of JSON)

GET  /api/bookings/getBookedUsers

POST /api/bookings/createBooking
     body: { userId, hotelId, checkinDate, guestCount, requirements? }

POST /api/bookings/:bookingId/cancel

GET  /api/state
GET  /api/city?stateId=

GET  /health
```

## Booking status

```
0 = Confirmed
1 = Cancelled
2 = Completed
3 = Pending
```

## Business rules

- New bookings default to Confirmed (0)
- Cannot create a booking for the next day after 9 PM
- Same user + same hotel + same check-in date = rejected (duplicate)
- Only Confirmed and Pending bookings can be cancelled

## Project structure

```
src/
├── config/       db connection
├── models/       Mongoose schemas
├── services/     business logic
├── controllers/  request/response handling
├── routes/       express routers
├── validations/  Joi schemas
├── middleware/   error handler, validation middleware
└── utils/        pagination, AppError, Excel export
scripts/
└── seed.js
```
