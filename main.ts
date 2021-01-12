let CO2 = 0
input.onButtonPressed(Button.A, function () {
    CO2 = SCD30.readCO2()
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
        basic.pause(100)
        basic.clearScreen()
        basic.pause(900)
    } else {
        if (CO2 < 2000) {
            basic.showLeds(`
                . . . . .
                . # # # .
                . # # # .
                . # # # .
                . . . . .
                `)
            basic.pause(100)
            basic.clearScreen()
            basic.pause(900)
        } else {
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            music.playTone(262, music.beat(BeatFraction.Quarter))
            basic.pause(100)
            basic.clearScreen()
            basic.pause(900)
        }
    }
}
basic.forever(function () {
    CO2 = SCD30.readCO2()
    ZeigeCO2()
    basic.pause(10000)
})
