# Native Mobile App Setup Guide

Your app is now configured for native iOS and Android deployment with camera and location permissions!

## 🚀 Quick Start

1. **Export to GitHub**: Click "Export to GitHub" button in Lovable
2. **Clone your repository**:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Initialize Capacitor** (first time only):
   ```bash
   npx cap init
   ```

5. **Add platforms**:
   ```bash
   npx cap add ios
   npx cap add android
   ```

6. **Build your app**:
   ```bash
   npm run build
   npx cap sync
   ```

7. **Run on device/emulator**:
   ```bash
   # For Android (requires Android Studio)
   npx cap run android
   
   # For iOS (requires Mac with Xcode)
   npx cap run ios
   ```

## 📱 Required Native Files

After running `npx cap add android` and `npx cap add ios`, you'll need to add permission descriptions:

### Android - `android/app/src/main/AndroidManifest.xml`

Add these permissions inside the `<manifest>` tag:

```xml
<!-- Camera Permissions -->
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />

<!-- Location Permissions -->
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />

<!-- Additional permissions for recording -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### iOS - `ios/App/App/Info.plist`

Add these keys inside the `<dict>` tag:

```xml
<!-- Camera Permission -->
<key>NSCameraUsageDescription</key>
<string>Suraksha Kavach needs camera access to record emergency videos for your safety.</string>

<!-- Microphone Permission -->
<key>NSMicrophoneUsageDescription</key>
<string>Suraksha Kavach needs microphone access to record emergency audio for your safety.</string>

<!-- Location Permissions -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>Suraksha Kavach needs your location to send it to emergency contacts when you're in danger.</string>

<key>NSLocationAlwaysUsageDescription</key>
<string>Suraksha Kavach needs your location to share it with emergency contacts during emergencies.</string>

<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>Suraksha Kavach needs continuous location access to keep you safe and alert your emergency contacts.</string>

<!-- Photo Library Permission -->
<key>NSPhotoLibraryUsageDescription</key>
<string>Suraksha Kavach needs access to save emergency recordings to your photo library.</string>

<key>NSPhotoLibraryAddUsageDescription</key>
<string>Suraksha Kavach needs access to save emergency recordings to your photo library.</string>
```

## 🔄 Development Workflow

After making changes in Lovable:

1. Git pull your latest changes:
   ```bash
   git pull origin main
   ```

2. Sync with native platforms:
   ```bash
   npm run build
   npx cap sync
   ```

3. Run the app:
   ```bash
   npx cap run android
   # or
   npx cap run ios
   ```

## 📋 Permission Features Implemented

✅ **Runtime Permission Requests**: App asks for permissions when needed
✅ **Permission Status Checking**: Verifies if permissions are granted
✅ **User-Friendly Alerts**: Shows toast notifications for permission status
✅ **Camera Permission**: For emergency video recording
✅ **Location Permission**: For sharing location with emergency contacts
✅ **Graceful Fallbacks**: App continues to work even if permissions are denied

## 🛠️ Requirements

- **For Android**: Android Studio installed
- **For iOS**: Mac with Xcode installed
- **Node.js**: Version 16 or higher
- **npm**: Comes with Node.js

## 📚 Learn More

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Capacitor Camera Plugin](https://capacitorjs.com/docs/apis/camera)
- [Capacitor Geolocation Plugin](https://capacitorjs.com/docs/apis/geolocation)

## ⚠️ Important Notes

- The app will work in the browser preview but permissions will use browser APIs
- Native permissions only work after deploying to iOS/Android
- Always run `npx cap sync` after pulling new changes
- Test on real devices for best results with shake detection and location tracking
