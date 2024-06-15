import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
    isEmulator(): Promise<boolean>;
    isEmulatorSync(): boolean;
    getMacAddress(): Promise<string>;
    getMacAddressSync(): string;
    getApiLevel(): Promise<number>;
    getApiLevelSync(): number;
    getApplicationName(): string;
    getBaseOs(): Promise<string>;
    getBaseOsSync:() => string;
    getBatteryLevel(): Promise<number>;
    getBatteryLevelSync(): number;
    getBootloader(): Promise<string>;
    getBootloaderSync(): string;
    getBrand(): string;
    getBuildId(): Promise<string>;
    getBuildIdSync(): string;
    getBuildNumber(): string;
    getBundleId(): string;
    getCarrier(): Promise<string>;
    getCarrierSync(): string;
    getCodename(): Promise<string>;
    getCodenameSync(): string;
    getDevice(): Promise<string>;
    getDeviceSync(): string;
    getDeviceId(): string;
    getDeviceName(): Promise<string>;
    getDeviceNameSync(): string;
    getDeviceType(): string;
    getDisplay(): Promise<string>;
    getDisplaySync(): string;
    getFingerprint(): Promise<string>;
    getFingerprintSync(): string;
    getFirstInstallTime(): Promise<number>;
    getFirstInstallTimeSync(): number;
    getFontScale(): Promise<number>;
    getFontScaleSync(): number;
    getFreeDiskStorage(): Promise<number>;
    getFreeDiskStorageOld(): Promise<number>;
    getFreeDiskStorageSync(): number;
    getFreeDiskStorageOldSync(): number;
    getHardware(): Promise<string>;
    getHardwareSync(): string;
    getHost(): Promise<string>;
    getHostSync(): string;
    getIncremental(): Promise<string>;
    getIncrementalSync(): string;
    getInstallerPackageName(): Promise<string>;
    getInstallerPackageNameSync(): string;
    getInstanceId(): Promise<string>;
    getInstanceIdSync(): string;
    getIpAddress(): Promise<string>;
    getIpAddressSync(): string;
    getLastUpdateTime(): Promise<number>;
    getLastUpdateTimeSync(): number;
    getManufacturer(): Promise<string>;
    getManufacturerSync(): string;
    getModel(): string;
    getProduct(): Promise<string>;
    getProductSync(): string;
    getReadableVersion(): string;
    getSecurityPatch(): Promise<string>;
    getSecurityPatchSync(): string;
    getSerialNumber(): Promise<string>;
    getSerialNumberSync(): string;
    getSystemName(): string;
    getSystemVersion(): string;
    getTags(): Promise<string>;
    getTagsSync(): string;
    getTotalDiskCapacity(): Promise<number>;
    getTotalDiskCapacityOld(): Promise<number>;
    getTotalDiskCapacitySync(): number;
    getTotalDiskCapacityOldSync(): number;
    getTotalMemory(): Promise<number>;
    getTotalMemorySync(): number;
    isLowRamDevice(): Promise<boolean>;
    getUsedMemory(): Promise<number>
    getType(): Promise<string>;
    getTypeSync(): string;
    getUniqueId(): Promise<string>;
    getUniqueIdSync(): string;
    getUserAgent(): Promise<string>;
    getUserAgentSync(): string;
    getVersion(): string;
    hasGms(): Promise<boolean>;
    hasGmsSync(): boolean;
    hasHms(): Promise<boolean>;
    hasHmsSync(): boolean;
    isAirplaneMode(): Promise<boolean>;
    isAirplaneModeSync(): boolean;
    isBatteryCharging(): Promise<boolean>;
    isBatteryChargingSync(): boolean;
    isCameraPresent(): Promise<boolean>;
    isCameraPresentSync(): boolean;
    isHeadphonesConnected(): Promise<boolean>;
    isHeadphonesConnectedSync(): boolean;
    isWiredHeadphonesConnected(): Promise<boolean>;
    isWiredHeadphonesConnectedSync(): boolean;
    isBluetoothHeadphonesConnected(): Promise<boolean>;
    isBluetoothHeadphonesConnectedSync(): boolean;
    isLandscape(): Promise<boolean>;
    isLandscapeSync(): boolean;
    isLocationEnabled(): Promise<boolean>;
    isLocationEnabledSync(): boolean;
    isTablet(): boolean;
    supported32BitAbis(): Promise<string[]>;
    supported32BitAbisSync(): string[];
    supported64BitAbis(): Promise<string[]>;
    supported64BitAbisSync(): string[];
    supportedAbis(): Promise<string[]>;
    supportedAbisSync(): string[];
    getSupportedMediaTypeList(): Promise<string[]>;
    getSupportedMediaTypeListSync(): string[];
    isEmulator(): Promise<boolean>;
    isEmulatorSync(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>("RNDeviceInfo");