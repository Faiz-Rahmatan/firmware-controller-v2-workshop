def right():
    pins.digital_write_pin(DigitalPin.P15, 0)
    pins.analog_write_pin(AnalogPin.P14, pins.map(turnspd, 0, 100, 0, 1023))
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.analog_write_pin(AnalogPin.P16, pins.map(turnspd, 0, 100, 0, 1023))
def back():
    pins.digital_write_pin(DigitalPin.P15, 1)
    pins.analog_write_pin(AnalogPin.P14, pins.map(gospd, 0, 100, 0, 1023))
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.analog_write_pin(AnalogPin.P16, pins.map(gospd, 0, 100, 0, 1023))

def on_uart_data_received():
    global cmd
    cmd = bluetooth.uart_read_until(serial.delimiters(Delimiters.HASH))
    if cmd == "a":
        go()
    if cmd == "b":
        left()
    if cmd == "c":
        right()
    if cmd == "d":
        back()
    if cmd == "e":
        stop()
    if cmd == "f":
        pins.servo_write_pin(AnalogPin.P1, 0)
    if cmd == "g":
        pins.servo_write_pin(AnalogPin.P1, 180)
    if cmd == "h":
        pins.servo_write_pin(AnalogPin.P1, 91)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.HASH), on_uart_data_received)

def on_bluetooth_disconnected():
    basic.show_leds("""
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        """)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

def left():
    pins.digital_write_pin(DigitalPin.P15, 1)
    pins.analog_write_pin(AnalogPin.P14, pins.map(turnspd, 0, 100, 0, 1023))
    pins.digital_write_pin(DigitalPin.P0, 1)
    pins.analog_write_pin(AnalogPin.P16, pins.map(turnspd, 0, 100, 0, 1023))
def stop():
    pins.digital_write_pin(DigitalPin.P15, 0)
    pins.analog_write_pin(AnalogPin.P14, pins.map(0, 0, 100, 0, 1023))
    pins.digital_write_pin(DigitalPin.P0, 0)
    pins.analog_write_pin(AnalogPin.P16, pins.map(0, 0, 100, 0, 1023))

def on_bluetooth_connected():
    basic.show_leds("""
        . . . . .
        . . . . #
        . . . # .
        # . # . .
        . # . . .
        """)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def go():
    pins.digital_write_pin(DigitalPin.P15, 0)
    pins.analog_write_pin(AnalogPin.P14, pins.map(gospd, 0, 100, 0, 1023))
    pins.digital_write_pin(DigitalPin.P0, 1)
    pins.analog_write_pin(AnalogPin.P16, pins.map(gospd, 0, 100, 0, 1023))
cmd = ""
turnspd = 0
gospd = 0
bluetooth.start_uart_service()
stop()
gospd = 50
turnspd = 50
angle = 0

def on_forever():
    global angle
    if cmd == "i":
        angle += 3
        if angle >= 180:
            angle = 180
        pins.servo_write_pin(AnalogPin.P2, angle)
    if cmd == "j":
        angle += -3
        if angle <= 0:
            angle = 0
        pins.servo_write_pin(AnalogPin.P2, angle)
basic.forever(on_forever)
