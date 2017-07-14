import { Injectable } from '@angular/core';
@Injectable()
export class Alertlist {

    constructor() {

    }

    getalertString(langtype: string, parameter: string) {
        switch (langtype) {
            case 'hi':
                return this.getHindi(parameter);
            case 'cn':
                return this.getChinese(parameter);
            case 'en':
                return parameter;
            default:
                return parameter;
        }

    }
    getHindi(parameter: string) {
        console.log(parameter);

        switch (parameter) {
            case 'The user name or password is incorrect.':
                return 'यूजरनेम या पासवर्ड गलत है';
            case 'The New password must be at least 6 characters long.':
                return 'नया पासवर्ड कम से कम 6 अक्षर लंबा होना चाहिए।';
            case 'The new password and confirmation password do not match.':
                return 'नया पासवर्ड और पुष्टिकरण पासवर्ड मैच नहीं है।';
            case 'Incorrect password.':
                return 'गलत पासवर्ड।';
            case "Passwords must have at least one non letter or digit character. Passwords must have at least one lowercase ('a'-'z'). Passwords must have at least one uppercase ('A'-'Z').":
                return "पासवर्ड में कम से कम एक गैर अक्षर या अंक वाला अक्षर होना चाहिए। पासवर्ड में कम से कम एक लोअरकेस ('a' - 'z') होना चाहिए। पासवर्ड में कम से कम एक अपरकेस ('ए' - 'जेड') होना चाहिए।";
            case 'Password Sucessfully changed':
                return 'पासवर्ड सफलतापूर्वक बदल दिया है';
            case 'The Current password field is required.':
                return 'वर्तमान पासवर्ड फ़ील्ड आवश्यक है।';
            case 'The New password field is required.':
                return 'नया पासवर्ड फ़ील्ड आवश्यक है।';
            default:
                return parameter;
        }
    }

    getChinese(parameter: string) {

        switch (parameter) {
            case 'The user name or password is incorrect.':
                return '用户名或密码不正确';
            case 'The New password must be at least 6 characters long.':
                return '新密码必须至少为6个字符。';
            case 'The new password and confirmation password do not match.':
                return '新密码和确认密码不匹配。';
            case 'Incorrect password.':
                return '密码错误。';
            case "Passwords must have at least one non letter or digit character. Passwords must have at least one lowercase ('a'-'z'). Passwords must have at least one uppercase ('A'-'Z').":
                return "密码必须至少有一个非字母或数字字符。 密码必须至少有一个小写（'a' - 'z'）。 密码必须至少有一个大写字母（'A' - 'Z'）。";
            case 'Password Sucessfully changed':
                return '密码修改成功';
            case 'The Current password field is required.':
                return '当前密码字段是必需的。';
            case 'The New password field is required.':
                return '新密码字段是必需的。';
            default:
                return parameter;
        }
    }

}