import * as Speech from "expo-speech"
const TAMBOLA_MESSAGES: Record<number, string> = {
    1: "Here comes the first lucky number. Number",
    2: "Attention everyone. The next lucky number is",
    3: "Good luck players. Number",
    4: "Eyes on your tickets. Number",
    5: "Let's begin the excitement with number",
    6: "Hope this is your lucky number",
    7: "Lucky number coming up. Number",
    8: "Check your ticket carefully. Number",
    9: "Another lucky chance. Number",
    10: "The next Tambola number is",

    11: "Attention players. Number",
    12: "Don't miss this one. Number",
    13: "A lucky number is arriving. Number",
    14: "Please check your tickets. Number",
    15: "The game continues with number",
    16: "Here's another chance. Number",
    17: "Stay focused. Number",
    18: "One more lucky number. Number",
    19: "Ready everyone? Number",
    20: "Next lucky number is",

    21: "Attention please. Number",
    22: "Keep checking your ticket. Number",
    23: "Let's see who gets lucky. Number",
    24: "The excitement continues. Number",
    25: "Your next Tambola number is",
    26: "One more lucky draw. Number",
    27: "Eyes on your ticket. Number",
    28: "Here comes another number",
    29: "Best of luck everyone. Number",
    30: "Lucky draw continues. Number",

    31: "Here's the next lucky number. Number",
    32: "Keep your eyes open. Number",
    33: "Another exciting number is",
    34: "Let's continue with number",
    35: "Hope this matches your ticket. Number",
    36: "Next up is number",
    37: "Watch your ticket closely. Number",
    38: "Good luck once again. Number",
    39: "Another chance to win. Number",
    40: "The lucky number is",

    41: "Stay alert players. Number",
    42: "Keep checking. Number",
    43: "Your next number is",
    44: "The game gets more exciting. Number",
    45: "Halfway through. Number",
    46: "Can this be your lucky one? Number",
    47: "Here comes another lucky pick. Number",
    48: "Don't miss this number",
    49: "Check your ticket now. Number",
    50: "The next winning number is",

    51: "The excitement continues. Number",
    52: "Listen carefully. Number",
    53: "Another lucky call. Number",
    54: "Hope this helps you win. Number",
    55: "Next lucky number coming up. Number",
    56: "Let's keep the game rolling. Number",
    57: "One more exciting number. Number",
    58: "Stay with us. Number",
    59: "Your lucky number could be",
    60: "Here comes number",

    61: "Attention everyone. Number",
    62: "Don't blink. Number",
    63: "The next number is",
    64: "Luck may be on your side. Number",
    65: "Another winning opportunity. Number",
    66: "Please mark your tickets. Number",
    67: "Ready for the next one? Number",
    68: "Here comes another lucky number. Number",
    69: "The game is heating up. Number",
    70: "Your next chance is number",

    71: "Stay focused everyone. Number",
    72: "Keep your tickets ready. Number",
    73: "Another lucky draw. Number",
    74: "Hope you're matching this one. Number",
    75: "Let's continue with number",
    76: "One more number for you. Number",
    77: "Excitement is building. Number",
    78: "Listen for your lucky number. Number",
    79: "Another chance awaits. Number",
    80: "The next Tambola call is",

    81: "Almost there. Number",
    82: "Keep checking your ticket. Number",
    83: "A lucky number is coming. Number",
    84: "Don't lose focus. Number",
    85: "Here's another winning chance. Number",
    86: "One more lucky call. Number",
    87: "The next exciting number is",
    88: "Could this be your winning number? Number",
    89: "Last few numbers left. Number",
    90: "Final lucky number. Number"
}


export default class NumberGenerator {
    private generatedNumbers: number[] = [100];

    generateNextNumber() {
        if (this.generatedNumbers.length === 91) {
            return null
        }

        let number: number

        do {
            number = Math.floor(Math.random() * 90) + 1
        } while (this.generatedNumbers.includes(number))

        this.generatedNumbers.push(number);

        return number;
    }

    speakNumber(number: number) {
        Speech.stop();

        const announcement = TAMBOLA_MESSAGES[number]

        Speech.speak(`${announcement} is ${number}`, {
            language: "en-IN",
            pitch: 1,
            rate: 0.85,
        });
    }

    reset() {
        this.generatedNumbers = [];
    }

    getGeneratedNumbers() {
        return this.generatedNumbers;
    }
}