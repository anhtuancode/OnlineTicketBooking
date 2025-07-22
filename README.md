# 🎟️ Online Ticket Booking

> A backend project for managing event tickets, bookings, and Stripe-based payment.

---

## 📦 Features

* ✅ **User Authentication** (JWT)
* ✅ **CRUD Users** (Admin only)
* ✅ **CRUD Events**
* ✅ **Booking Management** (Create, Read, Update)
* ✅ **Stripe Integration** for online payment
* ✅ **Role-based Access Control** (Admin / User)
* ✅ **API Documentation** with Swagger

---

## 🏧 Project Structure

```
OnlineTicketBooking/
│
├── src/
│   ├── auth/           # JWT Auth (login, register)
│   ├── user/           # User CRUD (admin only)
│   ├── event/          # Event CRUD
│   ├── booking/        # Booking logic & status
│   ├── payment/        # Stripe payment intent
│   └── common/         # Guards, interceptors, DTOs
│
├── prisma/             # Prisma schema & migration
├── .env                # Environment config
└── main.ts             # App entry point
```

---

## ⚙️ Tech Stack

| Tech       | Description         |
| ---------- | ------------------- |
| NestJS     | Backend Framework   |
| Prisma ORM | Database Access     |
| MySQL      | Relational Database |
| Docker     | DB Containerization |
| Stripe API | Payment Integration |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/anhtuancode/online-ticket-booking.git
cd online-ticket-booking
npm install
```

---

### 2. Setup environment variables

Create a `.env` file in the root directory:
---

### 3. Run MySQL with Docker (optional)

```bash
docker run --name ticket-mysql \
  -p 3307:3306 \
  -e MYSQL_ROOT_PASSWORD=1234 \
  -e MYSQL_DATABASE=OnlineTicketBooking \
  -d mysql:8
```

---

### 4. Run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

### 5. Start the server

```bash
npm run start:dev
```

---

## 🧲 API Documentation

Access Swagger at:

```
http://localhost:3069/swagger
```

You can:

* 🔑 Register & Login
* 👤 Create/update/delete users (admin)
* 🎫 Create/update/delete events
* 📄 Create bookings
* 💳 Pay with Stripe

---

## 🔀 Booking + Payment Flow

1. User selects an event and clicks "Book Now"
2. Backend creates a `Booking` + Stripe `PaymentIntent`
3. Frontend loads Stripe Elements to collect card info
4. Stripe confirms payment → booking status updates

---

## 🔐 Role-based Access

| Role  | Permissions                         |
| ----- | ----------------------------------- |
| Admin | Full CRUD (Users, Events, Bookings) |
| User  | View events, create & pay bookings  |

---

## 🧹 Future Improvements

* 🎨 React-based Frontend for booking interface
* 📧 Email confirmation for bookings
* 👖 Seat map for event seating
* 📊 Admin dashboard (booking stats)
* ⏰ Auto-cancel unpaid bookings via CronJob

---

## 📢 Contact

* GitHub: [anhtuancode](https://github.com/anhtuancode)
* Email: [nguyenanhtuan.forwork@gmail.com](mailto:nguyenanhtuan.forwork@gmail.com)

---

✅ A complete backend for online ticket booking with Stripe integration and real-world features. Ideal for expanding into a full production-ready app.
