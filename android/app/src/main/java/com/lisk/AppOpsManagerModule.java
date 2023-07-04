package io.lisk.mobile;

import android.app.AppOpsManager;
import android.app.AppOpsManager.OnOpNotedCallback;
import android.app.AppOpsManager.SyncNotedAppOp;
import android.app.AppOpsManager.AsyncNotedAppOp;
import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Arrays;

public class AppOpsManagerModule extends ReactContextBaseJavaModule {
    private static final String TAG = "AppOpsManagerModule";
    private OnOpNotedCallback callback;
    private AppOpsManager appOpsManager;

    public AppOpsManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        appOpsManager = (AppOpsManager) reactContext.getSystemService(Context.APP_OPS_SERVICE);
    }

    @Override
    public String getName() {
        return "AppOpsManagerModule";
    }

    private void logPrivateDataAccess(String opCode, String trace) {
        Log.i(TAG, "Private data accessed. Operation: " + opCode + "\nStack Trace:\n" + trace);
    }

    @ReactMethod
    public void registerCallback() {
        callback = new OnOpNotedCallback() {

            @Override
            public void onNoted(SyncNotedAppOp syncNotedAppOp) {
                logPrivateDataAccess(syncNotedAppOp.getOp(), Arrays.toString(new Throwable().getStackTrace()));
            }

            @Override
            public void onSelfNoted(SyncNotedAppOp syncNotedAppOp) {
                logPrivateDataAccess(syncNotedAppOp.getOp(), Arrays.toString(new Throwable().getStackTrace()));
            }

            @Override
            public void onAsyncNoted(AsyncNotedAppOp asyncNotedAppOp) {
                logPrivateDataAccess(asyncNotedAppOp.getOp(), asyncNotedAppOp.getMessage());
            }
        };
        appOpsManager.setOnOpNotedCallback(getReactApplicationContext().getMainExecutor(), callback);
    }

    @ReactMethod
    public void unregisterCallback() {
        if (callback != null) {
            appOpsManager.stopWatchingMode(callback);
            callback = null;
        }
    }
}
