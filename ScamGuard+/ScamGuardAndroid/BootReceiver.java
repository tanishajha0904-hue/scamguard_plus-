package com.scamguard.app;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

/**
 * Boot Receiver to start ScamGuard+ service on device boot
 */
public class BootReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
            Log.i("ScamGuard", "Device booted - Starting ScamGuard+ service");
            
            // Start the monitoring service
            Intent serviceIntent = new Intent(context, ScamMonitorService.class);
            context.startForegroundService(serviceIntent);
        }
    }
}
