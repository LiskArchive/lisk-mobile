package io.lisk.mobile;

import android.content.ClipData;
import android.content.ClipDescription;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.PersistableBundle;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class SensitiveClipboardModule extends ReactContextBaseJavaModule {

  private static ReactApplicationContext reactContext;

  SensitiveClipboardModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "SensitiveClipboardModule";
  }

  @ReactMethod
  public void copyToClipboardSensitive(String data) {
    ClipboardManager clipboard = (ClipboardManager) reactContext.getSystemService(
      Context.CLIPBOARD_SERVICE
    );

    PersistableBundle extras = new PersistableBundle();
    extras.putBoolean(ClipDescription.EXTRA_IS_SENSITIVE, true);

    ClipData clip = ClipData.newPlainText(null, data);
    ClipDescription description = clip.getDescription();
    description.setExtras(extras);
    ClipData newClip = new ClipData(description, new ClipData.Item(data));

    clipboard.setPrimaryClip(newClip);
  }
}
