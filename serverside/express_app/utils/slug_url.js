
export default function slugToUrl(slug, congressNo){
    const hBillRegex = /^hr\d+/
    const sBillRegex = /^s\d+/

    const hResRegex = /^hres\d+/
    const sResRegex = /^sres\d+/
    
    const hConResRegex = /^hconres\d+/
    const sConResRegex = /^sconres\d+/
    
    const sjresRegex = /^sjres\d+/
    const hjresRegex = /^hjres\d+/

    let urlType
    let prefix

    if (hBillRegex.test(slug)) {
        urlType = "house-bill"
        prefix = "hr"
    } else if (sBillRegex.test(slug)) {
        urlType = "senate-bill"
        prefix = "s"
    } else if (hResRegex.test(slug)) {
        urlType = "house-resolution"
        prefix = "hres"
    } else if (sResRegex.test(slug)) {
        urlType = "senate-resolution"
        prefix = "sres"
    } else if (hConResRegex.test(slug)) {
        urlType = "house-concurrent-resolution"
        prefix = "hconres"
    } else if (sConResRegex.test(slug)) {
        urlType = "senate-concurrent-resolution"
        prefix = "sconres"
    } else if (hjresRegex.test(slug)) {
        urlType = "house-joint-resolution"
        prefix = "hjres"
    } else if (sjresRegex.test(slug)) {
        urlType = "senate-joint-resolution"
        prefix = "sjres"
    } else {
        return "Cannot find bill type"
    }

    let billNumber = slug.split(prefix)[1]
    return `https://www.congress.gov/bill/${ordinal_suffix_of(congressNo)}-congress/${urlType}/${billNumber}`

}

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}