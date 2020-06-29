module.exports = (type, count) => {
    const first = type == 'achat_import' ? "2" : "1";
    const year = new Date().getFullYear().toString();
    return first + year.charAt(year.length - 2) + year.charAt(year.length - 1) + addZeroForFiveDigit(count);
}

function addZeroForFiveDigit(count) {
    console.log()
    let zeroCount = 5 - count.toString().length;
    let value = "";
    while (zeroCount > 0) {
        value = value + "0";
        zeroCount--;
    }
    return value + count;
}