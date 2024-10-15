export function isIdNumber(val) {
    const re = /^\d{8}$|^[a-zA-Z]\d{9}$/;
    return re.test(val);
}

export function isEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return !re.test(email);
}

export function isInt(val) {
    if (isNaN(val)) {
        return false;
    }
    const x = parseFloat(val);
    return (x | 0) === x;
}

export function isEmpty(val) {
    return (typeof val === 'undefined' || val == null || val.length == 0) ? true : false;
}

export function isOneOfEmpty(...vals) {
    return vals.some(val => isEmpty(val));
}

export function isObject(val) {
    return val !== null && typeof val === 'object';
}

export function isFunction(val) {
    return typeof val === 'function';
}

export function isString(val) {
    return typeof val === 'string';
}

export function isBoolean(val) {
    return typeof val === 'boolean';
}

export function isNumber(val) {
    return typeof val === 'number';
}

export function isArray(val) {
    return Array.isArray(val);
}

export function isUndef(val) {
    return typeof val === 'undefined';
}

export function isStrLenContains(str, ...len) {
    for (const arg of len) {
        if (str?.length === arg)
            return true;
    }
    return false;
}

export function isMobile() {
    // eslint-disable-next-line no-useless-escape
    return ((function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) return true; })(navigator.userAgent || navigator.vendor || window.opera)) ? true : false;
}

export function isTablet() {
    return ((function (a) { if (/ipad|android.+\d safari|tablet/i.test(a)) return true; })(navigator.userAgent || navigator.vendor || window.opera)) ? true : false;
}

// 日期字串 yyyyMMdd 往前判斷，天
export function isWithinDaysBefore(dateString, days) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString.slice(0, 4), dateString.slice(4, 6) - 1, dateString.slice(6));
    const daysBefore = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    return date >= daysBefore && date <= today;
}

// 日期字串 yyyyMMdd 往後判斷，天
export function isWithinDaysAfter(dateString, days) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString.slice(0, 4), dateString.slice(4, 6) - 1, dateString.slice(6));
    const daysAfter = new Date(today.getFullYear(), today.getMonth(), today.getDate() + days);
    return date <= daysAfter && date >= today;
}

// 日期字串 yyyyMMdd 往前判斷，年
export function isWithinYearsBefore(dateString, years) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString.slice(0, 4), dateString.slice(4, 6) - 1, dateString.slice(6));
    const yearsBefore = new Date(today.getTime());
    yearsBefore.setFullYear(yearsBefore.getFullYear() - years);
    return date >= yearsBefore && date <= today;
}

// 日期字串 yyyyMMdd 往後判斷，年
export function isWithinYearsAfter(dateString, years) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString.slice(0, 4), dateString.slice(4, 6) - 1, dateString.slice(6));
    const yearsAfter = new Date(today.getFullYear() + years, today.getMonth(), today.getDate());
    return date <= yearsAfter && date >= today;
}

// 日期字串 yyyyMMdd 往前判斷，月
export function isWithinMonthsBefore(dateString, months) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString.slice(0, 4), dateString.slice(4, 6) - 1, dateString.slice(6));
    const monthsBefore = new Date(today.getTime());
    monthsBefore.setMonth(monthsBefore.getMonth() - months);
    return date >= monthsBefore && date <= today;
}

// 日期字串 yyyyMMdd 往後判斷，月
export function isWithinMonthsAfter(dateString, months) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString.slice(0, 4), dateString.slice(4, 6) - 1, dateString.slice(6));
    const monthsAfter = new Date(today.getFullYear(), today.getMonth() + months, today.getDate());
    return date <= monthsAfter && date >= today;
}

// 判斷日期字串是否在今天以前
export function isBeforeToday(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = new Date(dateString.slice(0, 4), dateString.slice(4, 6) - 1, dateString.slice(6));
    return date <= today;
}

/**
 * 判斷字串是否符合指定長度的英數字格式
 * @param {string} str - 要驗證的字串
 * @param {number} length - 要求的字串長度
 * @returns {boolean} - 字串是否符合要求
 */
export function isValidAlphanumericFormat(str) {
    // if (str?.length !== length) {
    //     return false;
    // }
    return /^[a-zA-Z0-9]+$/.test(str);
}

/**
 * 判斷字串是否符合指定長度的數字格式
 * @param {string} str - 要驗證的字串
 * @param {number} length - 要求的字串長度
 * @returns {boolean} - 字串是否符合要求
 */
export function isValidNumericFormat(str, length) {
    if (str?.length !== length) {
        return false;
    }
    return /^[0-9]+$/.test(str);
}

/**
 * 檢查字串長度是否在指定範圍內。
 *
 * @param {string} str - 要檢查的字串。
 * @param {number} min - 最小長度。
 * @param {number} max - 最大長度。
 * @param {boolean} [strictMode=false] - 是否啟用嚴格模式。
 * @returns {boolean} - 如果字串長度在指定範圍內，則返回 true；否則返回 false。
 */
export function isStrLengthInRange(str, min, max, strictMode = false) {
    const length = str.length;
    if (strictMode) {
        return length > min && length < max;
    } else {
        return length >= min && length <= max;
    }
}

/**
 * 判斷輸入的字串是否為合法的十進位數字格式，且小數點後的位數不超過指定長度。
 * @param {string} str - 要判斷的字串。
 * @param {number} [decimalCount=0] - 小數點後的位數不超過的長度，預設為 0。
 * @returns {boolean} 輸入的字串是否為合法的十進位數字格式，且小數點後的位數不超過指定長度。
 * @example
 * const result1 = isValidDecimalLength('123.45', 2); // true
 * const result2 = isValidDecimalLength('123.456', 2); // false
 * const result3 = isValidDecimalLength('123.4', 2); // true
 * const result4 = isValidDecimalLength('123', 0); // true
 * const result5 = isValidDecimalLength('123a.45', 2); // false
 */
export function isValidDecimalLength(str, decimalCount = 0) {
    if (typeof str !== 'string' || !/^-?\d*\.?\d+$/.test(str)) {
        return false; // 不是合法的十進位數字格式，返回 false
    }
    if (typeof decimalCount !== 'number' || !/^[0-9]+$/.test(decimalCount)) {
        return false; // 小數位不能為負數
    }
    const parts = str.split('.');
    if (parts.length > 1) {
        // 如果有小數點，則檢查小數點後的位數是否小於等於 decimalCount
        return parts[1].length <= decimalCount;
    }
    return true;
}

/**
 * 判斷設備是否支持 getUserMedia 方法
 *
 * @returns {boolean} 返回一個布爾值，如果設備支持 getUserMedia，則為 true；否則為 false。
 */
export function isGetUserMediaSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}