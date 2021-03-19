// CO2 Messen
input.onButtonPressed(Button.A, function () {
    CO2 = SCD30.readCO2()
})
// CO2 als Zahlenwert anzeigen
input.onButtonPressed(Button.B, function () {
    basic.showNumber(CO2)
})
// Die Funktion läuft ca. 1 sec.
function ZeigeCO2 () {
    // CO2 < 1000ppm
    if (CO2 < 1000) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else {
        // CO2 < 2000ppm
        if (CO2 < 2000) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
                `)
        } else {
            // C02 > 2000ppm
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            music.playTone(262, music.beat(BeatFraction.Quarter))
        }
    }
    // Solange leuchten die LED's
    basic.pause(100)
    basic.clearScreen()
    // Solange bleiben die LED's aus
    basic.pause(900)
}
let CO2 = 0
let item = 0
let tm = TM1637.create(
DigitalPin.C16,
DigitalPin.C17,
7,
4
)
tm.showDP(1, false)
tm.intensity(2)
basic.showString("Zum Kalibrieren jetzt A+B drücken")
if (input.buttonIsPressed(Button.AB)) {
    basic.showString("K")
    basic.pause(1000)
    SCD30.setCalibration400ppm()
    basic.pause(1000)
}
basic.showString("M")
basic.forever(function () {
    CO2 = SCD30.readCO2()
    // 60 mal 1sec = 1min
    for (let index = 0; index < 60; index++) {
        ZeigeCO2()
        tm.showNumber(CO2)
    }
})
basic.forever(function () {
    if (CO2 > 1000) {
        motors.motorPower(100)
    } else {
        motors.motorPower(0)
    }
})
