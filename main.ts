function right () {
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.analogWritePin(AnalogPin.P14, pins.map(
    turnspd,
    0,
    100,
    0,
    1023
    ))
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.analogWritePin(AnalogPin.P16, pins.map(
    turnspd,
    0,
    100,
    0,
    1023
    ))
}
function back () {
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, pins.map(
    gospd,
    0,
    100,
    0,
    1023
    ))
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.analogWritePin(AnalogPin.P16, pins.map(
    gospd,
    0,
    100,
    0,
    1023
    ))
}
function left () {
    pins.digitalWritePin(DigitalPin.P15, 1)
    pins.analogWritePin(AnalogPin.P14, pins.map(
    turnspd,
    0,
    100,
    0,
    1023
    ))
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.analogWritePin(AnalogPin.P16, pins.map(
    turnspd,
    0,
    100,
    0,
    1023
    ))
}
bluetooth.onBluetoothConnected(function () {
    basic.showLeds(`
        . . . . .
        . . . . #
        . . . # .
        # . # . .
        . # . . .
        `)
})
function stop () {
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.analogWritePin(AnalogPin.P14, pins.map(
    0,
    0,
    100,
    0,
    1023
    ))
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.analogWritePin(AnalogPin.P16, pins.map(
    0,
    0,
    100,
    0,
    1023
    ))
}
bluetooth.onBluetoothDisconnected(function () {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    cmd = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    if (cmd == "a") {
        go()
    }
    if (cmd == "b") {
        left()
    }
    if (cmd == "c") {
        right()
    }
    if (cmd == "d") {
        back()
    }
    if (cmd == "e") {
        stop()
    }
    if (cmd == "f") {
        pins.servoWritePin(AnalogPin.P1, 0)
    }
    if (cmd == "g") {
        pins.servoWritePin(AnalogPin.P1, 180)
    }
    if (cmd == "h") {
        pins.servoWritePin(AnalogPin.P1, 91)
    }
})
function go () {
    pins.digitalWritePin(DigitalPin.P15, 0)
    pins.analogWritePin(AnalogPin.P14, pins.map(
    gospd,
    0,
    100,
    0,
    1023
    ))
    pins.digitalWritePin(DigitalPin.P0, 1)
    pins.analogWritePin(AnalogPin.P16, pins.map(
    gospd,
    0,
    100,
    0,
    1023
    ))
}
let angle = 0
let cmd = ""
let turnspd = 0
let gospd = 0
bluetooth.startUartService()
stop()
gospd = 50
turnspd = 50
basic.forever(function () {
    if (cmd == "i") {
        angle += 3
        if (angle >= 180) {
            angle = 180
        }
        pins.servoWritePin(AnalogPin.P2, angle)
    }
    if (cmd == "j") {
        angle += -3
        if (angle <= 0) {
            angle = 0
        }
        pins.servoWritePin(AnalogPin.P2, angle)
    }
})
