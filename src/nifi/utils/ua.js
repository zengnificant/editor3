import platform from 'platform';

function compare(v1, v2) {
    const v1arr = v1.toString().split('.').map(e => parseInt(e))
    const v2arr = v2.toString().split('.').map(e => parseInt(e))
    const len1 = v1arr.length
    const len2 = v1arr.length

    const deltaLen = len1 - len2;

    if (deltaLen > 0) {
        for (let ii = 0; ii < deltaLen; ii++) {
            v2arr.push(0)
        }
    }
    if (deltaLen < 0) {
        for (let ii = 0; ii < -deltaLen; ii++) {
            v1arr.push(0)
        }
    }
    let ret = 0;
    v1arr.some((num1, i) => {
        let num2 = v2arr[i];
        let cpr = num1 - num2
        if (cpr === 0) {
            return false
        } else if (cpr > 0) {
            ret = 1;
            return true
        } else {
            ret = -1;
            return true
        }
    });
    return ret;

}






const parse = (uaStr) => {
    let ua
    if (!uaStr) ua = platform.parse(navigator.userAgent);
    else ua = platform.parse(uaStr);
    const browserName = ua.name
    const browserVersion = ua.version
    const OSName = ua.os.family == 'OS X' ? 'Mac OS X' : ua.os.family
    const OSVersion = ua.os.version
    const device = ua.product


    const { browser, OS, getBrowser, getOS, isOS, isBrowser, isOlderThan } = {
        browser: {
            name: browserName,
            version: browserVersion
        },
        OS: {
            name: OSName,
            version: OSVersion
        },

        getBrowser() {
            return browserName
        },
        getOS() {
            return OSName
        },
        isOS(str) {
            if (typeof str === 'string') {
                return str.includes(OSName)
            }
            return false;
        },
        isBrowser(str) {
            if (typeof str === 'string') {
                return str.includes(browserName)
            }
            return false;
        },
        isOlderThan(v) {
            let v0 = browserVersion;

            let ret = compare(v0, v);
            return ret < 0 ? true : false
        }

    }

    return { browser, OS, getBrowser, getOS, isOS, isBrowser, device, isOlderThan, compare }
}

const { browser, OS, device, getBrowser, getOS, isOS, isBrowser, isOlderThan } = parse();
export { browser, OS, device, getBrowser, getOS, isOS, isBrowser, isOlderThan, compare, parse }

export default { browser, OS, device, getBrowser, getOS, isOS, isBrowser, isOlderThan, compare, parse }