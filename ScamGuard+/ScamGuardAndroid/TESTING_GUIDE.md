# ScamGuard+ Android - Testing Guide

## 🧪 Complete Testing Checklist

### **Prerequisites**
- ✅ App installed on Android phone
- ✅ Notification access enabled
- ✅ WhatsApp installed (for testing)

---

## 📋 Test Cases

### **Test 1: APK File Detection (CRITICAL)**

**Objective:** Verify app detects APK files in notifications

**Steps:**
1. Send yourself a WhatsApp message:
   ```
   Hey, download this app: myapp.apk
   ```
2. Wait for notification to appear

**Expected Result:**
- 🚨 ScamGuard+ shows CRITICAL RISK alert
- Alert says "APK file detected!"
- Scam score ≥ 50

**Status:** ☐ Pass ☐ Fail

---

### **Test 2: Prize/Winner Scam**

**Objective:** Detect common prize scam patterns

**Steps:**
1. Send yourself:
   ```
   Congratulations! You are the lucky winner of $5000 cash prize! 
   Claim now: http://bit.ly/prize123
   ```

**Expected Result:**
- 🚨 HIGH or CRITICAL RISK alert
- Detects keywords: "congratulations", "winner", "prize"
- Detects suspicious link: "bit.ly"
- Scam score ≥ 30

**Status:** ☐ Pass ☐ Fail

---

### **Test 3: Urgent Account Verification**

**Objective:** Detect urgency-based scams

**Steps:**
1. Send yourself:
   ```
   URGENT: Your account has been suspended. 
   Verify immediately: https://verify-account.com
   Enter your password and OTP to restore access.
   ```

**Expected Result:**
- 🚨 Alert shown
- Detects: "urgent", "suspended", "verify", "password", "otp"
- Scam score ≥ 30

**Status:** ☐ Pass ☐ Fail

---

### **Test 4: Banking/Payment Scam**

**Objective:** Detect financial scams

**Steps:**
1. Send yourself:
   ```
   You have received a refund of ₹10,000 in your account.
   Click here to claim: http://tinyurl.com/refund
   Enter your card details and CVV to process.
   ```

**Expected Result:**
- 🚨 Alert shown
- Detects: "refund", "card details", "cvv"
- Detects suspicious link
- Scam score ≥ 30

**Status:** ☐ Pass ☐ Fail

---

### **Test 5: Normal Message (No Alert)**

**Objective:** Verify app doesn't false-positive on normal messages

**Steps:**
1. Send yourself:
   ```
   Hey! How are you doing? Want to meet for coffee tomorrow?
   ```

**Expected Result:**
- ✅ NO alert shown
- Scam score < 30
- App silently monitors but doesn't alert

**Status:** ☐ Pass ☐ Fail

---

### **Test 6: Legitimate Transaction**

**Objective:** Don't alert on real transaction confirmations

**Steps:**
1. Send yourself:
   ```
   Your payment of ₹500 to Amazon was successful.
   Transaction ID: TXN123456789
   Thank you for shopping with us!
   ```

**Expected Result:**
- ✅ NO alert (or very low score)
- App recognizes legitimate transaction pattern

**Status:** ☐ Pass ☐ Fail

---

### **Test 7: Multiple Scam Indicators**

**Objective:** Test high-score scam with multiple red flags

**Steps:**
1. Send yourself:
   ```
   🎉 CONGRATULATIONS! 🎉
   You WON the MEGA LOTTERY - ₹1 CRORE!
   
   URGENT: Claim within 24 hours or prize expires!
   
   Steps to claim:
   1. Download: lottery-claim.apk
   2. Install the app
   3. Enter your bank details, CVV, and OTP
   4. Click: http://bit.ly/claim-lottery
   
   Hurry! Limited time offer!
   Call now: +91-9876543210
   ```

**Expected Result:**
- 🚨 CRITICAL RISK alert
- Very high scam score (80-100+)
- Multiple reasons listed:
  - APK file detected
  - Keywords: congratulations, won, lottery, urgent, claim
  - Suspicious link
  - Phone number
  - Urgency tactics

**Status:** ☐ Pass ☐ Fail

---

### **Test 8: SMS Notification**

**Objective:** Verify app monitors SMS too

**Steps:**
1. Send yourself an SMS:
   ```
   Your account will be closed. Verify now: http://verify.com
   ```

**Expected Result:**
- 🚨 Alert shown
- Source shows "SMS" or "Messages"

**Status:** ☐ Pass ☐ Fail

---

### **Test 9: Background Monitoring**

**Objective:** Ensure app works when closed

**Steps:**
1. Close ScamGuard+ app completely
2. Send yourself a scam message
3. Wait for notification

**Expected Result:**
- 🚨 Alert still appears
- App works in background

**Status:** ☐ Pass ☐ Fail

---

### **Test 10: After Phone Restart**

**Objective:** Verify auto-start on boot

**Steps:**
1. Restart your phone
2. Don't open ScamGuard+ app
3. Send yourself a scam message

**Expected Result:**
- 🚨 Alert appears
- Service auto-started on boot

**Status:** ☐ Pass ☐ Fail

---

## 🔍 Advanced Testing

### **Test 11: Notification Permission Check**

**Steps:**
1. Disable notification access for ScamGuard+
2. Open the app

**Expected Result:**
- App shows "INACTIVE" status
- "Enable Protection" button is enabled

**Status:** ☐ Pass ☐ Fail

---

### **Test 12: Alert Persistence**

**Steps:**
1. Trigger a CRITICAL alert
2. Try to swipe it away

**Expected Result:**
- Alert is persistent (ongoing notification)
- Harder to dismiss than normal notifications

**Status:** ☐ Pass ☐ Fail

---

### **Test 13: Alert Sound & Vibration**

**Steps:**
1. Ensure phone volume is ON
2. Send a high-risk scam message

**Expected Result:**
- ✅ Alarm sound plays
- ✅ Phone vibrates (pattern: 500ms, 200ms, 500ms)

**Status:** ☐ Pass ☐ Fail

---

### **Test 14: Multiple Notifications**

**Steps:**
1. Send 3 scam messages quickly
2. Observe alerts

**Expected Result:**
- ✅ Separate alert for each scam
- All alerts appear in notification tray

**Status:** ☐ Pass ☐ Fail

---

### **Test 15: Different Messaging Apps**

**Steps:**
1. Test with Telegram, Instagram DM, or Messenger
2. Send scam-like message

**Expected Result:**
- ✅ App monitors these apps too
- Alerts appear for scams from any messaging app

**Status:** ☐ Pass ☐ Fail

---

## 📊 Test Results Summary

| Test Case | Status | Notes |
|-----------|--------|-------|
| APK Detection | ☐ | |
| Prize Scam | ☐ | |
| Urgent Verification | ☐ | |
| Banking Scam | ☐ | |
| Normal Message | ☐ | |
| Legitimate Transaction | ☐ | |
| Multiple Indicators | ☐ | |
| SMS Monitoring | ☐ | |
| Background Monitoring | ☐ | |
| Auto-start on Boot | ☐ | |

---

## 🐛 Debugging Failed Tests

### **If alerts don't appear:**

1. **Check notification access:**
   ```
   Settings → Apps → Special Access → Notification Access
   → Ensure ScamGuard+ is ON
   ```

2. **Check app permissions:**
   ```
   Settings → Apps → ScamGuard+ → Permissions
   → Ensure Notifications are allowed
   ```

3. **Check logs:**
   ```bash
   adb logcat | grep ScamGuard
   ```
   Look for:
   - "Notification from: com.whatsapp"
   - "SCAM ALERT TRIGGERED"

4. **Restart the service:**
   - Force stop ScamGuard+ app
   - Disable and re-enable notification access
   - Open app again

### **If false positives occur:**

1. Check the scam score in the alert
2. Review the "Reasons" section
3. Adjust keyword thresholds in code if needed

### **If app crashes:**

1. Check Android version (must be 7.0+)
2. Check logcat for errors
3. Ensure all permissions are granted

---

## ✅ Acceptance Criteria

**App is ready for production if:**

- ✅ All CRITICAL tests pass (1, 2, 7)
- ✅ At least 12/15 tests pass
- ✅ No false negatives on obvious scams
- ✅ Minimal false positives on normal messages
- ✅ Works in background
- ✅ Auto-starts on boot
- ✅ Alerts are visible and audible

---

## 📝 Test Report Template

```
ScamGuard+ Android - Test Report
Date: ___________
Tester: ___________
Device: ___________
Android Version: ___________

Tests Passed: ___/15
Tests Failed: ___/15

Critical Issues:
- 

Minor Issues:
-

Recommendations:
-

Overall Status: ☐ PASS ☐ FAIL
```

---

## 🎯 Real-World Testing

### **Live Scam Testing**

⚠️ **WARNING: Only test with known scam messages. Never click links or download files!**

1. Forward a real scam message to yourself
2. Observe if ScamGuard+ detects it
3. Document the results
4. Report missed scams to improve detection

### **Crowd Testing**

1. Install on multiple devices
2. Different Android versions
3. Different messaging apps
4. Collect feedback

---

**Happy Testing! Stay Safe! 🛡️**
