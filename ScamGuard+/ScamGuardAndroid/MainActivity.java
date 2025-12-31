package com.scamguard.app;

import android.app.AlertDialog;
import android.content.ComponentName;
import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

/**
 * Main Activity for ScamGuard+ Android App
 * Handles permission requests and displays scam detection status
 */
public class MainActivity extends AppCompatActivity {

    private TextView statusText;
    private Button enableButton;
    private TextView scamCountText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        statusText = findViewById(R.id.statusText);
        enableButton = findViewById(R.id.enableButton);
        scamCountText = findViewById(R.id.scamCountText);

        // Check if we arrived here from a scam detection
        if (getIntent().getBooleanExtra("scam_detected", false)) {
            showScamDetails(getIntent());
        }

        enableButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                requestNotificationPermission();
            }
        });

        updateStatus();
    }

    @Override
    protected void onResume() {
        super.onResume();
        updateStatus();
    }

    /**
     * Check if notification listener permission is granted
     */
    private boolean isNotificationServiceEnabled() {
        String pkgName = getPackageName();
        final String flat = Settings.Secure.getString(getContentResolver(),
                "enabled_notification_listeners");
        if (!TextUtils.isEmpty(flat)) {
            final String[] names = flat.split(":");
            for (String name : names) {
                final ComponentName cn = ComponentName.unflattenFromString(name);
                if (cn != null) {
                    if (TextUtils.equals(pkgName, cn.getPackageName())) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**
     * Request notification listener permission
     */
    private void requestNotificationPermission() {
        if (!isNotificationServiceEnabled()) {
            AlertDialog.Builder builder = new AlertDialog.Builder(this);
            builder.setTitle("Enable ScamGuard+ Protection");
            builder.setMessage("ScamGuard+ needs notification access to monitor incoming messages and protect you from scams.\n\n" +
                    "Please enable 'ScamGuard' in the next screen.");
            builder.setPositiveButton("Enable", (dialog, which) -> {
                startActivity(new Intent("android.settings.ACTION_NOTIFICATION_LISTENER_SETTINGS"));
            });
            builder.setNegativeButton("Cancel", null);
            builder.show();
        } else {
            Toast.makeText(this, "ScamGuard+ is already enabled!", Toast.LENGTH_SHORT).show();
        }
    }

    /**
     * Update UI status
     */
    private void updateStatus() {
        if (isNotificationServiceEnabled()) {
            statusText.setText("✅ ScamGuard+ is ACTIVE\n\nMonitoring all notifications for scams and APK files");
            statusText.setTextColor(getResources().getColor(android.R.color.holo_green_dark));
            enableButton.setText("Protection Enabled");
            enableButton.setEnabled(false);
        } else {
            statusText.setText("⚠️ ScamGuard+ is INACTIVE\n\nTap below to enable protection");
            statusText.setTextColor(getResources().getColor(android.R.color.holo_red_dark));
            enableButton.setText("Enable Protection");
            enableButton.setEnabled(true);
        }
    }

    /**
     * Show scam detection details
     */
    private void showScamDetails(Intent intent) {
        String source = intent.getStringExtra("source");
        String message = intent.getStringExtra("message");

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("🚨 SCAM DETECTED!");
        builder.setMessage("Source: " + source + "\n\nMessage: " + message + "\n\n" +
                "⛔ DO NOT CLICK ANY LINKS\n" +
                "⛔ DO NOT DOWNLOAD FILES\n" +
                "⛔ DO NOT SHARE PERSONAL INFO");
        builder.setPositiveButton("OK", null);
        builder.setCancelable(false);
        builder.show();
    }
}
