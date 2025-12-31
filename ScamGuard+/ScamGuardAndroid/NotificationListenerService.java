package com.scamguard.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.os.Build;
import android.os.Bundle;
import android.service.notification.StatusBarNotification;
import android.util.Log;
import androidx.core.app.NotificationCompat;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * ScamGuard+ Notification Listener Service
 * This service monitors ALL notifications from WhatsApp, SMS, and other apps
 * and automatically detects scam messages and APK files
 */
public class NotificationListenerService extends android.service.notification.NotificationListenerService {

    private static final String TAG = "ScamGuard";
    private static final String CHANNEL_ID = "scam_alerts";
    private static final String CHANNEL_NAME = "Scam Alerts";
    
    // Scam detection patterns
    private static final String[] SCAM_KEYWORDS = {
        "congratulations", "winner", "prize", "claim", "urgent", "verify",
        "account suspended", "click here", "limited time", "act now",
        "confirm your", "update your", "verify your account", "suspended",
        "lottery", "cash prize", "reward", "gift card", "free money",
        "bank details", "card details", "cvv", "pin", "password",
        "otp", "one time password", "verification code", "confirm payment",
        "refund", "cashback", "offer expires", "last chance", "hurry",
        "whatsapp pay", "paytm", "phonepe", "gpay", "upi",
        "download apk", "install app", "update app", ".apk"
    };

    private static final String[] LINK_PATTERNS = {
        "http://", "https://", "bit.ly", "tinyurl", "goo.gl",
        "t.co", "ow.ly", "buff.ly", "is.gd", "cli.gs"
    };

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "ScamGuard+ Notification Listener Service Started");
        createNotificationChannel();
    }

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        super.onNotificationPosted(sbn);
        
        String packageName = sbn.getPackageName();
        Notification notification = sbn.getNotification();
        
        // Monitor WhatsApp, SMS, and other messaging apps
        if (isMessagingApp(packageName)) {
            String title = getNotificationTitle(notification);
            String text = getNotificationText(notification);
            
            Log.d(TAG, "Notification from: " + packageName);
            Log.d(TAG, "Title: " + title);
            Log.d(TAG, "Text: " + text);
            
            // Analyze the notification content
            analyzeNotification(packageName, title, text);
        }
    }

    /**
     * Check if the notification is from a messaging app
     */
    private boolean isMessagingApp(String packageName) {
        return packageName.contains("whatsapp") ||
               packageName.contains("sms") ||
               packageName.contains("messaging") ||
               packageName.contains("telegram") ||
               packageName.contains("facebook.orca") || // Messenger
               packageName.contains("instagram") ||
               packageName.contains("snapchat");
    }

    /**
     * Extract title from notification
     */
    private String getNotificationTitle(Notification notification) {
        Bundle extras = notification.extras;
        if (extras != null) {
            CharSequence title = extras.getCharSequence(Notification.EXTRA_TITLE);
            if (title != null) {
                return title.toString();
            }
        }
        return "";
    }

    /**
     * Extract text from notification
     */
    private String getNotificationText(Notification notification) {
        Bundle extras = notification.extras;
        if (extras != null) {
            CharSequence text = extras.getCharSequence(Notification.EXTRA_TEXT);
            if (text != null) {
                return text.toString();
            }
            // Try big text
            CharSequence bigText = extras.getCharSequence(Notification.EXTRA_BIG_TEXT);
            if (bigText != null) {
                return bigText.toString();
            }
        }
        return "";
    }

    /**
     * Analyze notification content for scam indicators
     */
    private void analyzeNotification(String packageName, String title, String text) {
        String fullText = (title + " " + text).toLowerCase();
        
        int scamScore = 0;
        StringBuilder reasons = new StringBuilder();
        
        // Check for APK files - HIGHEST PRIORITY
        if (fullText.contains(".apk")) {
            scamScore += 50;
            reasons.append("⚠️ APK file detected! ");
            Log.w(TAG, "APK FILE DETECTED in notification!");
        }
        
        // Check for scam keywords
        for (String keyword : SCAM_KEYWORDS) {
            if (fullText.contains(keyword.toLowerCase())) {
                scamScore += 10;
                reasons.append("Keyword: ").append(keyword).append("; ");
            }
        }
        
        // Check for suspicious links
        for (String linkPattern : LINK_PATTERNS) {
            if (fullText.contains(linkPattern)) {
                scamScore += 15;
                reasons.append("Suspicious link detected; ");
                break;
            }
        }
        
        // Check for phone numbers (potential scam)
        Pattern phonePattern = Pattern.compile("\\+?\\d{10,}");
        Matcher phoneMatcher = phonePattern.matcher(fullText);
        if (phoneMatcher.find()) {
            scamScore += 5;
            reasons.append("Phone number found; ");
        }
        
        // Check for urgency indicators
        if (fullText.contains("urgent") || fullText.contains("immediately") || 
            fullText.contains("now") || fullText.contains("hurry")) {
            scamScore += 10;
            reasons.append("Urgency tactics; ");
        }
        
        // Determine risk level and alert
        if (scamScore >= 30) {
            String riskLevel = scamScore >= 50 ? "CRITICAL" : "HIGH";
            showScamAlert(packageName, title, text, riskLevel, scamScore, reasons.toString());
            
            // Log to database/file for history
            logScamDetection(packageName, title, text, scamScore);
        }
    }

    /**
     * Show scam alert notification
     */
    private void showScamAlert(String source, String title, String message, 
                               String riskLevel, int score, String reasons) {
        
        NotificationManager notificationManager = 
            (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        
        // Create intent to open app
        Intent intent = new Intent(this, MainActivity.class);
        intent.putExtra("scam_detected", true);
        intent.putExtra("source", source);
        intent.putExtra("message", message);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        
        PendingIntent pendingIntent = PendingIntent.getActivity(
            this, 0, intent, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        
        // Build alert notification
        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_alert)
            .setContentTitle("🚨 SCAM DETECTED - " + riskLevel + " RISK")
            .setContentText("Score: " + score + "% | Source: " + getAppName(source))
            .setStyle(new NotificationCompat.BigTextStyle()
                .bigText("⚠️ SCAM ALERT ⚠️\n\n" +
                        "Risk Level: " + riskLevel + "\n" +
                        "Scam Score: " + score + "%\n" +
                        "Source: " + getAppName(source) + "\n\n" +
                        "Message: " + message + "\n\n" +
                        "Reasons: " + reasons + "\n\n" +
                        "⛔ DO NOT CLICK ANY LINKS\n" +
                        "⛔ DO NOT DOWNLOAD ANY FILES\n" +
                        "⛔ DO NOT SHARE PERSONAL INFO"))
            .setPriority(NotificationCompat.PRIORITY_MAX)
            .setCategory(NotificationCompat.CATEGORY_ALARM)
            .setColor(Color.RED)
            .setVibrate(new long[]{0, 500, 200, 500})
            .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_ALARM))
            .setAutoCancel(false) // Don't auto-dismiss
            .setOngoing(true) // Make it persistent
            .setContentIntent(pendingIntent);
        
        // Show the alert
        notificationManager.notify((int) System.currentTimeMillis(), builder.build());
        
        Log.e(TAG, "SCAM ALERT TRIGGERED! Risk: " + riskLevel + ", Score: " + score);
    }

    /**
     * Get friendly app name from package name
     */
    private String getAppName(String packageName) {
        if (packageName.contains("whatsapp")) return "WhatsApp";
        if (packageName.contains("sms") || packageName.contains("messaging")) return "SMS";
        if (packageName.contains("telegram")) return "Telegram";
        if (packageName.contains("facebook.orca")) return "Messenger";
        if (packageName.contains("instagram")) return "Instagram";
        return packageName;
    }

    /**
     * Log scam detection for history
     */
    private void logScamDetection(String source, String title, String message, int score) {
        // TODO: Save to local database or file
        Log.i(TAG, "Scam logged - Source: " + source + ", Score: " + score);
    }

    /**
     * Create notification channel for alerts
     */
    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                CHANNEL_NAME,
                NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription("Critical scam alerts from ScamGuard+");
            channel.enableLights(true);
            channel.setLightColor(Color.RED);
            channel.enableVibration(true);
            channel.setVibrationPattern(new long[]{0, 500, 200, 500});
            
            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        super.onNotificationRemoved(sbn);
    }

    @Override
    public void onListenerConnected() {
        super.onListenerConnected();
        Log.i(TAG, "ScamGuard+ Notification Listener Connected!");
    }

    @Override
    public void onListenerDisconnected() {
        super.onListenerDisconnected();
        Log.w(TAG, "ScamGuard+ Notification Listener Disconnected!");
    }
}
