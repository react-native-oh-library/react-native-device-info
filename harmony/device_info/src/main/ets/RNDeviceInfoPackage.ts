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

import { RNPackage, TurboModulesFactory } from "@rnoh/react-native-openharmony/ts";
import type { TurboModule, TurboModuleContext } from "@rnoh/react-native-openharmony/ts";
import { TM } from "@rnoh/react-native-openharmony/generated/ts";
import { RNDeviceInfoModule } from './RNDeviceInfoModule';

class RNDeviceInfoModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    console.info('test zyx RNDeviceInfoModulesFactory createTurboModule name:'+name)
    if (name === TM.RNDeviceInfo.NAME) {
      console.info('test zyx RNDeviceInfoModulesFactory createTurboModule 1');
      return new RNDeviceInfoModule(this.ctx);
    }
    console.info('test zyx RNDeviceInfoModulesFactory createTurboModule 2');
    return null;
  }

  hasTurboModule(name: string): boolean {
    console.info('test zyx RNDeviceInfoModulesFactory hasTurboModule name:'+name+',RNDeviceInfo:'+TM.RNDeviceInfo.NAME);
    return name === TM.RNDeviceInfo.NAME;
  }
}

export class RNDeviceInfoPackage extends RNPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    console.info('test zyx RNDeviceInfoModulesFactory RNDeviceInfoPackage');
    return new RNDeviceInfoModulesFactory(ctx);
  }
}