package io.lisk.mobile;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.uimanager.ViewManager;
import java.util.Collections;
import java.util.List;
import android.content.Intent;
import android.net.Uri;

public class UninstallPackage implements ReactPackage {

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.singletonList(new UninstallModule(reactContext));
    }

    public class UninstallModule extends ReactContextBaseJavaModule {
        private ReactApplicationContext reactContext;

        UninstallModule(ReactApplicationContext context) {
            super(context);
            reactContext = context;
        }

        @Override
        public String getName() {
            return "UninstallModule";
        }

        @ReactMethod
        public void promptUninstall(String packageName) {
            Intent intent = new Intent(Intent.ACTION_DELETE);
            intent.setData(Uri.parse("package:" + packageName));
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            this.reactContext.startActivity(intent);
        }
    }
}
