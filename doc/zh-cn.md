> 模板版本：v0.2.2

<p align="center">
  <h1 align="center"> <code>react-native-device-info</code> </h1>
</p>
<p align="center">
    <a href="https://github.com/react-native-device-info/react-native-device-info">
        <img src="https://img.shields.io/badge/platforms-android%20|%20ios%20|%20Windows%20|%20Web%20|%20visionOS%20|%20harmony%20-lightgrey.svg" alt="Supported platforms" />
    </a>
    <a href="https://github.com/react-native-device-info/react-native-device-info/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License" />
    </a>
</p>

> [!TIP] [Github 地址](https://github.com/react-native-oh-library/react-native-device-info)


## 安装与使用

请到三方库的 Releases 发布地址查看配套的版本信息：[@react-native-oh-tpl/react-native-device-info Releases](https://github.com/react-native-oh-library/react-native-device-info/releases) 。对于未发布到npm的旧版本，请参考[安装指南](/zh-cn/tgz-usage.md)安装tgz包。

进入到工程目录并输入以下命令：

<!-- tabs:start -->

#### **npm**

```bash
npm install @react-native-oh-tpl/react-native-device-info
```

#### **yarn**

```bash
yarn add @react-native-oh-tpl/react-native-device-info
```

<!-- tabs:end -->

下面的代码展示了这个库的基本使用场景：

> [!WARNING] 使用时 import 的库名不变。

```js
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Colors } from 'react-native/Libraries/NewAppScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [deviceInfo, setDeviceInfo] = useState({
    BundleId: '',
    Version: '',
    ReadableVersion: '',
    BuildNumber: '',
    Tablet: false,
    ApplicationName: '',
    Brand: '',
    Model: '',
    DeviceType: '',
    DeviceName: '',
  });

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const BundleId = await DeviceInfo.getBundleId();
      const Version = await DeviceInfo.getVersion();
      const ReadableVersion = await DeviceInfo.getReadableVersion();
      const BuildNumber = await DeviceInfo.getBuildNumber();
      const Tablet = await DeviceInfo.isTablet();
      const ApplicationName = await DeviceInfo.getApplicationName();
      const Brand = await DeviceInfo.getBrand();
      const Model = await DeviceInfo.getModel();
      const DeviceType = await DeviceInfo.getDeviceType();
      const DeviceName = await DeviceInfo.getDeviceName();

      setDeviceInfo({
        BundleId,
        Version,
        ReadableVersion,
        BuildNumber,
        Tablet,
        ApplicationName,
        Brand,
        Model,
        DeviceType,
        DeviceName,
      });
    };

    fetchDeviceInfo();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            padding: 16,
          }}>
          <Text style={styles.sectionTitle}>Device Information</Text>
          <Text style={styles.infoText}>BundleId: {deviceInfo.BundleId}</Text>
          <Text style={styles.infoText}>Version: {deviceInfo.Version}</Text>
          <Text style={styles.infoText}>ReadableVersion: {deviceInfo.ReadableVersion}</Text>
          <Text style={styles.infoText}>BuildNumber: {deviceInfo.BuildNumber}</Text>
          <Text style={styles.infoText}>Tablet: {deviceInfo.Tablet ? 'Yes' : 'No'}</Text>
          <Text style={styles.infoText}>ApplicationName: {deviceInfo.ApplicationName}</Text>
          <Text style={styles.infoText}>Brand: {deviceInfo.Brand}</Text>
          <Text style={styles.infoText}>Model: {deviceInfo.Model}</Text>
          <Text style={styles.infoText}>DeviceType: {deviceInfo.DeviceType}</Text>
          <Text style={styles.infoText}>DeviceName: {deviceInfo.DeviceName}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default App;
```
## 使用 Codegen

本库已经适配了 `Codegen` ，在使用前需要主动执行生成三方库桥接代码，详细请参考[ Codegen 使用文档](/zh-cn/codegen.md)。

## Link

目前HarmonyOS暂不支持 AutoLink，所以 Link 步骤需要手动配置。

首先需要使用 DevEco Studio 打开项目里的HarmonyOS工程 `harmony`

### 1.在工程根目录的 `oh-package.json5` 添加 overrides 字段

```json
{
  ...
  "overrides": {
    "@rnoh/react-native-openharmony" : "./react_native_openharmony"
  }
}
```

### 2.引入原生端代码

目前有两种方法：

1. 通过 har 包引入（在 IDE 完善相关功能后该方法会被遗弃，目前首选此方法）；
2. 直接链接源码。

方法一：通过 har 包引入（推荐）

> [!TIP] har 包位于三方库安装路径的 `harmony` 文件夹下。

打开 `entry/oh-package.json5`，添加以下依赖

```json
"dependencies": {
    "@rnoh/react-native-openharmony": "file:../react_native_openharmony",
    "@react-native-oh-tpl/react-native-device-info": "file:../../node_modules/@react-native-oh-tpl/react-native-device-info/harmony/device_info.har"
  }
```

点击右上角的 `sync` 按钮

或者在终端执行：

```bash
cd entry
ohpm install
```

方法二：直接链接源码

> [!TIP] 如需使用直接链接源码，请参考[直接链接源码说明](/zh-cn/link-source-code.md)


### 3.在 ArkTs 侧引入 RNDeviceInfoPackage

打开 `entry/src/main/ets/RNPackagesFactory.ts`，添加：

```diff
  ...
+ import {RNDeviceInfoPackage} from '@react-native-oh-tpl/react-native-device-info/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new SamplePackage(ctx),
+   new RNDeviceInfoPackage(ctx)
  ];
}
```

### 4.运行

点击右上角的 `sync` 按钮

或者在终端执行：

```bash
cd entry
ohpm install
```

然后编译、运行即可。

## 约束与限制

### 兼容性

要使用此库，需要使用正确的 React-Native 和 RNOH 版本。另外，还需要使用配套的 DevEco Studio 和 手机 ROM。

请到三方库相应的 Releases 发布地址查看 Release 配套的版本信息：[@react-native-oh-tpl/react-native-device-info Releases](https://github.com/react-native-oh-library/react-native-device-info/releases)


### 权限要求

#### 在 entry 目录下的module.json5中添加权限

打开 `entry/src/main/module.json5`，添加：

```diff
...
"requestPermissions": [
  {
    "name": "ohos.permission.GET_NETWORK_INFO"
  },
  {
    "name": "ohos.permission.GET_WIFI_INFO"
  },
  {
    "name": "ohos.permission.DISTRIBUTED_DATASYNC",
    "reason": "$string:DATA_SYNC",
    "usedScene": {
      "abilities": [
        "EntryAbility"
      ],
      "when": "always"
    }
  }
]
```

## API

> [!TIP] "Platform"列表示该属性在原三方库上支持的平台。

> [!TIP] "HarmonyOS Support"列为 yes 表示 HarmonyOS 平台支持该属性；no 则表示不支持；partially 表示部分支持。使用方法跨平台一致，效果对标 iOS 或 Android 的效果。

| Name | Description | Type | Required | Platform | HarmonyOS Support  |
| ---- | ----------- | ---- | -------- | -------- | ------------------ |
| getAndroidId  |Gets the ANDROID_ID. See API documentation for appropriate use.  | Promise<string>| No | Android      | no |
| getApiLevel  | Gets the API level.  | Promise<number>| No | Android      | yes |
| getApplicationName  | Gets the application name.  | string | No | IOS/Android/Windows/visionOS      | yes |
| getAvailableLocationProviders  | Returns an object of platform-specfic location providers/servcies, with value whether or not they are currently available.boolean       | Promise<object>  | No | IOS/Android/visionOS      | yes |
| getBaseOs  | The base OS build the product is based on.      | Promise<string>  | No | Android/Windows/Web      | yes |
| getBuildId  | Gets build number of the operating system.      | Promise<string>  | No | IOS/Android/Windows/visionOS      | yes |
| getBatteryLevel  | Gets the battery level of the device as a float comprised between 0 and 1.        | Promise<number>  | No | IOS/Android /Windows/Web/visionOS     | yes |
| getBootloader  | The system bootloader version number.        | Promise<string>  | No | Android      | yes |
| getBrand  | Gets the device brand.        | string  | No | IOS/Android/Windows/visionOS      | yes |
| getBuildNumber  | Gets the application build number.       | string  | No | IOS/Android/Windows/visionOS      | yes |
| getBundleId  | Gets the application bundle identifier.        | string  | No | IOS/Android/Windows/visionOS      | yes |
| isCameraPresent  | Tells if the device has any camera now.        | Promise<boolean>  | No | Android/Windows/Web      | yes |
| getCarrier  | Gets the carrier name (network operator).        | Promise<string>  | No | IOS/Android      | yes |
| getCodename  | The current development codename, or the string "REL" if this is a release build.         | Promise<string>  | No | Android      | yes |
| getDevice  |  The name of the industrial design.        | Promise<string>  | No | Android      | yes |
| getDeviceId  |Gets the device ID.        | string  | No | IOS/Android/Windows/visionOS     | no |
| getDeviceType  | TReturns the device's type as a string     | string  | No | IOS/Android/visionOS      | yes |
| getDisplay  | A build ID string meant for displaying to the user.     | Promise<string>  | No | Android      | yes |
| getDeviceName  | Gets the device name.        | Promise<string>  | No | IOS/Android/Windows/visionOS      | yes |
| getDeviceNameSync  | Gets the device name.      | string  | No | No      | No |
| getDeviceToken  | Gets the device token (see DeviceCheck). Only available for iOS 11.0+ on real devices. This will reject the promise when getDeviceToken is not supported, be careful with exception handling.       | Promise<string>  | No | IOS/visionOS      | no |
| getFirstInstallTime  | Gets the time at which the app was first installed, in milliseconds.         | Promise<number>  | No | IOS/Android/Windows/visionOS      | yes |
| getFingerprint  | A string that uniquely identifies this build.         | Promise<string>  | No | Windows      | no |
| getFontScale  | Gets the device font scale. The font scale is the ratio of the current system font to the "normal" font size, so if normal text is 10pt and the system font is currently 15pt, the font scale would be 1.5 This can be used to determine if accessability settings has been changed for the device; you may want to re-layout certain views if the font scale is significantly larger ( > 2.0 )         | Promise<number>  | No | IOS/Android/Windows      | yes |
| getFreeDiskStorage  | Method that gets available storage size, in bytes, taking into account both root and data file systems calculation.         | Promise<number>  | No | IOS/Android/Windows/Web/visionOS      | no |
| getFreeDiskStorageOld  | Old implementation of method that gets available storage size, in bytes.         | Promise<number>  | No | IOS/Android/Windows/Web/visionOS      | no |
| getHardware  | The name of the hardware (from the kernel command line or /proc).         | Promise<string>  | No | Android      | yes |
| getHost  |  Hostname        | Promise<string>  | No | Android/Windows      | yes|
| getHostNames  | Hostnames       | Promise<string[]> | No | Windows      | no |
| getIpAddress  | Deprecated Gets the device current IP address. (of wifi only) Switch to react-native-netinfo/netinfo or react-native-network-info       | Promise<string>  | No |  IOS/Android/Windows/visionOS      | yes |
| getIncremental  | The internal value used by the underlying source control to represent this build.        | Promise<string>  | No | Android      | yes |
| getInstallerPackageName  | The internal value used by the underlying source control to represent this build.         | Promise<string>  | No | IOS/Android/Windows/visoinOS      | yes |
| getInstallReferrer  | Gets the referrer string upon application installation.         | Promise<string>  | No | Android/Windows/Web      | no |
| getInstanceId  | Gets the application instance ID.        | Promise<string>  | No | Android      | yes|
| getLastUpdateTime  | Gets the time at which the app was last updated, in milliseconds.        | Promise<number>  | No | Android      | yes |
| getMacAddress  | Gets the network adapter MAC address.        | Promise<string>  | No | IOS/Android/visionOS      | no |
| getManufacturer  | Gets the device manufacturer.        | Promise<string>  | No | IOS/Android/visoinOS      | yes |
| getManufacturerSync  | Gets the device manufacturer.        | string  | No | IOS/Android/visoinOS      | yes |
| getMaxMemory  | Returns the maximum amount of memory that the VM will attempt to use, in bytes.        | Promise<number>  | No | Android/Windows/Web      | no |
| getModel  | Gets the device model.     | string  | No | IOS/Android      | yes |
| getPowerState  | Gets the power state of the device including the battery level, whether it is plugged in, and if the system is currently operating in low power mode.    | Promise<object>  | No | IOS/Android/Windows/Web/visionOS      | yes |
| getProduct  | The name of the overall product.        | Promise<string>  | No | Android      | yes |
| getPreviewSdkInt  | The developer preview revision of a prerelease SDK.        | Promise<number>  | No | Android      | no |
| getReadableVersion  | Gets the application human readable version (same as getVersion() + '.' + getBuildNumber())         | string  | No | IOS/Android/Windows/visionOS      | yes |
| getSerialNumber  | Gets the device serial number. Will be 'unknown' in almost all cases unless you have a privileged app and you know what you're doing.       | Promise<string>  | No | Android/Windows      | no |
| getSecurityPatch  | The user-visible security patch level.        | Promise<string>  | No | Android      | yes |
| getSystemAvailableFeatures  | Returns a list of available system features on Android.         | Promise<string[]>  | No | Android      | no |
| getSystemName  | Gets the device OS name.        | string  | No | IOS/Android/Windows/visoinOS      | yes |
| getSystemVersion  | Gets the device OS version.         | string  | No | IOS/Android/Windows/visoinOS      | yes |
| getTags  | Comma-separated tags describing the build.        | Promise<string>  | No | Android      | no |
| getType  | The type of build.        | Promise<string>  | No | Android      | yes |
| getTotalDiskCapacity  | Method that gets full disk storage size, in bytes, taking into account both root and data file systems calculation.        | Promise<number>  | No | Android      | no |
| getTotalDiskCapacityOld  | Old implementation of method that gets full disk storage size, in bytes.        | Promise<number>  | No | Android      | no |
| getTotalMemory  | Gets the device total memory, in bytes.        | Promise<number>  | No | IOS/Android/Web/visionOS      | no |
| getUniqueId  | Gets the device unique ID. On Android it is currently identical to in this module.          | Promise<string>  | No | IOS/Android/Windows/visionOS      | no |
| getUsedMemory  | Gets the app memory usage, in bytes.          | Promise<string>  | No | IOS/Android/Windows/Web/visionOs      | yes |
| getUserAgent  | Gets the device User Agent.          | Promise<string>  | No | IOS/Android/Web/visionOs      | no |
| getUserAgentSync  | Gets the device User Agent.          | string  | No | Android/Web     | no |
| getVersion  | Gets the application version. Take into account that a version string is device/OS formatted and can contain any additional data (such as build number etc.). If you want to be sure about version format, you can use a regular expression to get the desired portion of the returned version string.      | string  | No | IOS/Android/Windows/visionOS      | yes |
| getBrightness  | Gets the current brightness level of the device's main screen. Currently iOS only. Returns a number between 0.0 and 1.0, inclusive.        | Promise<number>  | No | IOS     | no |
| hasGms  | Tells if the device supports Google Mobile Services.         | Promise<boolean>  | No | Android      | yes |
| hasHms  | Tells if the device supports Huawei Mobile Services.         | Promise<boolean>  | No | Android      | yes |
| hasNotch  | Tells if the device has a notch.         | boolean  | No | IOS/Android/Windows/visionOS      | no |
| hasDynamicIsland  | Tells if the device has a dynamic island.         | boolean  | No | IOS/Android/Windows/visionOS      | no |
| hasSystemFeature  | Tells if the device has a specific system feature.         | Promise<boolean>  | No | Android      | no |
| isAirplaneMode  | Tells if the device is in Airplane Mode.       | Promise<boolean>  | No | Android/ Web     | yes |
| isBatteryCharging  | Tells if the battery is currently charging.         | Promise<boolean>  | No | IOS/Android/Windows/Web/visionOS      | yes |
| isEmulator  | Tells if the application is running in an emulator.        | Promise<boolean>  | No | IOS/Android/Windows/visionOS      | no |
| isKeyboardConnected  | Tells if the device has a keyboard connected.        | Promise<boolean>  | No | Windows      | partially(Only supports asynchronous retrieval) |
| isLandscape  | Tells if the device is currently in landscape mode.        | Promise<boolean>  | No | IOS/Android/Windows/visionOs      | yes |
| isLocationEnabled  | Allow access to user's location information        | Promise<boolean>  | No | IOS/Android/Web/visionOS      | yes |
| isMouseConnected  | Tells if the device has a mouse connected.         | Promise<boolean>  | No | Windows   | yes |
| isHeadphonesConnected  | Tells if the device has a Headphones connected.         | Promise<boolean>  | No | IOS/Android/visionOS      | yes |
| isWiredHeadphonesConnected  | Tells if the device has a WiredHeadphones connected.         | Promise<boolean>  | No | IOS/Android/visionOS      | yes |
| isBluetoothHeadphonesConnected  | Tells if the device has a BluetoothHeadphones connected.         | Promise<boolean>  | No | IOS/Android/visionOS      | yes |
| isPinOrFingerprintSet  | Tells if a PIN number or a fingerprint was set for the device.         | Promise<boolean>  | No | IOS/Android/Windows/visoinOs      | yes |
| isTablet  | Tells if the device is a tablet.         | boolean  | No | IOS/Android/Windows/visoinOs      | yes |
| isLowRamDevice  |  Tells if the device has low RAM.          | boolean  | No | Android      | yes |
| isDisplayZoomed  | Tells if the user changed Display Zoom to Zoomed       | boolean  | No | IOS     | no |
| isTabletMode  | Tells if the device is in tablet mode.       | Promise<boolean>  | No | Windows     | no |
| supported32BitAbis  | device support 32  Abis       | Promise<string[]>  | No | Windows     | yes |
| supported64BitAbis  | device support 64 Abis       | Promise<string[]>  | No | Windows     | yes |
| supportedAbis  | device support Abis      | Promise<string[]>  | No | IOS/Android/Windows/visoinOS     | yes|
| syncUniqueId  | This method is intended for iOS,This synchronizes uniqueId with IDFV or sets new a random string,On iOS it uses the DeviceUID uid identifier. On other platforms it just call getUniqueId() in this module.       | Promise<string>  | No | IOS/visionOS     | no |
| getSupportedMediaTypeList  | This method gets the list of supported media codecs.       | Promise<string[]>  | No | IOS/Android      | yes |


## 遗留问题

- [ ] getDeviceId()接口harmony暂不支持[issue#8](https://github.com/react-native-oh-library/react-native-device-info/issues/8)
- [ ] getDeviceToken()接口harmony暂不支持[issue#9](https://github.com/react-native-oh-library/react-native-device-info/issues/9)
- [ ] getFingerprint()接口harmony暂不支持 [issue#10](https://github.com/react-native-oh-library/react-native-device-info/issues/10)
- [ ] getFreeDiskStorage()接口harmony暂不支持 [issue#11](https://github.com/react-native-oh-library/react-native-device-info/issues/11)
- [ ] getFreeDiskStorageOld()接口harmony暂不支持 [issue#12](https://github.com/react-native-oh-library/react-native-device-info/issues/12)
- [ ] getInstallReferrer()接口harmony暂不支持 [issue#13](https://github.com/react-native-oh-library/react-native-device-info/issues/13)
- [ ] getMacAddress()接口harmony暂不支持 [issue#14](https://github.com/react-native-oh-library/react-native-device-info/issues/14)
- [ ] getMaxMemory()接口harmony暂不支持 [issue#15](https://github.com/react-native-oh-library/react-native-device-info/issues/15)
- [ ] getSerialNumber()接口harmony暂不支持 [issue#16](https://github.com/react-native-oh-library/react-native-device-info/issues/16)
- [ ] getTags()接口harmony暂不支持 [issue#17](https://github.com/react-native-oh-library/react-native-device-info/issues/17)
- [ ] getTotalDiskCapacity()接口harmony暂不支持 [issue#18](https://github.com/react-native-oh-library/react-native-device-info/issues/18)
- [ ] getTotalDiskCapacityOld()接口harmony暂不支持 [issue#19](https://github.com/react-native-oh-library/react-native-device-info/issues/19)
- [ ] getTotalMemory()接口harmony暂不支持 [issue#20](https://github.com/react-native-oh-library/react-native-device-info/issues/20)
- [ ] getUniqueId()接口harmony暂不支持 [issue#21](https://github.com/react-native-oh-library/react-native-device-info/issues/21)
- [ ] syncUniqueId()接口harmony暂不支持 [issue#22](https://github.com/react-native-oh-library/react-native-device-info/issues/22)
- [ ] getUserAgent()接口harmony暂不支持 [issue#23](https://github.com/react-native-oh-library/react-native-device-info/issues/23)
- [ ] getUserAgentSync()接口harmony暂不支持 [issue#24](https://github.com/react-native-oh-library/react-native-device-info/issues/24) 
- [ ] hasNotch()接口harmony暂不支持 [issue#25](https://github.com/react-native-oh-library/react-native-device-info/issues/25)
- [ ] hasDynamicIsland()接口harmony暂不支持 [issue#26](https://github.com/react-native-oh-library/react-native-device-info/issues/26)
- [ ] hasSystemFeature()接口harmony暂不支持 [issue#27](https://github.com/react-native-oh-library/react-native-device-info/issues/27)
- [ ] isEmulator()接口harmony暂不支持 [issue#28](https://github.com/react-native-oh-library/react-native-device-info/issues/28) 
- [ ] isDisplayZoomed()接口harmony暂不支持 [issue#29](https://github.com/react-native-oh-library/react-native-device-info/issues/29)
- [ ] getBrightness()接口harmony暂不支持 [issue#30](https://github.com/react-native-oh-library/react-native-device-info/issues/30)

## 其他

## 开源协议

本项目基于 [The MIT License (MIT)](https://github.com/react-native-device-info/react-native-device-info/blob/master/LICENSE) ，请自由地享受和参与开源。
