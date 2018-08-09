import { Enum, desc } from './class/enum'

class Gender extends Enum {
    @desc('未知')
    Unknow = 0

    @desc('男性')
    Male = 1

    @desc('女性')
    Female = 2
}

export default {
    Gender: new Gender(),
}
