# ScamGuard+ Android App

## 🛡️ Real-Time Notification Scam Detection for Android

ScamGuard+ is a powerful Android application that **automatically monitors ALL notifications** from WhatsApp, SMS, and other messaging apps to detect scams in real-time.

### ✨ Key Features

✅ **Real-Time Notification Monitoring** - Automatically scans every notification as it arrives
✅ **APK File Detection** - Instantly alerts when any notification contains `.apk` files
✅ **Scam Keyword Detection** - Identifies common scam patterns and phrases
✅ **Suspicious Link Detection** - Flags shortened URLs and suspicious links
✅ **Multi-App Support** - Works with WhatsApp, SMS, Telegram, Messenger, and more
✅ **24/7 Background Protection** - Runs continuously in the background
✅ **Instant Alerts** - Shows critical alerts for high-risk scams
✅ **Auto-Start on Boot** - Protection starts automatically when phone boots

---

## 🚀 How It Works

### 1. **Notification Listener Service**
The app uses Android's `NotificationListenerService` to intercept and analyze all incoming notifications from messaging apps.

### 2. **Scam Detection Algorithm**
Each notification is analyzed for:
- **APK files** (highest priority - 50 points)
- **Scam keywords** (prize, winner, urgent, verify, etc. - 10 points each)
- **Suspicious links** (bit.ly, tinyurl, etc. - 15 points)
- **Phone numbers** (5 points)
- **Urgency tactics** (10 points)

### 3. **Risk Scoring**
- **Score < 30**: Safe, no alert
- **Score 30-49**: HIGH RISK - Alert shown
- **Score ≥ 50**: CRITICAL RISK - Persistent alert with alarm

### 4. **Instant Alerts**
When a scam is detected, you get:
- 🚨 Critical notification with alarm sound
- ⚠️ Risk level and scam score
- 📋 Detailed reasons for detection
- ⛔ Safety warnings (don't click links, don't download files)

---

## 📱 Installation & Setup

### **Prerequisites**
- Android phone (Android 7.0 or higher)
- Android Studio installed on your computer

### **Step 1: Open Project in Android Studio**
1. Open Android Studio
2. Click **File → Open**
3. Navigate to `ScamGuard+/ScamGuardAndroid`
4. Click **OK**

### **Step 2: Build the App**
1. Wait for Gradle sync to complete
2. Click **Build → Build Bundle(s) / APK(s) → Build APK(s)**
3. Wait for build to complete

### **Step 3: Install on Your Phone**

**Option A: USB Installation**
1. Enable **Developer Options** on your phone:
   - Go to **Settings → About Phone**
   - Tap **Build Number** 7 times
2. Enable **USB Debugging**:
   - Go to **Settings → Developer Options**
   - Enable **USB Debugging**
3. Connect phone to computer via USB
4. In Android Studio, click the **Run** button (green play icon)
5. Select your device and click **OK**

**Option B: APK Installation**
1. After building, find the APK at:
   `ScamGuardAndroid/app/build/outputs/apk/debug/app-debug.apk`
2. Transfer this file to your phone
3. Open the APK on your phone to install
4. Allow installation from unknown sources if prompted

### **Step 4: Grant Notification Access**
1. Open the ScamGuard+ app
2. Tap **"Enable Protection"**
3. You'll be taken to **Notification Access** settings
4. Find **ScamGuard+** in the list
5. Toggle it **ON**
6. Confirm the permission

### **Step 5: Done! 🎉**
The app is now monitoring all your notifications!

---

## 🧪 Testing the App

### **Test 1: Simulate a Scam Notification**
1. Send yourself a WhatsApp message containing:
   ```
   Congratulations! You've won a prize! Click here: http://bit.ly/claim-prize
   Download our app: winner.apk
   ```
2. You should immediately receive a **CRITICAL RISK** alert from ScamGuard+

### **Test 2: APK File Detection**
1. Send yourself any message containing `.apk`
2. ScamGuard+ will detect it and show an alert

### **Test 3: Normal Message**
1. Send yourself a normal message: "Hey, how are you?"
2. No alert should appear (scam score too low)

---

## 📊 What Gets Detected

### **High-Risk Scam Indicators**
- ⚠️ APK file attachments
- ⚠️ Prize/lottery/winner messages
- ⚠️ Urgent action requests
- ⚠️ Requests for bank details, OTP, passwords
- ⚠️ Suspicious shortened links
- ⚠️ Fake payment/refund offers
- ⚠️ Account suspension threats

### **Monitored Apps**
- WhatsApp
- SMS/Messages
- Telegram
- Facebook Messenger
- Instagram
- Snapchat
- Any messaging app

---

## 🔒 Privacy & Security

✅ **All processing happens locally** on your device
✅ **No data is sent to external servers**
✅ **No internet connection required** for scam detection
✅ **Open source** - you can review all the code
✅ **Minimal permissions** - only notification access needed

---

## 🛠️ Technical Details

### **Architecture**
```
NotificationListenerService (monitors notifications)
    ↓
ScamDetectionEngine (analyzes content)
    ↓
AlertManager (shows warnings)
```

### **Key Components**
1. **NotificationListenerService.java** - Core monitoring service
2. **MainActivity.java** - User interface and permissions
3. **ScamMonitorService.java** - Background service
4. **BootReceiver.java** - Auto-start on boot

### **Scam Detection Keywords**
The app detects 30+ scam patterns including:
- congratulations, winner, prize, claim
- urgent, verify, account suspended
- lottery, cash prize, reward, gift card
- bank details, cvv, pin, password, otp
- download apk, install app, update app

---

## 🐛 Troubleshooting

### **App not detecting notifications?**
1. Check if notification access is enabled:
   - Settings → Apps → Special Access → Notification Access
   - Ensure ScamGuard+ is enabled
2. Restart the app
3. Restart your phone

### **Alerts not showing?**
1. Check notification permissions:
   - Settings → Apps → ScamGuard+ → Notifications
   - Ensure all notifications are enabled
2. Check Do Not Disturb mode is off

### **App stops working after phone restart?**
- The app should auto-start, but if not:
- Open the app once after restart
- Check battery optimization settings (disable for ScamGuard+)

---

## 📝 Future Enhancements

- [ ] Machine learning-based detection
- [ ] Cloud-based threat intelligence
- [ ] Multilingual support
- [ ] Scam reporting feature
- [ ] Detailed scam history log
- [ ] Customizable detection rules

---

## 📄 License

This project is open source and available for educational purposes.

---

## 🤝 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the code in `NotificationListenerService.java`
3. Check Android logs: `adb logcat | grep ScamGuard`

---

## ⚡ Quick Start Summary

1. Open project in Android Studio
2. Build APK
3. Install on phone
4. Grant notification access
5. Done! You're protected 🛡️

**Stay safe from scams!** 🚀
