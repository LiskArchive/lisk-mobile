package io.lisk.mobile;

import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.Promise;

import com.lambdapioneer.argon2kt.Argon2Kt;
import com.lambdapioneer.argon2kt.Argon2KtResult;
import com.lambdapioneer.argon2kt.Argon2Mode;

import java.math.BigInteger;

public class RNArgon2Module extends ReactContextBaseJavaModule {
    private ReactContext mReactContext;

    public RNArgon2Module(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNArgon2";
    }

    @ReactMethod
    public void argon2(String password, String salt, ReadableMap config, Promise promise) {
        try {
            final byte[] passwordBytes = password.getBytes("UTF-8");

            final byte[] saltInputBytes = new BigInteger(salt, 16).toByteArray();
            byte[] saltBytes = new byte[8];
            System.arraycopy(saltInputBytes, saltInputBytes.length - 8, saltBytes, 0, 8);

            Integer iterations = config.hasKey("iterations") ? new Integer(config.getInt("iterations")) : new Integer(2);
            Integer memory = config.hasKey("memory") ? new Integer(config.getInt("memory")) : new Integer(32 * 1024);
            Integer parallelism = config.hasKey("parallelism") ? new Integer(config.getInt("parallelism")) : new Integer(1);
            Integer hashLength = config.hasKey("hashLength") ? new Integer(config.getInt("hashLength")) : new Integer(32);
            Argon2Mode mode = config.hasKey("mode") ? getArgon2Mode(config.getString("mode")) : Argon2Mode.ARGON2_ID;

            final Argon2Kt argon2Kt = new Argon2Kt();

            final Argon2KtResult hashResult = argon2Kt.hash(
                    mode,
                    passwordBytes,
                    saltBytes,
                    iterations,
                    memory,
                    parallelism,
                    hashLength);
            final String rawHash = hashResult.rawHashAsHexadecimal(false);
            final String encodedHash = hashResult.encodedOutputAsString();

            WritableMap resultMap = new WritableNativeMap();
            resultMap.putString("rawHash", rawHash);
            resultMap.putString("encodedHash", encodedHash);

            promise.resolve(resultMap);
        } catch (Exception exception) {
            promise.reject("Failed to generate argon2 hash", exception);
        }
    }

    public Argon2Mode getArgon2Mode(String mode) {
        Argon2Mode selectedMode;
        switch (mode) {
            case "argon2d":
                selectedMode = Argon2Mode.ARGON2_D;
                break;
            case "argon2i":
                selectedMode = Argon2Mode.ARGON2_I;
                break;
            case "argon2id":
                selectedMode = Argon2Mode.ARGON2_ID;
                break;
            default:
                selectedMode = Argon2Mode.ARGON2_ID;
                break;
        }

        return selectedMode;
    }
}
