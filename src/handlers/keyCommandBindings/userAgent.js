//@styled
import platform from 'platform'






export const isWindows=()=>{
    let ua=platform.parse(navigator.userAgent)
   // OSName= ua.os.family == 'OS X' ? 'Mac OS X' : ua.os.family
    return ua.os.family.toLowerCase().includes('windows')
}


