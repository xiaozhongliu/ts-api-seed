import { Enum, desc } from '../type/enum'

class Gender extends Enum {
    @desc('未知')
    Unknow = 0

    @desc('男性')
    Male = 1

    @desc('女性')
    Female = 2
}

class LogEvent {
    static Info = 'info'
    static Error = 'error'
    static Launch = 'launch'
    static Invoke = 'invoke'
}

export default {
    Gender: new Gender(),
    LogEvent,
}
