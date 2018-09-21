/** Declaration file generated by dts-gen */

export = koa_validate;

declare function koa_validate(app: any): any;

declare namespace koa_validate {
    class FileValidator {
        constructor(context: any, key: any, value: any, exists: any, params: any, deleteOnCheckFailed: any);

        contentTypeMatch(reg: any, tip: any): any;

        copy(dst: any, afterCopy: any): any;

        delete(): any;

        fileNameMatch(reg: any, tip: any): any;

        isImageContentType(tip: any): any;

        move(dst: any, afterMove: any): any;

        notEmpty(tip: any): any;

        size(min: any, max: any, tip: any): any;

        suffixIn(arr: any, tip: any): any;

    }

    class Validator {
        constructor(context: any, key: any, value: any, exists: any, params: any, goOn: any);

        addError(tip: any): void;

        blacklist(s: any): any;

        byteLength(min: any, max: any, charset: any, tip: any): any;

        check(fn: any, tip: any, scope: any): any;

        clone(key: any, value: any): any;

        contains(s: any, tip: any): any;

        decodeBase64(inBuffer: any, tip: any): any;

        decodeURI(tip: any): any;

        decodeURIComponent(tip: any): any;

        default(d: any): any;

        empty(): any;

        encodeBase64(): any;

        encodeURI(): any;

        encodeURIComponent(): any;

        ensure(assertion: any, tip: any, shouldBail: any): any;

        ensureNot(assertion: any, tip: any, shouldBail: any): any;

        eq(l: any, tip: any): any;

        escape(): any;

        exist(tip: any): any;

        filter(cb: any, scope: any): any;

        first(index: any): any;

        ge(l: any, tip: any): any;

        get(index: any): any;

        gt(l: any, tip: any): any;

        hasError(): any;

        hash(alg: any, enc: any): any;

        in(arr: any, tip: any): any;

        isAfter(d: any, tip: any): any;

        isAlpha(tip: any, locale: any): any;

        isAlphanumeric(tip: any, locale: any): any;

        isAscii(tip: any): any;

        isBase64(tip: any): any;

        isBefore(d: any, tip: any): any;

        isByteLength(min: any, max: any, charset: any, tip: any): any;

        isCreditCard(tip: any): any;

        isCurrency(tip: any, options: any): any;

        isDataURI(tip: any): any;

        isDate(tip: any): any;

        isDivisibleBy(n: any, tip: any): any;

        isEmail(tip: any, options: any): any;

        isFQDN(tip: any, options: any): any;

        isFloat(tip: any, options: any): any;

        isFullWidth(tip: any): any;

        isHalfWidth(tip: any): any;

        isHexColor(tip: any): any;

        isHexadecimal(tip: any): any;

        isISBN(tip: any, version: any): any;

        isISIN(tip: any): any;

        isISO8601(tip: any): any;

        isIn(arr: any, tip: any): any;

        isInt(tip: any, options: any): any;

        isIp(tip: any, version: any): any;

        isJSON(tip: any): any;

        isLength(min: any, max: any, tip: any): any;

        isLowercase(tip: any): any;

        isMACAddress(tip: any): any;

        isMobilePhone(tip: any, locale: any): any;

        isMultibyte(tip: any): any;

        isNull(tip: any): any;

        isNumeric(tip: any): any;

        isSurrogatePair(tip: any): any;

        isTime(tip: any): any;

        isUUID(tip: any, ver: any): any;

        isUppercase(tip: any): any;

        isUrl(tip: any, options: any): any;

        isVariableWidth(tip: any): any;

        isString(tip: any): any;

        isBoolean(tip: any): any;

        isHash(tip: any): any;

        isIdCardNO(tip: any): any;

        isMongoId(tip: any): any;

        isStamp(tip: any): any;

        isUnixStamp(tip: any): any;

        le(l: any, tip: any): any;

        len(min: any, max: any, tip: any): any;

        lt(l: any, tip: any): any;

        ltrim(c: any): any;

        match(reg: any, tip: any): any;

        md5(): any;

        neq(l: any, tip: any): any;

        notBlank(tip: any): any;

        notContains(s: any, tip: any): any;

        notEmpty(tip: any): any;

        notMatch(reg: any, tip: any): any;

        optional(): any;

        replace(a: any, b: any): any;

        rtrim(c: any): any;

        sha1(): any;

        stripLow(nl: any): any;

        toBoolean(): any;

        toDate(): any;

        toFloat(tip: any): any;

        toInt(tip: any, radix: any, options: any): any;

        toJson(tip: any): any;

        toLow(): any;

        toLowercase(): any;

        toUp(): any;

        toUppercase(): any;

        trim(c: any): any;

        type(t: any, tip: any): any;

        whitelist(s: any): any;

    }

    namespace Validator {
        // @ts-ignore
        namespace prototype {
            function addError(tip: any): void;

            function blacklist(s: any): any;

            function byteLength(min: any, max: any, charset: any, tip: any): any;

            function check(fn: any, tip: any, scope: any): any;

            function clone(key: any, value: any): any;

            function contains(s: any, tip: any): any;

            function decodeBase64(inBuffer: any, tip: any): any;

            function decodeURI(tip: any): any;

            function decodeURIComponent(tip: any): any;

            function empty(): any;

            function encodeBase64(): any;

            function encodeURI(): any;

            function encodeURIComponent(): any;

            function ensure(assertion: any, tip: any, shouldBail: any): any;

            function ensureNot(assertion: any, tip: any, shouldBail: any): any;

            function eq(l: any, tip: any): any;

            function escape(): any;

            function exist(tip: any): any;

            function filter(cb: any, scope: any): any;

            function first(index: any): any;

            function ge(l: any, tip: any): any;

            function get(index: any): any;

            function gt(l: any, tip: any): any;

            function hasError(): any;

            function hash(alg: any, enc: any): any;

            function isAfter(d: any, tip: any): any;

            function isAlpha(tip: any, locale: any): any;

            function isAlphanumeric(tip: any, locale: any): any;

            function isAscii(tip: any): any;

            function isBase64(tip: any): any;

            function isBefore(d: any, tip: any): any;

            function isByteLength(min: any, max: any, charset: any, tip: any): any;

            function isCreditCard(tip: any): any;

            function isCurrency(tip: any, options: any): any;

            function isDataURI(tip: any): any;

            function isDate(tip: any): any;

            function isDivisibleBy(n: any, tip: any): any;

            function isEmail(tip: any, options: any): any;

            function isFQDN(tip: any, options: any): any;

            function isFloat(tip: any, options: any): any;

            function isFullWidth(tip: any): any;

            function isHalfWidth(tip: any): any;

            function isHexColor(tip: any): any;

            function isHexadecimal(tip: any): any;

            function isISBN(tip: any, version: any): any;

            function isISIN(tip: any): any;

            function isISO8601(tip: any): any;

            function isIn(arr: any, tip: any): any;

            function isInt(tip: any, options: any): any;

            function isIp(tip: any, version: any): any;

            function isJSON(tip: any): any;

            function isLength(min: any, max: any, tip: any): any;

            function isLowercase(tip: any): any;

            function isMACAddress(tip: any): any;

            function isMobilePhone(tip: any, locale: any): any;

            function isMultibyte(tip: any): any;

            function isNull(tip: any): any;

            function isNumeric(tip: any): any;

            function isSurrogatePair(tip: any): any;

            function isTime(tip: any): any;

            function isUUID(tip: any, ver: any): any;

            function isUppercase(tip: any): any;

            function isUrl(tip: any, options: any): any;

            function isVariableWidth(tip: any): any;

            function le(l: any, tip: any): any;

            function len(min: any, max: any, tip: any): any;

            function lt(l: any, tip: any): any;

            function ltrim(c: any): any;

            function match(reg: any, tip: any): any;

            function md5(): any;

            function neq(l: any, tip: any): any;

            function notBlank(tip: any): any;

            function notContains(s: any, tip: any): any;

            function notEmpty(tip: any): any;

            function notMatch(reg: any, tip: any): any;

            function optional(): any;

            function replace(a: any, b: any): any;

            function rtrim(c: any): any;

            function sha1(): any;

            function stripLow(nl: any): any;

            function toBoolean(): any;

            function toDate(): any;

            function toFloat(tip: any): any;

            function toInt(tip: any, radix: any, options: any): any;

            function toJson(tip: any): any;

            function toLow(): any;

            function toLowercase(): any;

            function toUp(): any;

            function toUppercase(): any;

            function trim(c: any): any;

            function type(t: any, tip: any): any;

            function whitelist(s: any): any;

        }

    }

}

