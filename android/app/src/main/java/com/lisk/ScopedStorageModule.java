package io.lisk.mobile;

import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.net.Uri;
import android.provider.MediaStore;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.io.IOException;
import java.io.OutputStream;

public class ScopedStorageModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public ScopedStorageModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "ScopedStorage";
  }

  @ReactMethod
  public void saveToDownloads(String fileName, String mimeType, String dataString, Promise promise) {
    try {
			byte[] data = dataString.getBytes("UTF-8");

      ContentValues values = new ContentValues();
      values.put(MediaStore.Downloads.DISPLAY_NAME, fileName);
      values.put(MediaStore.Downloads.MIME_TYPE, mimeType);
      values.put(MediaStore.Downloads.IS_PENDING, 1);

      ContentResolver resolver = reactContext.getContentResolver();
      Uri collection = MediaStore.Downloads.EXTERNAL_CONTENT_URI;
      Uri itemUri = resolver.insert(collection, values);

      try (OutputStream os = resolver.openOutputStream(itemUri)) {
        os.write(data);
      } catch (IOException e) {
        promise.reject("ERROR_WRITING_FILE", "Error writing to the Downloads folder", e);
        return;
      }

      values.clear();
      values.put(MediaStore.Downloads.IS_PENDING, 0);
      resolver.update(itemUri, values, null, null);

      promise.resolve(itemUri.toString());
    } catch (Exception e) {
      promise.reject("ERROR_SAVING_TO_DOWNLOADS", "Error saving to the Downloads folder", e);
    }
  }
}
