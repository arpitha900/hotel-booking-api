# Hotel Booking API

RESTful backend for the Hotel Booking Management System built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js v18+
- MongoDB v6+ (local or Atlas)
- npm v9+

## Setup

```bash
cd hotel-booking-api
npm install
cp .env.example .env        # then edit .env with your MongoDB URI
npm run seed                # populate database with sample data
npm run dev                 # start development server (nodemon)
```

## Environment Variables

| Variable       | Description                          | Default                                    |
|----------------|--------------------------------------|--------------------------------------------|
| `PORT`         | Server port                          | `5000`                                     |
| `MONGODB_URI`  | MongoDB connection string            | `mongodb://localhost:27017/hotel_booking`  |
| `NODE_ENV`     | Environment (`development`/`production`) | `development`                          |
| `CLIENT_URL`   | Frontend origin for CORS             | `http://localhost:5173`                    |

## API Endpoints

### Hotels
| Method | Endpoint                    | Description                              |
|--------|-----------------------------|------------------------------------------|
| GET    | `/api/hotels/getHotelList`  | Fetch hotels with pagination & filters   |

**Query params:** `page`, `limit`, `sortBy`, `sortOrder`, `search`, `stateId`, `cityId`, `rating`, `isActive`

---

### Users
| Method | Endpoint                    | Description                              |
|--------|-----------------------------|------------------------------------------|
| GET    | `/api/users/getUserList`    | Fetch users with pagination & filters    |

**Query params:** `page`, `limit`, `sortBy`, `sortOrder`, `search`

---

### Bookings
| Method | Endpoint                          | Description                                     |
|--------|-----------------------------------|-------------------------------------------------|
| GET    | `/api/bookings/getBookings`       | Fetch bookings (add `download=true` for Excel export) |
| GET    | `/api/bookings/getBookedUsers`    | Fetch users who have at least one booking       |
| POST   | `/api/bookings/createBooking`     | Create a new booking                            |
| POST   | `/api/bookings/:bookingId/cancel` | Cancel a booking                                |

**getBookings query params:** `page`, `limit`, `sortBy`, `sortOrder`, `userId`, `hotelId`, `status`, `fromDate`, `toDate`, `download`

**createBooking body:**
```json
{
  "userId": "string (ObjectId)",
  "hotelId": "string (ObjectId)",
  "checkinDate": "ISO date string",
  "guestCount": "number (1-20)",
  "requirements": "string (optional)"
}
```

**Booking status codes:** `0 = Confirmed`, `1 = Cancelled`, `2 = Completed`

---

### Location
| Method | Endpoint      | Description                                 |
|--------|---------------|---------------------------------------------|
| GET    | `/api/state`  | Fetch all states                            |
| GET    | `/api/city`   | Fetch cities (optional `?stateId=` filter)  |

---

### Health Check
| Method | Endpoint    | Description        |
|--------|-------------|--------------------|
| GET    | `/health`   | Server health check|

## Business Rules

- **9 PM Rule**: Bookings for the next calendar day cannot be made after 9 PM
- **Duplicate Prevention**: Same user cannot book the same hotel on the same check-in date
- **Multiple Bookings**: A user can book different hotels on the same date
- **Default Status**: New bookings are always created with status `CONFIRMED (0)`
- **Cancellation**: Only `CONFIRMED` bookings can be cancelled

## Project Structure

```
src/
├── config/         MongoDB connection
├── models/         Mongoose schemas
├── controllers/    HTTP layer (req/res only)
├── services/       Business logic
├── routes/         Express routers
├── middleware/     Error handler, Joi validation
├── validations/    Joi schemas
└── utils/          AppError, pagination, Excel export
```
