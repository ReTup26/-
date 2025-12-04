const charASCII = Array.from({length: 92}, (_, i) => String.fromCharCode(i + 35)); //Числа от 0 до 91 переводятся в символы ASCII
const digitASCII = Array.from({length: 3}, (_, i) => String.fromCharCode(i + 32)); //Символы ASCII для разрядов чисел больше 91

function serialize(nums) {
    let serializedStr = "";
    //Каждое число представляется в системе счисления с основанием 92 и записываются в строку
    //Чтобы отличать число с двумя разрядами, первый разряд имеет иной набор значений - digitASCII
    for (let num of nums) 
        serializedStr += (num > 91 ? digitASCII[Math.floor(num / 92) - 1] : '') + charASCII[num % 92];
    return serializedStr;
}

function deserialize(serializedStr) {
    let deserializedSet = [];
    //Рассматриваемые символы переводятся как из системы счисления с основанием 92
    //При этом если число имеет два разряда, рассматривается два символа сразу
    for (let i = 0; i < serializedStr.length; ++i){
        if (digitASCII.includes(serializedStr[i])) 
            deserializedSet.push((digitASCII.indexOf(serializedStr[i]) + 1) * 92 + charASCII.indexOf(serializedStr[++i]));
        else 
            deserializedSet.push(charASCII.indexOf(serializedStr[i])); 
    }
    return deserializedSet;
}

function testOutput(nums) {
    const simpleSerialized = nums.join(','); //Простая сериализация
    console.log("Исходная строка:", simpleSerialized);
    const serialized = serialize(nums); //Результат функции сериализации
    console.log("Сжатая строка:", serialized);
    console.log("Коэффициент сжатия:", (simpleSerialized.length / serialized.length).toFixed(4), "\n");
}

for (let i of [50, 100, 500, 1000]){
    console.log("Тест - " + i + " случайных значений");
    testOutput(Array.from({length: i}, () => Math.floor(Math.random() * 299) + 1));
} 

console.log("Тест - все числа из 1-го знака")
testOutput(Array.from({length : 9}, (_, i) => i + 1));
console.log("Тест - все числа из 2-х знаков")
testOutput(Array.from({length : 89}, (_, i) => i + 10));
console.log("Тест - все числа из 3-х знаков")
testOutput(Array.from({length : 199}, (_, i) => i + 100));

console.log("Тест - всех чисел по 3")
testOutput(Array.from({length : 900}, (_, i) => Math.floor(i / 3) + 1));