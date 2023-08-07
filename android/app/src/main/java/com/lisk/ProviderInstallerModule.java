package io.lisk.mobile;

import android.app.Activity;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.security.ProviderInstaller;

public class ProviderInstallerModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private static final String TAG = "ProviderInstallerModule";

    ProviderInstallerModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "ProviderInstaller";
    }

    @ReactMethod
    public void installIfNeeded() {
        final Activity activity = getCurrentActivity();
        try {
            ProviderInstaller.installIfNeeded(activity);
        } catch (GooglePlayServicesRepairableException e) {
            Log.e(TAG, "Google Play Services Repairable", e);
        } catch (GooglePlayServicesNotAvailableException e) {
            Log.e(TAG, "Google Play Services Not Available", e);
        }
    }
}
