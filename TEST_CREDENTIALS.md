# 🔑 Test Login Credentials

## Test Accounts Created

### 👨‍🌾 Farmer Account
- **Email:** `farmer@example.com`
- **Password:** `password123`
- **Role:** Farmer
- **District:** Bangalore Urban
- **Soil Type:** Black Soil

### 👨‍💼 Admin Account
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** Admin
- **District:** Mysore
- **Soil Type:** Red Soil

## 🚀 How to Test

1. Open the app at `http://localhost:3001`
2. You'll see the Home page (public page)
3. Click "Start Recommendation" button
4. You'll be redirected to Login page
5. Use one of the credentials above:
   - **For Farmer features:** Use farmer@example.com
   - **For Admin features:** Use admin@example.com (Admin dashboard will be visible)

## 📋 What You Can Test

### As Farmer:
- ✅ Home page (public)
- ✅ About page (public)
- ✅ Recommendation page (after login)
- ✅ Profile page
- ✅ Access to crop/seed/store recommendations

### As Admin:
- ✅ All farmer features
- ✅ Admin dashboard (special Admin tab in header)
- ✅ User management
- ✅ Crop management
- ✅ Store management

## 🔄 Regenerate Test Users

If you want to create fresh test users, run:
```bash
cd backend
node scripts/seedTestUsers.js
```

This will delete all existing users and create fresh test accounts.

## 🛠️ Troubleshooting

If login fails with 400 error:
1. Check backend server is running on port 5000
2. Check MongoDB is connected
3. Verify test users exist in database
4. Check browser console for detailed error messages
