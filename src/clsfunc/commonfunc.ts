import { isDefined } from 'class-validator';
import * as fs from 'fs'

export class commonFun {
  static converterJson(result: any) {
    return JSON.stringify(result);
  }

  static async getDefault_ImageAsBase64(filePath: string): Promise<string> {
    try {      
      const imageBuffer = await fs.promises.readFile(filePath);
      const imageBase64 = this.getImageBase64(imageBuffer)
      return imageBase64;
    } catch (error) {
      console.log('파일을 읽는 중 오류가 발생했습니다: ' + error.message);
    }
  }

  static getTokens(parentsArr: any[]): string[] {
    let tokens: string[] = [];
    let i = 0;
    for (const parents of parentsArr) {
      if (isDefined(parents.token)) {
        tokens[i] = parents.token;
        i += 1;
      }
    }
    return tokens;
  }

  static getImageBuffer(image: number[]): Buffer {
    const uint8Arr = new Uint8Array(image);
    const arrBuffer = uint8Arr.buffer;
    const buffer = Buffer.from(arrBuffer);
    return buffer;
  }

  static getImageBase64(image: Buffer): string {
    const profileJson = this.converterJson(image);
    const encodedStr = Buffer.from(profileJson).toString('base64');
    return encodedStr;
  }
}
