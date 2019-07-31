package io.lisk.mobile;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.clipsub.RNShake.RNShakeEventPackage;
import com.reactNativeQuickActions.AppShortcutsPackage;
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
import com.wix.interactable.Interactable;
import com.bluroverly.SajjadBlurOverlayPackage;
import com.hieuvp.fingerprint.ReactNativeFingerprintScannerPackage;
import com.oblador.keychain.KeychainPackage;
import org.reactnative.camera.RNCameraPackage;
import com.krazylabs.OpenAppSettingsPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.ocetnik.timer.BackgroundTimerPackage;
import com.horcrux.svg.SvgPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.bitgo.randombytes.RandomBytesPackage;
import com.peel.react.rnos.RNOSModule;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.remobile.qrcodeLocalImage.RCTQRCodeLocalImagePackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.wix.reactnativekeyboardinput.KeyboardInputPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new RNGestureHandlerPackage(),
        new ReanimatedPackage(),
        new AsyncStoragePackage(),
        new RNDeviceInfo(),
        new RNShakeEventPackage(),
        new AppShortcutsPackage(),
        new KeyboardInputPackage(this.getApplication()),
        new RNReactNativeHapticFeedbackPackage(),
        new Interactable(),
        new SajjadBlurOverlayPackage(),
        new ReactNativeFingerprintScannerPackage(),
        new KeychainPackage(),
        new SplashScreenReactPackage(),
        new OpenAppSettingsPackage(),
        new RCTQRCodeLocalImagePackage(),
        new LottiePackage(),
        new BackgroundTimerPackage(),
        new SvgPackage(),
        new VectorIconsPackage(),
        new UdpSocketsModule(),
        new TcpSocketsModule(),
        new RandomBytesPackage(),
        new RNOSModule(),
        new RNCameraPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
