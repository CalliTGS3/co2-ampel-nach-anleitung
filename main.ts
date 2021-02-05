let CO2 = 0
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
basic.forever(function () {
    CO2 = SCD30.readCO2()
    // 60 mal 1sec = 1min
    for (let index = 0; index < 60; index++) {
        ZeigeCO2()
    }
})
