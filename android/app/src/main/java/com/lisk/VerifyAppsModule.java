package io.lisk.mobile;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.safetynet.HarmfulAppsData;
import com.google.android.gms.safetynet.SafetyNet;
import java.util.ArrayList;
import java.util.List;



public class VerifyAppsModule extends ReactContextBaseJavaModule {

  private static String bytesToHex(byte[] bytes) {
      StringBuilder builder = new StringBuilder();
      for (byte b : bytes) {
          builder.append(String.format("%02x", b));
      }
      return builder.toString();
  }
  
  private final ReactApplicationContext reactContext;

  public VerifyAppsModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "VerifyAppsModule";
  }

  @ReactMethod
  public void checkForHarmfulApps(Promise promise) {
    SafetyNet
      .getClient(reactContext)
      .listHarmfulApps()
      .addOnCompleteListener(task -> {
        if (task.isSuccessful()) {
          WritableArray harmfulAppsList = Arguments.createArray();
          List<HarmfulAppsData> harmfulApps = task.getResult().getHarmfulAppsList();
          for (HarmfulAppsData app : harmfulApps) {
            WritableMap appData = Arguments.createMap();
            appData.putString("packageName", app.apkPackageName);
            appData.putInt("category", app.apkCategory);
            appData.putString("apkHash", bytesToHex(app.apkSha256));
            harmfulAppsList.pushMap(appData);
          }
          promise.resolve(harmfulAppsList);
        } else {
          promise.reject("ERROR", "Failed to check for harmful apps");
        }
      });
  }
}
