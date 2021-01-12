let CO2 = 0
input.onButtonPressed(Button.A, function () {
    CO2 = SCD30.readCO2()
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(CO2)
})
function ZeigeCO2 () {
    if (CO2 < 1000) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else {
        if (CO2 < 2000) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
                `)
        } else {
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
    basic.pause(100)
    basic.clearScreen()
}
basic.forever(function () {
    CO2 = SCD30.readCO2()
    for (let index = 0; index < 60; index++) {
        ZeigeCO2()
        basic.pause(1000)
    }
})
