package io.lisk.mobile;

import android.app.AppOpsManager;
import android.app.AppOpsManager.OnOpNotedCallback;
import android.app.AsyncNotedAppOp;
import android.app.SyncNotedAppOp;
import android.content.Context;
import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Arrays;

public class AppOpsManagerModule extends ReactContextBaseJavaModule {

  private static ReactApplicationContext reactContext;
  private AppOpsManager.OnOpNotedCallback callback;

  AppOpsManagerModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "AppOpsManagerModule";
  }

  @ReactMethod
  public void startWatching() {
    AppOpsManager appOpsManager = (AppOpsManager) reactContext.getSystemService(
      Context.APP_OPS_SERVICE
    );

    if (callback == null) {
      callback =
        new AppOpsManager.OnOpNotedCallback() {
          private void logPrivateDataAccess(String opCode, String trace) {
            Log.i(
              "Lisk",
              "Private data accessed. " + "Operation: " + opCode + "\nStack Trace:\n" + trace
            );
          }

          @Override
          public void onNoted(SyncNotedAppOp syncNotedAppOp) {
            logPrivateDataAccess(
              syncNotedAppOp.getOp(),
              Arrays.toString(new Throwable().getStackTrace())
            );
          }

          @Override
          public void onSelfNoted(SyncNotedAppOp syncNotedAppOp) {
            logPrivateDataAccess(
              syncNotedAppOp.getOp(),
              Arrays.toString(new Throwable().getStackTrace())
            );
          }

          @Override
          public void onAsyncNoted(AsyncNotedAppOp asyncNotedAppOp) {
            logPrivateDataAccess(asyncNotedAppOp.getOp(), asyncNotedAppOp.getMessage());
          }
        };
    }

    if (appOpsManager != null && callback != null) {
      try {
        appOpsManager.setOnOpNotedCallback(reactContext.getMainExecutor(), callback);
      } catch (IllegalStateException e) {
        Log.w(
          "AppOpsManagerModule",
          "Attempted to register a callback when one was already registered"
        );
      }
    }
  }
}
