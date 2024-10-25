/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import deviceInfo from '@ohos.deviceInfo';
import batteryInfo from '@ohos.batteryInfo';
import bundleManager from '@ohos.bundle.bundleManager';
import camera from '@ohos.multimedia.camera';
import { BusinessError } from '@ohos.base';
import audio from '@ohos.multimedia.audio';
import sim from '@ohos.telephony.sim';
import settings from '@ohos.settings';
import statvfs from '@ohos.file.statvfs';
import geoLocationManager from '@ohos.geoLocationManager';
import { common } from '@kit.AbilityKit';
import wifiManager from '@ohos.wifiManager';
import web_webview from '@ohos.web.webview';
import media from '@ohos.multimedia.media';
import { TurboModule, TurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';
import resourceManager from '@ohos.resourceManager';
import appManager from '@ohos.app.ability.appManager';
import { inputDevice } from '@kit.InputKit';
import power from '@ohos.power';
import Logger from './Logger';
import screenLock from '@ohos.screenLock';
import { AAID } from '@kit.PushKit';
import { display } from '@kit.ArkUI'
import { asset } from '@kit.AssetStoreKit';
import { util } from '@kit.ArkTS'

const abiList32 = ["armeabi", "win_x86", "win_arm"];
const abiList64 = ["arm64 v8", "Intel x86-64h Haswell", "arm64-v8a", "armeabi-v7a", "win_x64"];

export class RNDeviceInfoModule extends TurboModule implements TM.RNDeviceInfo.Spec {
    protected context: common.UIAbilityContext;

    constructor(protected ctx: TurboModuleContext) {
        super(ctx);
        this.context = ctx?.uiAbilityContext;
    }

    getApiLevelSync(): number {
        return deviceInfo.sdkApiVersion;
    }

    getApiLevel(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            const data = this.getApiLevelSync();
            resolve(data);
        });
    }

    getApplicationName(): string {
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
        let result: string = "";
        try {
            let data = bundleManager.getBundleInfoForSelfSync(bundleFlags);
            if (data) {
                result = this.context?.resourceManager?.getStringSync(data.appInfo?.labelId);
            }
        } catch (err) {
            let message = (err as BusinessError).message;
            Logger.error(`getBundleInfoForSelfSync failed error message: ${message}.`);
        }
        return result;
    }

    getAvailableLocationProviders(): Promise<Object> {
        return new Promise<Object>((resolve, reject) => {
            resolve(this.getAvailableLocationProvidersSync());
        });
    }

    getAvailableLocationProvidersSync(): Object {
        let obj = {
            gps: false
        };

        try {
            let locationEnabled = geoLocationManager.isLocationEnabled();
            obj.gps = locationEnabled;
        } catch (err) {
            Logger.error("getAvailableLocationProvidersSync errCode:" + (err).code + ",errMessage:" +
            (err).message);
        }
        return obj;
    }

    getBaseOs(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const data = this.getBaseOsSync();
            resolve(data);
        });
    }

    getBaseOsSync(): string {
        return "HarmonyOS"
    }

    getBatteryLevel(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(this.getBatteryLevelSync());
        });
    }

    getBatteryLevelSync(): number {
        return batteryInfo.batterySOC;
    }

    getBootloader(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const data = this.getBootloaderSync();
            resolve(data);
        });
    }

    getBootloaderSync(): string {
        return deviceInfo.bootloaderVersion;
    }

    getBrand(): string {
        return deviceInfo.brand;
    }

    getBuildId(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getBuildIdSync());
        });
    }

    getBuildIdSync(): string {
        return deviceInfo.versionId;
    }

    getBuildNumber(): string {
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
        let result: string = "";
        try {
            let data = bundleManager.getBundleInfoForSelfSync(bundleFlags);
            if (data) {
                result = data.versionCode.toString();
            }
        } catch (err) {
            let message = (err as BusinessError).message;
            Logger.error(`getBundleInfoForSelfSync aa failed error message: ${message}.`);
        }
        return result;
    }

    getBundleId(): string {
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
        let result: string = "";
        try {
            let data = bundleManager.getBundleInfoForSelfSync(bundleFlags);
            if (data) {
                result = data.versionCode.toString();
            }
        } catch (err) {
            let message = (err as BusinessError).message;
            Logger.error(`getBundleInfoForSelfSync getBundleId failed error message: ${message}.`);
        }
        return result;
    }

    getCarrier(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getCarrierSync());
        });
    }

    getCarrierSync(): string {
        let spn: string = "";
        try {
            spn = sim.getSimSpnSync(0);
        } catch (e) {
            Logger.info(`getCarrierSync the sim card spn err:` + e.message);
        }
        return spn;
    }

    getCodename(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const data = this.getCodenameSync();
            resolve(data);
        });
    }

    getCodenameSync(): string {
        return deviceInfo.osReleaseType;
    }

    getDevice(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getDeviceSync());
        });
    }

    getDeviceSync(): string {
        return deviceInfo.productModel;
    }

    getDeviceId(): string {
        return deviceInfo.udid;
    }

    getDeviceName(): Promise<string> {
        return settings.getValue(this.context, settings.general.DEVICE_NAME);
    }

    getDeviceNameSync(): string {
        let data = settings.getValueSync(this.context, settings.general.DEVICE_NAME, '');
        return data;
    }

    getDeviceType(): string {
        return deviceInfo.deviceType;
    }

    getDisplay(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getDisplaySync());
        });
    }

    getDisplaySync(): string {
        return deviceInfo.displayVersion;
    }

    getFingerprint(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getFingerprintSync());
        });
    }

    getFingerprintSync(): string {
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
        let data = bundleManager.getBundleInfoForSelfSync(bundleFlags);
        return data.versionCode.toString();
    }

    getFirstInstallTime(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(this.getFirstInstallTimeSync());
        });
    }

    getFirstInstallTimeSync(): number {
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
        let result: number;
        try {
            let data = bundleManager.getBundleInfoForSelfSync(bundleFlags);
            if (data) {
                result = data.installTime;
            }
        } catch (err) {
            let message = (err as BusinessError).message;
        }
        return result;
    }

    getFontScale(): Promise<number> {
        Environment.envProp('fontScale', '');
        const fontScale: SubscribedAbstractProperty<number> = AppStorage.prop('fontScale');
        return new Promise<number>((resolve, reject) => {
            resolve(fontScale.get());
        });
    }

    getFontScaleSync(): number {
        Environment.envProp('fontScale', '');
        const fontScale: SubscribedAbstractProperty<number> = AppStorage.prop('fontScale');
        return fontScale.get();
    }

    getFreeDiskStorage(): Promise<number> {
        return new Promise<number>(async (resolve, reject) => {
            resolve(this.getFreeDiskStorageSync());
        });
    }

    getFreeDiskStorageSync(): number {
        return statvfs.getFreeSizeSync(this.context?.filesDir)
    }

    getFreeDiskStorageOld(): Promise<number> {
        let context = this.context;
        let path = context?.filesDir;
        return statvfs.getFreeSize(path);
    }

    getFreeDiskStorageOldSync(): number {
        let path = "/dev";
        let size = statvfs.getFreeSizeSync(path);
        return size;
    }

    getHardware(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getHardwareSync());
        });
    }

    getHardwareSync(): string {
        return deviceInfo.hardwareModel;
    }

    getHost(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getHostSync());
        });
    }

    getHostSync(): string {
        return deviceInfo.buildHost;
    }

    getIncremental(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(deviceInfo.incrementalVersion);
        });
    }

    getIncrementalSync(): string {
        return deviceInfo.incrementalVersion;
    }

    getInstallerPackageName(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getInstallerPackageNameSync());
        });
    }

    getInstallerPackageNameSync(): string {
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_HAP_MODULE;
        let bundleInfo = bundleManager.getBundleInfoForSelfSync(bundleFlags);
        return bundleInfo.name
    }

    getInstanceId(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getInstanceIdSync());
        });
    }

    getInstanceIdSync(): string {
        return deviceInfo.ODID;
    }

    getIpAddress(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const data = this.getIpAddressSync();
            resolve(data);
        });
    }

    getIpAddressSync(): string {
        let ipAddress: string = '';
        try {
            let info = wifiManager.getIpInfo();
            ipAddress = this.intToIP(info.ipAddress)
        } catch (error) {
            Logger.error("failed:" + JSON.stringify(error));
        }
        return ipAddress;
    }

    private intToIP(num) {
        var str;
        var tt = new Array();
        tt[0] = (num >>> 24) >>> 0;
        tt[1] = ((num << 8) >>> 24) >>> 0;
        tt[2] = (num << 16) >>> 24;
        tt[3] = (num << 24) >>> 24;
        str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
        return str;
    }

    getLastUpdateTime(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(this.getLastUpdateTimeSync());
        });
        ;
    }

    getLastUpdateTimeSync(): number {
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
        let result: number;
        try {
            let data = bundleManager.getBundleInfoForSelfSync(bundleFlags);
            if (data) {
                result = data.updateTime;
            }
        } catch (err) {
            let message = (err as BusinessError).message;
            Logger.error(`getLastUpdateTimeSync failed error message: ${message}.`);
        }
        return result;
    }

    async getMacAddress():Promise<string> {
        let linkInfo=await wifiManager.getLinkedInfo();
        return linkInfo.macAddress
    }

    getManufacturer(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getManufacturerSync());
        });
    }

    getManufacturerSync(): string {
        return deviceInfo.manufacture;
    }

    getPowerState(): Promise<Object> {
        return new Promise<Object>((resolve, reject) => {
            resolve(this.getPowerStateSync());
        });
    }

    getPowerStateSync(): Object {
        let batterySOC = batteryInfo.batterySOC;
        let chargingStatus = batteryInfo.chargingStatus;
        let batteryState: string = "unknown";
        if (chargingStatus == batteryInfo.BatteryChargeState.NONE ||
            chargingStatus == batteryInfo.BatteryChargeState.DISABLE) {
            batteryState = "unplugged";
        } else if (chargingStatus == batteryInfo.BatteryChargeState.ENABLE) {
            batteryState = "charging";
        } else if (chargingStatus == batteryInfo.BatteryChargeState.FULL) {
            batteryState = "full";
        }

        let lowPowerMode = false;
        try {
            let mode = power.getPowerMode();
            if (mode == power.DevicePowerMode.MODE_POWER_SAVE || power.DevicePowerMode.MODE_EXTREME_POWER_SAVE) {
                lowPowerMode = true;
            }
            Logger.info('power mode: ' + mode);
        } catch (err) {
            Logger.error('get power mode failed, err: ' + err);
        }
        let data = {
            batteryLevel: batterySOC,
            batteryState: batteryState,
            lowPowerMode: lowPowerMode
        }
        return data;
    }

    getModel(): string {
        return deviceInfo.productModel;
    }

    getProduct(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(deviceInfo.productSeries);
        });
    }

    getProductSync(): string {
        return deviceInfo.productSeries
    }

    getReadableVersion(): string {
        return this.getVersion() + '.' + this.getBuildNumber();
    }

    getSecurityPatch(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(deviceInfo.securityPatchTag);
        });
    }

    getSecurityPatchSync(): string {
        return deviceInfo.securityPatchTag;
    }

    //只有系统应用可以使用
    getSerialNumber(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getSerialNumberSync());
        });
    }

    getSerialNumberSync(): string {
        return deviceInfo.serial;
    }

    getSystemName(): string {
        return "HarmonyOS";
    }

    getSystemVersion(): string {
        return deviceInfo.osReleaseType;
    }

    getTotalDiskCapacity(): Promise<number> {
        let path = this.context?.filesDir;
        return statvfs.getTotalSize(path);
    }

    getTotalDiskCapacitySync(): number {
        let path = this.context?.filesDir;
        return statvfs.getTotalSizeSync(path);
    }

    getTotalDiskCapacityOld(): Promise<number> {
        let path = this.context?.filesDir;
        return statvfs.getTotalSize(path);
    }

    getTotalDiskCapacityOldSync(): number {
        let path = this.context?.filesDir;
        return statvfs.getTotalSizeSync(path);
    }

    getTotalMemory(): Promise<number> {
        let path = this.context?.filesDir;
        return statvfs.getTotalSize(path)
    }

    getTotalMemorySync(): number {
        let path = this.context?.filesDir;
        return statvfs.getTotalSizeSync(path)
    }

    isLowRamDevice(): Promise<boolean> {
        return appManager.isRamConstrainedDevice()
    }

    getUsedMemory(): Promise<number> {
        return appManager.getAppMemorySize()
    }

    getType(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getTypeSync());
        });
    }

    getTypeSync(): string {
        return deviceInfo.buildType;
    }

    private  stringToArray(str: string): Uint8Array {
        let textEncoder = new util.TextEncoder();
        return textEncoder.encodeInto(str);
    }

    private arrayToString(arr: Uint8Array): string {
        let textDecoder = util.TextDecoder.create("utf-8", { ignoreBOM: true });
        let str = textDecoder.decodeWithStream(arr, { stream: false })
        return str;
    }

    getUniqueId(): Promise<string> {
        let query: asset.AssetMap = new Map();
        query.set(asset.Tag.ALIAS, this.stringToArray('device_unique_id'));
        query.set(asset.Tag.RETURN_TYPE, asset.ReturnType.ALL);
        return new Promise<string>((resolve, reject) => {
            try {
                let res: Array<asset.AssetMap> = asset.querySync(query)
                let secretStr: string = ""
                for (let i = 0; i < res.length; i++) {
                    let secret: Uint8Array = res[i].get(asset.Tag.SECRET) as Uint8Array;
                    secretStr = this.arrayToString(secret);
                }
                return resolve(secretStr)
            } catch (error) {
                AAID.getAAID((err: BusinessError, data: string) => {
                    if (err) {
                        console.info('device_unique_id Failed to get AAID: %{public}d %{public}s' + JSON.stringify(err));
                        reject(JSON.stringify(err))
                    } else {
                        let attr: asset.AssetMap = new Map();
                        attr.set(asset.Tag.SECRET, this.stringToArray(data));
                        attr.set(asset.Tag.ALIAS, this.stringToArray('device_unique_id'));
                        attr.set(asset.Tag.ACCESSIBILITY, asset.Accessibility.DEVICE_FIRST_UNLOCKED);
                        attr.set(asset.Tag.DATA_LABEL_NORMAL_1, this.stringToArray('demo_label'));
                        attr.set(asset.Tag.IS_PERSISTENT, true);
                        try {
                            asset.add(attr).then(() => {
                                return resolve(data)
                            }).catch((err: BusinessError) => {
                                console.error(`device_unique_id Failed to add Asset. Code is ${err.code}, message is ${err.message}`);
                                reject(JSON.stringify(err))
                            })
                        } catch (error) {
                            let err = error as BusinessError;
                            console.error(`device_unique_id  Failed to add Asset. Code is ${err.code}, message is ${err.message}`);
                            reject(JSON.stringify(err))
                        }
                    }
                });
            }
        })
    }

    //  只有系统应用可以使用
    getUniqueIdSync(): string {
        return deviceInfo.udid
    }

    getUserAgent(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(this.getUserAgentSync());
        });
    }

    getUserAgentSync(): string {
        let userAgent = '';
        let controller = new web_webview.WebviewController();
        try {
            userAgent = controller.getUserAgent();
        } catch (error) {
            let e: BusinessError = error as BusinessError;
            Logger.error(`getUserAgentSync ErrorCode: ${e.code},  Message: ${e.message}`);
        }
        return userAgent;
    }

    getVersion(): string {
        let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION;
        let result: string = "";
        try {
            let data = bundleManager.getBundleInfoForSelfSync(bundleFlags);
            if (data) {
                result = data.versionName;
            }
        } catch (err) {
            let message = (err as BusinessError).message;
            Logger.error(`getVersion failed error message: ${message}.`);
        }
        return result;
    }

    hasGms(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(false);
        });
    }

    hasGmsSync(): boolean {
        return false;
    }

    hasHms(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    hasHmsSync(): boolean {
        return true;
    }

    async hasNotch(): Promise<boolean> {
        let displayClass: display.Display = display.getDefaultDisplaySync();
        if (!!!displayClass) {
            return false
        }
        let result: display.CutoutInfo = await displayClass.getCutoutInfo();
        if (result && result.boundingRects && result.boundingRects.length > 0) {
            return true;
        }
        return false
    }

    isAirplaneMode(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.isAirplaneModeSync());
        });
    }

    isAirplaneModeSync(): boolean {
        let flag: boolean = false;
        let data = settings.getValueSync(this.context, settings.general.AIRPLANE_MODE_STATUS, '0');
        if (data == "1") {
            flag = true;
        }
        return flag;
    }

    async isKeyboardConnected(): Promise<boolean> {
        let isKeyboardConnected = false
        let deviceList = await inputDevice.getDeviceList()
        if (!!deviceList && deviceList.length > 0) {
            for (let i = 0; i < deviceList.length; i++) {
                inputDevice.getDeviceInfo(deviceList[i]).then((deviceData) => {
                    if (!!deviceData && !!deviceData.sources) {
                        let sourceTypes = deviceData.sources
                        for (let j = 0; j < sourceTypes.length; j++) {
                            if (sourceTypes[i] == "keyboard") {
                                isKeyboardConnected = true
                            }
                        }
                    }
                });
            }
        }
        return isKeyboardConnected
    }


    isKeyboardConnectedSync(): boolean {
        let isKeyboardConnected = false
        try {
            inputDevice.getDeviceList().then((ids) => {
                if (!!ids && ids.length > 0) {
                    for (let i = 0; i < ids.length; i++) {
                        inputDevice.getDeviceInfo(ids[i]).then((deviceData) => {
                            if (!!deviceData && !!deviceData.sources) {
                                let sourceTypes = deviceData.sources
                                for (let j = 0; j < sourceTypes.length; j++) {
                                    if (sourceTypes[i] == "keyboard") {
                                        isKeyboardConnected = true
                                    }
                                }
                            }
                        });
                    }
                }
                return isKeyboardConnected
            });
        } catch (error) {
            return false
        }
    }

    isMouseConnected(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.isMouseConnectedSync());
        });
    }

    isMouseConnectedSync(): boolean {
        let isKeyboardConnected = false
        try {
            inputDevice.getDeviceList().then((ids) => {
                if (!!ids && ids.length > 0) {
                    for (let i = 0; i < ids.length; i++) {
                        inputDevice.getDeviceInfo(ids[i]).then((deviceData) => {
                            if (!!deviceData && !!deviceData.sources) {
                                let sourceTypes = deviceData.sources
                                for (let j = 0; j < sourceTypes.length; j++) {
                                    if (sourceTypes[i] == "mouse") {
                                        isKeyboardConnected = true
                                    }
                                }
                            }
                        });
                    }
                }
            });
            return isKeyboardConnected
        } catch (error) {
            return false
        }
    }

    isBatteryCharging(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.isBatteryChargingSync());
        });
    }

    isBatteryChargingSync(): boolean {
        let flag = false;
        let chargingStatus = batteryInfo.chargingStatus;

        if (chargingStatus == batteryInfo.BatteryChargeState.NONE ||
            chargingStatus == batteryInfo.BatteryChargeState.DISABLE) {
            flag = false;
        } else if (chargingStatus == batteryInfo.BatteryChargeState.ENABLE) {
            flag = true;
        } else if (chargingStatus == batteryInfo.BatteryChargeState.FULL) {
            flag = true;
        }
        return flag;
    }

    isCameraPresent(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.isCameraPresentSync());
        });
    }

    isCameraPresentSync(): boolean {
        let cameraManager: camera.CameraManager | undefined = undefined;
        try {
            cameraManager = camera.getCameraManager(this.context);
        } catch (error) {
            let err = error as BusinessError;
            Logger.error(`The getCameraManager call failed. error code: ${err.code}`);
        }
        let cameras: Array<camera.CameraDevice> = [];
        try {
            cameras = cameraManager.getSupportedCameras();
        } catch (error) {
            let err = error as BusinessError;
            Logger.error(`The getSupportedCameras call failed. error code: ${err.code}`);
        }
        if (cameras && cameras.length > 0) {
            return true;
        }
        return false;
    }

    isHeadphonesConnected(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.isHeadphonesConnectedSync());
        });
    }

    isHeadphonesConnectedSync(): boolean {
        let isHeadphonesConnected = false
        let audioManager = audio.getAudioManager();
        let audioRoutingManager = audioManager.getRoutingManager();
        let data = audioRoutingManager.getDevicesSync(audio.DeviceFlag.OUTPUT_DEVICES_FLAG);
        if (!!data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].deviceType == audio.DeviceType.WIRED_HEADSET ||
                    data[i].deviceType == audio.DeviceType.BLUETOOTH_A2DP) {
                    isHeadphonesConnected = true
                }
            }
        }
        return isHeadphonesConnected;
    }

    isWiredHeadphonesConnected(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.isWiredHeadphonesConnectedSync());
        });
    }

    isWiredHeadphonesConnectedSync(): boolean {
        let isWiredHeadphonesConnected = false
        let audioManager = audio.getAudioManager();
        let audioRoutingManager = audioManager.getRoutingManager();
        let data = audioRoutingManager.getDevicesSync(audio.DeviceFlag.OUTPUT_DEVICES_FLAG);
        if (!!data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].deviceType == audio.DeviceType.WIRED_HEADSET) {
                    isWiredHeadphonesConnected = true
                }
            }
        }
        return isWiredHeadphonesConnected;
    }

    isBluetoothHeadphonesConnected(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.isBluetoothHeadphonesConnectedSync());
        });
    }

    isBluetoothHeadphonesConnectedSync(): boolean {
        let isBluetoothHeadphonesConnected = false
        let audioManager = audio.getAudioManager();
        let audioRoutingManager = audioManager.getRoutingManager();
        let data = audioRoutingManager.getDevicesSync(audio.DeviceFlag.OUTPUT_DEVICES_FLAG);
        if (!!data && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].deviceType == audio.DeviceType.BLUETOOTH_A2DP) {
                    isBluetoothHeadphonesConnected = true
                }
            }
        }
        return isBluetoothHeadphonesConnected;
    }


    isLandscape(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(this.isLandscapeSync());
        });
    }

    isLandscapeSync(): boolean {
        return this.context.resourceManager.getConfigurationSync().direction ==
        resourceManager.Direction.DIRECTION_HORIZONTAL
    }


    isLocationEnabled(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(geoLocationManager.isLocationEnabled());
        });
    }

    isLocationEnabledSync(): boolean {
        let locationEnabled = false;
        try {
            locationEnabled = geoLocationManager.isLocationEnabled();
        } catch (err) {
            Logger.error("isLocationEnabledSync errCode:" + (err).code + ",errMessage:" + (err).message);
        }
        return locationEnabled;
    }

    isPinOrFingerprintSet(): Promise<boolean> {
        return screenLock.isSecureMode()
    }

    isTablet(): boolean {
        return "tablet" === deviceInfo.deviceType
    }

    supported32BitAbis(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            resolve(this.supported32BitAbisSync());
        });
    }

    supported32BitAbisSync(): string[] {
        let list = this.supportedAbisSync();
        let arr: string[] = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let type = list[i];
                for (let j = 0; j < abiList32.length; j++) {
                    if (type == abiList32[j]) {
                        arr.push(abiList32[j])
                    }
                }
            }
        }
        return arr;
    }

    supported64BitAbis(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            const data = this.supported64BitAbisSync();
            resolve(data);
        });
    }

    supported64BitAbisSync(): string[] {
        let list = this.supportedAbisSync();
        let arr: string[] = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let type = list[i];
                for (let j = 0; j < abiList64.length; j++) {
                    if (type == abiList64[j]) {
                        arr.push(abiList64[j])
                    }
                }
            }
        }
        return arr;
    }

    supportedAbis(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            resolve([deviceInfo.abiList]);
        });
    }

    supportedAbisSync(): string[] {
        return [deviceInfo.abiList];
    }

    getSupportedMediaTypeList(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            resolve(this.getSupportedMediaTypeListSync());
        });
    }

    getSupportedMediaTypeListSync(): string[] {
        media.CodecMimeType
        let result = [media.CodecMimeType.VIDEO_H263,
            media.CodecMimeType.VIDEO_AVC,
            media.CodecMimeType.VIDEO_MPEG2,
            media.CodecMimeType.VIDEO_MPEG4,
            media.CodecMimeType.VIDEO_VP8,
            media.CodecMimeType.VIDEO_HEVC,
            media.CodecMimeType.AUDIO_AAC,
            media.CodecMimeType.AUDIO_VORBIS,
            media.CodecMimeType.AUDIO_FLAC,
        ];
        return result;
    }
}